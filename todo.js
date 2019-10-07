const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = () => {
  rl.question("명령어 입력하시오 ", command => {
    if (command === "q") {
      rl.close();
      return;
    }

    (async () => {
      await runCommand(command);
      question();
    })();
  });
};
question();

//data
const TODO_TPYE = {
  TODO: "todo",
  DOING: "doing",
  DONE: "done"
};

const Todo = function(type, name, tags) {
  this.type = type;
  this.name = name;
  this.tags = tags;
};

let firstHistory = new Map().set(
  0,
  new Todo(TODO_TPYE.DOING, "첫째 할 일", ["favorite"])
);

let secondHistory = new Map();

secondHistory.set(1, new Todo(TODO_TPYE.DOING, "두번째 할 일", []));
secondHistory.set(2, new Todo(TODO_TPYE.DOING, "세번째 할 일", []));

let history = new Map();
history.set(new Date("1995-12-17T03:24:00"), firstHistory);
history.set(new Date("1996-12-17T03:24:00"), secondHistory);

//pipe 함수
const pipe = (...functions) => args =>
  functions.reduce((arg, nextFn) => nextFn(arg), args);

//명령어 show$$toDo parsing
const commandParser = command => {
  const seperator = "$$";
  return command
    .split(seperator)
    .map(item => (isValidJsonFormat(item) ? JSON.parse(item) : item));
};

const isValidJsonFormat = str => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

const getCurrentData = () => {
  if (history && history.keys().length === 0) {
    throw { msg: "no data" };
  }
  const currentKey = Array.from(history.keys()).reduce((prev, cur) =>
    prev > cur ? prev : cur
  );
  return history.get(currentKey);
};

const getUniqueId = () =>
  pipe(
    getCurrentData,
    currentData => {
      lastKey = Array.from(currentData.keys()).reduce((prev, cur) =>
        prev > cur ? prev : cur
      );
      return lastKey + 1;
    }
  )();

//
const todoFuncs = new Map();

//
const show = type => {
  if (type && Object.values(TODO_TPYE).includes(type)) {
    showType(type);
  } else {
    showCurrent();
  }
};

const groupByType = data => {
  return Array.from(data.keys()).reduce((accumulator, val) => {
    let curData = data.get(val);
    if (accumulator[curData.type]) {
      return {
        ...accumulator,
        [curData.type]: [...accumulator[curData.type], { ...curData, id: val }]
      };
    } else {
      return {
        ...accumulator,
        [curData.type]: [{ ...curData, id: val }]
      };
    }
  }, {});
};
const showCurrent = () =>
  pipe(
    getCurrentData,
    groupByType,
    currentDataObj =>
      Object.entries(currentDataObj).reduce((accumulator, curval, idx) => {
        const [key, value] = curval;
        const stringfiedData = `[${key}:${value
          .map(item => item.id)
          .join(",")}]`;
        return idx === 0 ? stringfiedData : accumulator + "," + stringfiedData;
      }, ""),

    result => console.log(result)
  )();

const showType = type =>
  pipe(
    getCurrentData,
    groupByType,
    currentDataObj => currentDataObj[type],
    typeDataList => {
      return typeDataList.reduce((accumulator, curval, idx) => {
        const { name, id } = curval;
        const stringfiedData = `'${name},${id}번'`;
        return idx === 0
          ? accumulator + stringfiedData
          : accumulator + "," + stringfiedData;
      }, `총 ${typeDataList.length}: `);
    },
    result => console.log(result)
  )();

todoFuncs.set("show", show);

const setAddHistory = data => {
  const { name, tags } = data;
  const id = getUniqueId();
  const newHistory = new Map(getCurrentData());
  newHistory.set(id, { type: TODO_TPYE.TODO, name: name, tags: tags });
  history.set(new Date(), newHistory);
};

//
const add = (name, tags) =>
  pipe(
    setAddHistory,
    showCurrent
  )({ name, tags });

todoFuncs.set("add", add);

const setUpdateHistory = data => {
  const { id, type } = data;
  const newHistory = new Map(getCurrentData());
  newHistory.set(id, { ...newHistory.get(id), type: type });
  history.set(new Date(), newHistory);
};

const delayUpdate = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const update = (id, type) =>
  pipe(
    setUpdateHistory,
    delayUpdate,
    delayPromise => delayPromise.then(showCurrent)
  )({ id, type });

todoFuncs.set("update", update);

//
const deleteFunc = () => {};
todoFuncs.set("delete", deleteFunc);

const excuteFuncByName = args => {
  const funcName = args[0];
  const [, ...funcArgs] = args;

  if (todoFuncs.get(funcName)) {
    return todoFuncs.get(funcName)(...funcArgs);
  } else {
    throw { msg: "command not exist" };
  }
};

const runCommand = command =>
  pipe(
    commandParser,
    excuteFuncByName
  )(command);
