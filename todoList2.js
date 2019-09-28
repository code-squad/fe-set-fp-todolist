const show = target => {

  if(target === "current") {
    pipe(
      getTodoList,
      groupByType,
      getTodoListToStringAll,
      console.log
      )(target);
  } else {
    pipe(
      getTodoList,
      filterByType,
      getTodoListToString,
      console.log
    )(target);
  }
};

const add = args => {
  todoList = pipe(
    makeTodoItem,
    getTodoList,
    addTodoItem,
  )(args);
  
  show("current");
}

const deleteItem = args => {
  const prevLen = todoList.length;
  todoList = pipe(
    getTodoList,
    filterToDelete,
  )(args);


  if(prevLen !== todoList.length) {
    show("current");
  }
}

const update = args => {
  todoList = pipe(
    getTodoList,
    updateTodoItem,
  )(args);
}

const updateTodoItem = ({todoList, target}) => {
  const [uid, newType] = target;

  return todoList.map(todoItem => {
    if (Number(todoItem.uid) === Number(uid)) {
      setTimeout(() => {
        console.log(`${todoItem.content}가 ${newType}으로 변경되었습니다.`);
        show("current");
      }, 2000);

      return {type: newType, ...todoItem};

    } else {
      return todoItem;
    }
  });

}

const filterToDelete = ({todoList, target}) => {
  return todoList.filter(({uid, content, type}) => {
    if (Number(uid) === Number(target)) {
      console.log(`${content}가 ${type}목록에서 삭제 되었습니다.`);
      return false;
    } else {
      return true;
    } 
  }); 
}

const makeTodoItem = ([content, tag]) => {
  if(tag) tag = JSON.parse(tag);
  return {uid: getUniqueId(), type:"todo", content, tag};
}

const addTodoItem  = ({todoList, target}) => {
  console.log(`${target.content} 공부하기가 추가되었습니다. (id: ${target.uid})`);
  return todoList.concat([target]);
};

const filterByType = ({todoList, target}) => {
  todoList = todoList.filter(({type})  => type === target);
  return {todoList, target};
};

const getTodoListToString = ({todoList, target}) => {
  const output = 
  todoList
  .map(({uid, content}) => `'${content}, ${uid}번'`)
  .reduce((output, todoItem) => {
    if(!output.len) output = {len: 1, outString: output};
    return output = {len: output.len +1, outString :output.outString +", "+ todoItem};
  });

  return `${target} 리스트 : ${output.len}개 ${output.outString}`;
}


const getTodoList = target => {
  return {todoList, target};
};




const groupByType = ({todoList}) => {
  let grouppedList = [{"todo": [], "doing": [], "done": [] }]
  .concat(todoList)
  .reduce((grouppedList, {uid, content, type}) => {
    grouppedList[type].push({uid, content})
    return grouppedList;
  });
  
  if (typeof grouppedList === "object") {
    grouppedList = Object.entries(grouppedList);
  }
  return grouppedList;
};

const getTodoListToStringAll = (todoItems) => {
  return todoItems.map(([type, items])=> `${type}:[${items.map(({uid})=> uid).toString()}]`).join(',')
};

const pipe = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

// 명령과 입력값으로 나눈다.
const parseInput = (rawInput) => rawInput.trim().split("$$");


const getUniqueId = () => lastId++;


const init = () => {
  let standard_input = process.stdin;
  standard_input.setEncoding('utf-8');

  process.stdout.write("명령하세요: ");

  // When user input data and click enter key.
  standard_input.on('data', function (data) {

    // User input exit.
    if (data === 'q\n') {
      process.exit();
    } else {
      let [command, ...args] = parseInput(data);
      doCommand(command, args);

      process.stdout.write("명령하세요: ");
    }
  });
}



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

let todoList = [
  {
    "uid": 1,
    "content": "자바스크립트 공부하기",
    "type": "todo"
  },
  {
    "uid": 2,
    "content": "자바스크립트2 공부하기",
    "type": "todo"
  },
  {
    "uid": 4,
    "content": "자바스크립7 공부하기",
    "type": "doing"
  },
  {
    "uid": 5,
    "content": "자바스크립트6 공부하기",
    "type": "doing"
  }
];

let lastId =6;

init();