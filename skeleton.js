const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("명령어 입력하시오 ", commandLine => {
  runCommand(commandLine);
  rl.close();
});

//pipe 함수
const pipe = (...functions) => args =>
  functions.reduce((arg, nextFn) => nextFn(arg), args);

//명령어 show$$toDo parsing
const commandParser = command => {};

//
const excuteFuncByName = (funcName, args) => {
  switch (funcName) {
  }
};

let commandLine;

const runCommand = pipe(
  commandParser,
  excuteFuncByName
)(commandLine);

//data
const TODO_TPYE = {
  TODO: "todo",
  DOING: "doing",
  DONE: "done"
};

const firstHistory = new Map().set(0, {
  type: TODO_TPYE.DOING,
  name: "첫째 할 일",
  tags: ["favorite"]
});

//
const fistTime = new Date('1995-12-17T03:24:00').toLocaleTimeString;
let history = new Map();
history.set(new Date('1995-12-17T03:24:00').toLocaleTimeString, firstHistory);

//add
const add = data =>
  pipe(
    getNewId,
    add
  )(data);

const getNewId = () => history[history.length - 1].reduce();
const add = id => {};

//show 
const showCurrent = () => {}
const showByType = type => {}

//update 
const update = 

const getDataById = id => history[history.length - 1]
