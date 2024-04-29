import { useState, useRef } from "react";
import { ProTable, PageContainer } from "@ant-design/pro-components";
import { Button, Popconfirm, App, Tag, Select } from "antd";
import { getBookListApi, deleteBookByIdApi } from "services/book";
import { useNavigate } from "@umijs/max";
import { BOOK_TYPE } from "constants/book";
import { generateSelectOptions } from "./utils";

const BookList = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 10 });
  const columns = [
    {
      title: "序号",
      align: "center",
      width: 50,
      hideInSearch: true,
      render: (_, row, index) => (pageInfo.current - 1) * pageInfo.pageSize + index + 1
    },
    {
      title: "名称",
      dataIndex: "bookName",
      key: "bookName",
      align: "center",
      ellipsis: true
    },
    {
      title: "分类",
      dataIndex: "type",
      key: "type",
      align: "center",
      render(_, row) {
        return <Tag color="purple">{BOOK_TYPE.get(row.type)}</Tag>;
      },
      renderFormItem() {
        return <Select allowClear>{generateSelectOptions(Select, BOOK_TYPE)}</Select>;
      }
    },
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      align: "center",
      valueType: "image",
      hideInSearch: true
    },
    {
      title: "浏览数",
      dataIndex: "visitCount",
      key: "visitCount",
      align: "center",
      hideInSearch: true
    },
    {
      title: "评论数",
      dataIndex: "commentCount",
      key: "commentCount",
      align: "center",
      hideInSearch: true
    },
    {
      title: "上架日期",
      dataIndex: "publishDate",
      key: "publishDate",
      align: "center",
      width: 150,
      hideInSearch: true
    },
    {
      title: "操作",
      width: 150,
      align: "center",
      key: "option",
      render: (_, row) => {
        return (
          <div key={row.id}>
            <Button type="link" size="small" onClick={() => handleNavToEditPage(row)}>
              编辑
            </Button>
            <Popconfirm
              title="是否确定删除该用户？"
              onConfirm={() => handleDeleteConfirm(row)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
      hideInSearch: true
    }
  ];

  // 获取书籍列表
  async function getBookListQuery(params) {
    const { current, pageSize, ...rest } = params;
    const { data } = await getBookListApi({ page: current, size: pageSize, ...rest });
    return {
      data: data.list,
      success: true,
      total: data.total
    };
  }

  // 分页发生变化执行
  function handlePageChange(current, pageSize) {
    setPageInfo({ current, pageSize });
  }

  // 跳转编辑
  function handleNavToEditPage(row) {
    navigate(`/books/edit/${row.id}`, { state: row });
  }

  // 删除书籍
  async function handleDeleteConfirm(row) {
    const { errorCode } = await deleteBookByIdApi(row.id);
    if (errorCode !== 0) return;
    message.success("删除成功");
    tableRef.current.reload();
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        options={{ reload: false }}
        pagination={{
          ...pageInfo,
          hideOnSinglePage: true,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "40", "50"],
          onChange: handlePageChange
        }}
        rowKey={(row) => row.id}
        columns={columns}
        debounceTime={200}
        bordered
        headerTitle="书籍列表"
        request={getBookListQuery}
      />
    </PageContainer>
  );
};

export default BookList;
