let todoList = {"todo":[
{
      "uid": 1,
      "content": "자바스크립트 공부하기"
    },
    {
      "uid": 2,
      "content": "자바스크립트2 공부하기"
    }
  ],
  "doing":[
    {
      "uid": 4,
      "content": "자바스크립7 공부하기"
    },
    {
      "uid": 5,
      "content": "자바스크립트6 공부하기"
    }
  ],
  "done":[]
};
const formatSet = {};

let lastId = 6;

const doCommand = (command, args) => {
  switch (command) {
    case "show":
      show(...args);
      break;

     case "add":
      add(args);
      break;

    case "update":
      update(args);
      break;
      
      
    case "delete":
      deleteItem(args);
    
      break;

      
    default:
      break;
  }  
}

const show = target => {
  if(target === "current") {
    return showTodoListAll();
  } 

  pipe(
    filter,
    formatter,
    showTodoList,
    console.log
  )(target);
};

const add = todoItems => {
  pipe(
    makeTodoItem,
    addTodoList,
  )(todoItems);

  showTodoListAll();
}

const deleteItem = targetId => {
  todoList = pipe(
    flatList,
    withdrawItem,
    makeTodoList,
  )([Object.entries(todoList), targetId]);

  showTodoListAll();
}


const update = ([targetId, todoType]) => {
  prevList = todoList; 
  
  todoList = pipe(
    flatList,
    updateTodoList,
    makeTodoList,
  )([Object.entries(todoList), targetId, todoType]);

  if(prevList !== todoList) {
    setTimeout(() => {
      const [updatedItem] = searchItem(targetId);
      console.log(`${updatedItem.content}가 ${updatedItem.type}으로 상태가 바뀌었습니다.`);
      showTodoListAll();      
    }, 2000);  
  }
}

const searchItem = targetId => (
  pipe(
    flatList,
    ([todoItems, targetId]) => todoItems.filter(({uid}) => Number(uid) === Number(targetId)),
  )([Object.entries(todoList), targetId])
)

const withdrawItem = ([todoItems, targetId]) => (
  todoItems.filter(({type, content, uid}) => {
    if(Number(uid) === Number(targetId)) {
      console.log(`${content}가 ${type}목록에서 삭제되었습니다.`);
    }
    return Number(uid) !== Number(targetId);
  })
) 

const flatList = ([todoItems, ...args]) => {
  let flatten = [[]];
  return [flatten.concat(todoItems).reduce(flat), ...args];
}

const updateTodoList = ([todoItems, targetId, todoType]) => (
  todoItems.map(({type, content, uid}) => (
    Number(uid) === Number(targetId) ? {type:todoType, uid, content}
                                     : {type, content, uid}
  ))
); 

const makeTodoList = rawList => {
  let emptyList = [{"todo": [], "doing": [], "done":[]}].concat(rawList);

  return emptyList.reduce((todoList, {uid, content, type}) => {
    todoList[type] = todoList[type].concat([{uid, content}]);
    return todoList;
  });
}


const pipe = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

const filter = (target) => {
  //filter
  for(todoItem of Object.entries(todoList)) {
    let [key, items] = todoItem;
    if(target === key) {
      return items;
    }
  }
}

const showTodoListAll = () => {
  pipe(
    getTodoListString,
    console.log
  )(Object.entries(todoList))
}

// 명령과 입력값으로 나눈다.
const parseInput = (rawInput) => rawInput.trim().split("$$");

//정해진 형식에 따라 출력 문자열을 만든다.
const formatter = (arg) =>  arg.map(todo => `${todo.content}, ${todo.uid}번`);

const showTodoList = (formatedTodoList) => `총 ${formatedTodoList.length} 건 : ${formatedTodoList.toString()}`;

//입렵된 todolist를 출력 형식으로 반환한다.
const getTodoListString = todoItems => todoItems.map(([type, items])=> `${type}:[${items.map(({uid})=> uid).toString()}]`).join(',')

// 새 todoItem을 만든다.
const makeTodoItem = (todoItems) => todoItems.map(item => ({uid: getUniqueId(), content: item}));

// 새 todoItem을 출력한다.
const showNewItem = ({uid, content}) => console.log(`${content}가 추가되었습니다. (id: ${uid})`); 

// todoList에 새로운 아이템을 추가한다.
const addTodoList = todoItems => {
  todoItems.forEach(todoItem => showNewItem(todoItem));
  todoList = Object.assign({}, todoList, {todo: todoList.todo.concat(todoItems)}); 
}

const flat = (a, b) => a.concat(b[1].map( item=> ({type:b[0], ...item})));


const getUniqueId = () => lastId++;


const init = () => {
  let standard_input = process.stdin;
  standard_input.setEncoding('utf-8');

  process.stdout.write("명령하세요: ");

  // When user input data and click enter key.
  standard_input.on('data', function (data) {

    // User input exit.
    if(data === 'q\n'){
        process.exit();
    }else
    {
      let [command, ...args] = parseInput(data);
      doCommand(command, args);

      process.stdout.write("명령하세요: ");
    }
  });
}
init();
