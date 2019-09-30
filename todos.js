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

const print = (content, head) => {
  const textContent = head ? `${head} : ${content}` : `${content}`;
  console.log(textContent);
};

const formatJSON = data => JSON.stringify(data);
const formatShowList = data => `총${data.length}건 : ${formatJSON(data)}`;

const groupBy = (array, property) =>
  array.reduce((acc, cur) => {
    const key = cur[property];

    if (!acc[key]) acc[key] = [];
    acc[key].push(cur.id);

    return acc;
  }, {});

const getIndexByID = (array, uid) => array.findIndex(item => item.id === uid);

// 가장 큰 id 값에 1을 더한다.
const makeUniqueId = data => Math.max(...data.map(item => item.id)) + 1;

// execute command
const showData = bundle => {
  const { data, keyword } = bundle;
  // show$$current show$${keyword}

  if (keyword == "current")
    print(formatJSON(groupBy(data, "status"), "현재상태"));
  else
    print(
      formatShowList(
        data
          .filter(item => item.status === keyword)
          .map(item => `${item.content}, ${item.id}번`)
      ),
      `${keyword}리스트`
    );
};

const addData = bundle => {
  const { data, content, tags, status } = bundle;
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
  print(`${content}가 추가됐습니다. (id : ${uid})`);
  showData({ data: newData, keyword: "current" });
  return newData;
};

const updateData = bundle => {
  const { data, uid, status } = bundle;
  // update$$7788$$doing
  const idx = getIndexByID(data, uid);
  if (idx < 0)
    throw Error(`업데이트 실패! [id:${uid}] 에 해당하는 데이터가 없습니다.`);

  const newItem = { ...data[idx], status };
  const newData = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];

  setTimeout(() => {
    print(`${data[idx].content}가 ${status}로 상태가 변경됐습니다.`);
    showData({ data: newData, keyword: "current" });
  }, 2000);
  return newData;
};

const deleteData = () => {
  // delete$$7788
  // delete data
  // show result
  print("delete");
};

const quit = () => {
  print("프로그램을 종료합니다.");
  process.exit(0);
};

// constant
const DELIMITER = "$$";
const COMMANDS = new Map()
  .set("show", showData)
  .set("add", addData)
  .set("update", updateData)
  .set("delete", deleteData)
  .set("q", quit);

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
  showData({ data: TEST_DATAS, keyword: "todo" });
  showData({ data: TEST_DATAS, keyword: "current" });
  showData({ data: TEST_DATAS, keyword: "done" });

  print(makeUniqueId(TEST_DATAS));

  print(
    formatJSON(
      addData({
        data: TEST_DATAS,
        content: "test 데이터",
        tags: '["favorite","programming"]',
        status: "todo"
      })
    )
  );

  updateData({ data: TEST_DATAS, uid: 7788, status: "done" });
  updateData({ data: TEST_DATAS, uid: 7790, status: "done" });
};

test();
