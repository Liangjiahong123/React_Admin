import { useState, useRef, useCallback } from "react";
import { ProTable, PageContainer } from "@ant-design/pro-components";
import { Switch, Button, Popconfirm, App } from "antd";
import { useNavigate } from "@umijs/max";
import { getUserListApi, editUserApi, deleteUserByIdApi } from "services/user";
import UserDetailModal from "./components/userDetailModal";

const UserList = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 10 });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(false);

  const columns = [
    {
      title: "序号",
      align: "center",
      width: 50,
      hideInSearch: true,
      render: (_, row, index) => (pageInfo.current - 1) * pageInfo.pageSize + index + 1
    },
    {
      title: "登录账号",
      dataIndex: "account",
      key: "account",
      align: "center"
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "nickName",
      align: "center"
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      valueType: "image",
      hideInSearch: true
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      valueEnum: {
        0: { text: "男" },
        1: { text: "女" }
      }
    },
    {
      title: "账号状态",
      dataIndex: "enable",
      key: "enable",
      align: "center",
      valueEnum: {
        0: { text: "禁用" },
        1: { text: "启用" }
      },
      render: (_, row) => {
        return (
          <Switch
            key={row.id}
            size="small"
            onChange={(value) => handleChangeUserStatus(row, value)}
            defaultChecked={row.enable}
          />
        );
      }
    },
    {
      title: "操作",
      width: 150,
      align: "center",
      key: "option",
      render: (_, row) => {
        return (
          <div key={row.id}>
            <Button type="link" size="small" onClick={() => handleOpenDetailModal(row)}>
              详情
            </Button>
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

  // 获取用户列表
  async function getUserListQuery(params) {
    const { current, pageSize, ...rest } = params;
    const { data } = await getUserListApi({ page: current, size: pageSize, ...rest });
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

  // 修改用户的状态
  async function handleChangeUserStatus(row, value) {
    const { errorCode } = await editUserApi(row.id, { enable: value });
    if (errorCode !== 0) return;
    message.success("修改成功");
  }

  // 跳转编辑页面
  function handleNavToEditPage(row) {
    navigate(`/user/edit/${row.id}`, { state: row });
  }

  // 打开详情弹窗
  function handleOpenDetailModal(row) {
    setCurrentRow(row);
    setModalOpen(true);
  }

  // 关闭详情弹窗
  function handleCloseDetailModal() {
    setCurrentRow({});
    setModalOpen(false);
  }

  // 删除用户
  async function handleDeleteConfirm(row) {
    const { errorCode } = await deleteUserByIdApi(row.id);
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
        headerTitle="用户列表"
        request={getUserListQuery}
      />
      <UserDetailModal modalOpen={modalOpen} row={currentRow} onClose={handleCloseDetailModal} />
    </PageContainer>
  );
};

export default UserList;
