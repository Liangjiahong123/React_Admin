import { useState } from "react";
import { App } from "antd";
import { useNavigate, useParams, useLocation } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";
import { editBookApi } from "services/book";
import BookForm from "./components/BookForm";

const EditBook = () => {
  const params = useParams();
  const location = useLocation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState({ ...location.state });

  async function handleSubmit(content) {
    const { errorCode } = await editBookApi(params.id, { ...bookInfo, desc: content });
    if (errorCode !== 0) return;
    message.success("修改成功");
    navigate("/books/list");
  }
  return (
    <PageContainer>
      <div style={{ maxWidth: "1000px" }}>
        <BookForm
          type="edit"
          bookInfo={bookInfo}
          setBookInfo={setBookInfo}
          handleSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
};

export default EditBook;
