import { useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { useNavigate } from "@umijs/max";
import { App } from "antd";
import BookForm from "./components/BookForm";
import { addBookApi } from "services/book";

const AddBook = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState({
    bookName: "",
    type: "",
    desc: "",
    cover: "",
    visitCount: 0,
    commentCount: 0,
    publishDate: "",
    socre: 5,
    link: ""
  });

  async function handleSubmit(content) {
    const { errorCode } = await addBookApi({ ...bookInfo, desc: content });
    if (errorCode !== 0) return;
    message.success("新增成功");
    navigate("/books/list");
  }
  return (
    <PageContainer>
      <div style={{ maxWidth: "1000px" }}>
        <BookForm
          type="add"
          bookInfo={bookInfo}
          setBookInfo={setBookInfo}
          handleSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
};

export default AddBook;
