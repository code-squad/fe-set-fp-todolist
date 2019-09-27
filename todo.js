const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = () => {
  rl.question("명령어 입력하시오 ", command => {
    (async () => {
      if (command === "q") {
        rl.close();
        return;
      }

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

let firstHistory = new Map().set(0, {
  type: TODO_TPYE.DOING,
  name: "첫째 할 일",
  tags: ["favorite"]
});

let secondHistory = new Map();

secondHistory.set(1, {
  type: TODO_TPYE.DOING,
  name: "두번째 할 일",
  tags: []
});
secondHistory.set(2, {
  type: TODO_TPYE.DOING,
  name: "세번째 할 일",
  tags: []
});

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
    console.log(history);
  }
};

const groupByType = data => {
  console.log(data);
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
      Object.entries(currentDataObj)
        .map(([key, val]) => {
          return "[" + key + "]" + ":" + val.map(item => item.id).join(",");
        })
        .join(","),
    result => console.log(result)
  )();

const showType = type =>
  pipe(
    getCurrentData,
    groupByType,
    currentDataObj => currentDataObj[type],
    typeDataList => {
      let reulstStr;
      reulstStr = `총 ${typeDataList.length}: `;
      return (reulstStr += typeDataList
        .map(({ name, id }) => {
          return "'" + name + "," + id + "번'";
        })
        .join(","));
    },
    result => console.log(result)
  )();

todoFuncs.set("show", show);

//
const add = (name, tags) =>
  pipe(
    () => {
      const id = getUniqueId();
      const newHistory = new Map(getCurrentData());
      newHistory.set(id, { type: TODO_TPYE.TODO, name: name, tags: tags });
      history.set(new Date(), newHistory);
    },
    showCurrent
  )();
todoFuncs.set("add", add);

const update = (id, type) =>
  pipe(
    () => {
      const newHistory = new Map(getCurrentData());
      newHistory.set(id, { ...newHistory.get(id), type: type });
      history.set(new Date(), newHistory);
    },
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
    deplyPromise => deplyPromise.then(showCurrent)
  )();

todoFuncs.set("update", update);

//
const deleteFunc = () => {};
todoFuncs.set("delete", deleteFunc);

const excuteFuncByName = args => {
  const funcName = args[0];
  const [, ...funcArgs] = args;
  if (todoFuncs.get(funcName)) {
    todoFuncs.get(funcName)(...funcArgs);
  } else {
    throw { msg: "command not exist" };
  }
};

const runCommand = command =>
  pipe(
    commandParser,
    excuteFuncByName
  )(command);
