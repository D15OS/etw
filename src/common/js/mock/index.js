const Mock = require("better-mock/dist/mock.mp.js");

Mock.mock("mockApi/test", "get", (option) => {
  return Mock.mock({
    errorCode: 200,
    errorMsg: "错误",
    "data|7": [
      {
        "id|+1": 1,
        avatarImage: "@image()",
        image: "@image()",
        title: "@ctitle(7,30)",
        author: option.body.page,
        time: "@now()",
        current: option.body.page,
        total: 8,
      },
    ],
  });
});

Mock.mock("mockApi/authorList", {
  errorCode: 200,
  errorMsg: "",
  "data|8": [
    {
      "id|+1": 1,
      authorImage: "@image()",
      authorName: "@ctitle(3,8)",
    },
  ],
});

Mock.mock("mockApi/trendsList", {
  errorCode: 200,
  errorMsg: "",
  "data|8": [
    {
      "id|+1": 1,
      authorName: "@ctitle(5,10)",
      authorDescription: "@ctitle(8,28)",
      "trendImageList|1-9": ["@image()"],
      trendText: "@ctitle(666,777)",
    },
  ],
});
