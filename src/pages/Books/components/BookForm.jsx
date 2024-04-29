import { useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload, Button } from "antd";
import { useNavigate } from "@umijs/max";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/react-editor";
import { generateSelectOptions } from "../utils";
import { BOOK_TYPE } from "constants/book";

const BookForm = ({ type, bookInfo, setBookInfo, handleSubmit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editorRef = useRef();
  useEffect(() => {
    form.setFieldsValue(bookInfo);
    editorRef.current.getInstance().setHTML(bookInfo.desc);
  }, [form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const cancelBtn =
    type === "edit" ? (
      <Button className="reset-btn" onClick={() => navigate("/books/list")}>
        返回
      </Button>
    ) : (
      <Button className="reset-btn" onClick={handleResetForm}>
        重置
      </Button>
    );

  function handleUpdateInfo(newVal, key) {
    const newBookInfo = { ...bookInfo };
    newBookInfo[key] = newVal;
    setBookInfo(newBookInfo);
  }

  function handleResetForm() {
    const newBookInfo = { ...bookInfo };
    for (const key in newBookInfo) {
      if (newBookInfo.hasOwnProperty(key)) {
        newBookInfo[key] = "";
      }
    }
    form.setFieldsValue(newBookInfo);
  }

  function handleSubmitForm() {
    const content = editorRef.current.getInstance().getHTML();
    handleSubmit(content);
  }

  return (
    <Form
      name="basic"
      form={form}
      initialValues={bookInfo}
      autoComplete="off"
      onFinish={handleSubmitForm}
    >
      {/* 书籍名称 */}
      <Form.Item
        label="名称"
        name="bookName"
        rules={[{ required: true, message: "请输入书籍名称" }]}
      >
        <Input
          value={bookInfo?.bookName}
          onChange={(e) => handleUpdateInfo(e.target.value, "bookName")}
        />
      </Form.Item>
      {/* 书籍介绍 */}
      <Form.Item
        label="书籍介绍"
        name="desc"
        rules={[{ required: true, message: "请输入书籍相关的介绍" }]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut
          language="zh-CN"
          ref={editorRef}
        />
      </Form.Item>
      {/* 下载链接 */}
      <Form.Item
        label="下载链接"
        name="link"
        rules={[{ required: true, message: "请输入书籍链接" }]}
      >
        <Input value={bookInfo?.link} onChange={(e) => handleUpdateInfo(e.target.value, "link")} />
      </Form.Item>
      {/* 所需积分 */}
      <Form.Item
        label="所需积分"
        name="score"
        rules={[{ required: true, message: "请选择下载所需积分" }]}
      >
        <Select value={bookInfo?.score} onChange={(val) => handleUpdateInfo(val, "score")}>
          {[20, 30, 40].map((i) => (
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {/* 书籍分类 */}
      <Form.Item
        label="书籍分类"
        name="type"
        rules={[{ required: true, message: "请选择书籍分类" }]}
      >
        <Select value={bookInfo?.type} onChange={(val) => handleUpdateInfo(val, "type")}>
          {generateSelectOptions(Select, BOOK_TYPE)}
        </Select>
      </Form.Item>
      {/* 书籍封面 */}
      <Form.Item label="书籍封面" valuePropName="filelist" getValueFromEvent={normFile}>
        <Upload listType="picture-card" maxCount={1} action="/api/upload">
          <PlusOutlined />
        </Upload>
      </Form.Item>
      {/* 提交 */}
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          {type === "edit" ? "确认修改" : "确认新增"}
        </Button>
        {cancelBtn}
      </Form.Item>
    </Form>
  );
};

export default BookForm;
