// command line i/o
// https://nodejs.org/api/readline.html
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const command = cb => rl.question.bind(rl, "명령하세요 : ", cb);
const commandDone = rl.close.bind(rl);

/* 
[ data example ]
	id : 7788
  content : docker 공부하기
	tags : ["favorite","programming"]
	status : todo
*/

const print = (head, content) => console.log(`${head} : ${content}`);
const formatJSON = data => JSON.stringify(data);
const formatShowList = data => `총${data.length}건 : ${formatJSON(data)}`;

const groupBy = (array, property) =>
  array.reduce((acc, cur) => {
    const key = cur[property];

    if (!acc[key]) acc[key] = [];
    acc[key].push(cur.id);

    return acc;
  }, {});

// 가장 큰 id 값에 1을 더한다.
const makeUniqueId = data => Math.max(...data.map(item => item.id)) + 1;

// execute command
const showData = (data, keyword) => {
  // show$$current show$${keyword}

  if (keyword == "current")
    print("현재상태", formatJSON(groupBy(data, "status")));
  else
    print(
      `${keyword}리스트`,
      formatShowList(
        data
          .filter(item => item.status === keyword)
          .map(item => `${item.content}, ${item.id}번`)
      )
    );
};

const addData = (data, content, tags, status) => {
  // add$$docker공부하기$$["favorite","programming"]
  const uid = makeUniqueId(data);
  const tagsData = JSON.parse(tags);
  const newData = [
    ...data,
    {
      id: uid,
      content,
      tags: tagsData,
      status
    }
  ];

  // show result
  // docker공부하기가 추가됐습니다.(id : 7788)
  console.log(`${content}가 추가됐습니다. (id : ${uid})`);
  showData(newData, "current");
  return newData;
};

const updateData = () => {
  // update$$7788$$doing
  // update data
  // delay to show result for 2 second
  console.log("update");
};

const deleteData = () => {
  // delete$$7788
  // delete data
  // show result
  console.log("delete");
};

const quit = () => {
  // quit
  return false;
};

// constant
const DELIMITER = "$$";
const COMMANDS = new Map()
  .set("show", showData)
  .set("add", addData)
  .set("update", updateData)
  .set("delete", deleteData)
  .set("q", quit);

const DEAFULT_DATA = {
  todo: [123, 124],
  doing: [123, 444],
  done: []
};

// util function
const pipe = (...functions) => args =>
  functions.reduce((arg, nextFn) => nextFn(arg), args);

const loop = func => {
  let looping = false;
  do {
    func();
  } while (looping);
};

// process command
const parse = cmd => {
  return cmd.split(DELIMITER);
};

const checkValidation = args => {
  if (!COMMANDS.has(args[0])) throw Error("유효하지 않은 명령입니다.");
  else return args;
};

const execute = args => {
  const cmd = args[0];
  const params = args.slice(1);

  return COMMANDS.get(cmd)(params);
};

// main
const main = () => {
  //looping until do 'q' command
  loop(
    command(cmd => {
      pipe(
        parse,
        checkValidation,
        execute
      )(cmd);

      // error handling

      commandDone();
    })
  );
};

// main();

// test
const TEST_DATAS = [
  {
    id: 7788,
    content: "docker 공부하기",
    tags: ["favorite", "programming"],
    status: "todo"
  },
  {
    id: 7789,
    content: "docker 공부하기2",
    tags: ["favorite", "programming"],
    status: "done"
  },
  {
    id: 7790,
    content: "docker 공부하기3",
    tags: ["favorite", "programming"],
    status: "todo"
  }
];

const test = () => {
  showData(TEST_DATAS, "todo");
  showData(TEST_DATAS, "current");
  showData(TEST_DATAS, "done");

  console.log(makeUniqueId(TEST_DATAS));

  console.log(
    addData(TEST_DATAS, "test 데이터", '["favorite","programming"]', "todo")
  );
};

test();
