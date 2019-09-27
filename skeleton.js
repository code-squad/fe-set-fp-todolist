// command line i/o
// https://nodejs.org/api/readline.html
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// constant
const DELIMITER = "$$";
const COMMANDS = new Set(["show", "add", "update", "delete", "q"]);

// util function
const pipe = (...functions) => args =>
  functions.reduce((arg, nextFn) => nextFn(arg), args);

const command = rl.question.bind(rl, "명령하세요 : ");
const commandDone = rl.close.bind(rl);

// process command
const parse = () => {
  console.log("parse");
};
const checkValidation = () => {
  console.log("checkValidation");
};
const execute = () => {
  console.log("execute");
};

// execute command
const _show = () => {
  // show$$current
  // todo, doing, done
  // search data
  // show result
};
const _add = () => {
  // add$$docker공부하기$$["favorite","programming"]
  // make unique id
  // add data
  // show result
};
const _update = () => {
  // update$$7788$$doing
  // update data
  // delay to show result for 2 second
};
const _delete = () => {
  // delete$$7788
  // delete data
  // show result
};

// main
(() => {
  // looping until do 'q' command
  command(cmd => {
    pipe(
      parse,
      checkValidation,
      execute
    )(cmd);

    // error handling

    commandDone();
  });
})();
