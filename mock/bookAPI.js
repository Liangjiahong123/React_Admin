import Mock from "mockjs";
import { omit } from "../src/utils/property";

const bookList = Mock.mock({
  "list|100": [
    {
      "id|+1": 1,
      bookName: "@ctitle(7, 15)",
      "type|1-10": 1,
      desc: "@cparagraph",
      cover: "https://placebear.com/@integer(100, 150)/@integer(100, 150)",
      visitCount: "@integer(100, 10000)",
      commentCount: "@integer(50, 500)",
      publishDate: "@datetime",
      link: "@url",
      "score|1": [20, 30, 40]
    }
  ]
});

export default {
  "GET /api/book": (req, res) => {
    const { page = 1, size = 10, ...rest } = req.query || {};
    let responseList = [...bookList.list];
    Object.keys(rest).forEach((key) => {
      if (rest[key]) {
        if (["type"].includes(key)) {
          responseList = responseList.filter((book) => book[key] === +rest[key]);
        } else {
          responseList = responseList.filter((book) => book[key].indexOf(rest[key]) > -1);
        }
      }
    });

    const list = responseList
      .slice((page - 1) * size, page * size)
      .map((book) => omit(book, "password"));

    res.json({
      success: true,
      data: { list, total: responseList.length },
      errorCode: 0
    });
  },
  "DELETE /api/book/:id": (req, res) => {
    const { id } = req.params;
    const delIndex = bookList.list.findIndex((book) => book.id === +id);
    bookList.list.splice(delIndex, 1);
    res.json({
      success: true,
      errorCode: 0
    });
  },
  "PATCH /api/book/:id": (req, res) => {
    const { id: bookId } = req.params;
    const newBookInfo = req.body;

    for (let i = 0; i < bookList.list.length; i++) {
      const target = bookList.list[i];
      if (target.id === +bookId) {
        for (let key in newBookInfo) {
          if (newBookInfo.hasOwnProperty(key)) {
            bookList.list[i][key] = newBookInfo[key];
          }
        }
        break;
      }
    }

    res.json({
      success: true,
      errorCode: 0
    });
  },
  "POST /api/book": (req, res) => {
    const newBookInfo = req.body;
    const newId = bookList.list[bookList.list.length - 1].id + 1;
    bookList.list.push({
      ...newBookInfo,
      id: newId
    });
    res.json({
      success: true,
      errorCode: 0,
      data: newBookInfo
    });
  }
};
