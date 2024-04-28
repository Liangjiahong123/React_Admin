import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@umijs/max";
import { ProTable } from "@ant-design/pro-components";
import { Tag, Switch, Button, Popconfirm, App, Modal } from "antd";
import { objIsEqual } from "@/utils/valid";
import AdminForm from "./components/adminForm";

const AdminList = () => {
  const dispatch = useDispatch();
  const { adminList, adminTotal } = useSelector((state) => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editInfo, setEditInfo] = useState(null);
  const { message } = App.useApp();

  useEffect(() => {
    dispatch({
      type: "admin/fetchAdminList",
      payload: { page: currentPage, size: 10, ...searchParams }
    });
  }, [currentPage, searchParams]);

  const columns = [
    {
      title: "登录账号",
      dataIndex: "account",
      key: "account"
    },
    {
      title: "用户名",
      dataIndex: "username",
      align: "center",
      key: "username"
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      align: "center",
      key: "nickName"
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      valueType: "avatar",
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
      title: "角色",
      dataIndex: "role",
      key: "role",
      align: "center",
      valueEnum: {
        1: { text: "超级管理员" },
        2: { text: "管理员" },
        3: { text: "普通用户" }
      },
      render: (_, row) => {
        const roleInfo = [
          { text: "未知", color: "geekblue" },
          { text: "超级管理员", color: "orange" },
          { text: "管理员", color: "blue" },
          { text: "普通用户", color: "green" }
        ][row.role];

        return (
          <Tag color={roleInfo.color} key={row.id}>
            {roleInfo.text}
          </Tag>
        );
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
            onChange={(value) => handleChangeAdminStatus(row, value)}
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
            <Button type="link" size="small" onClick={() => handleOpenEditModal(row)}>
              编辑
            </Button>
            <Popconfirm
              title="是否确定删除该管理员？"
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

  // 删除管理员
  async function handleDeleteConfirm(row) {
    const { errorCode } = await dispatch({ type: "admin/fetchDeleteAdminById", payload: row });
    if (errorCode !== 0) return;
    message.success("删除成功");
  }

  // 修改管理员状态
  async function handleChangeAdminStatus(row, value) {
    const { errorCode } = await dispatch({
      type: "admin/fetchEditAdmin",
      payload: { adnimInfo: row, newAdminInfo: { enable: value } }
    });
    if (errorCode !== 0) return;
    message.success(value ? "启用成功" : "禁用成功");
  }

  // 按条件查询管理员
  function handleSearchAdmin(params) {
    if (objIsEqual(params, searchParams)) return;
    setSearchParams(params);
  }

  // 清空查询结果
  function handleResetSearch() {
    if (objIsEqual({}, searchParams)) return;
    setSearchParams({});
  }

  // 打开编辑弹窗
  function handleOpenEditModal(row) {
    setEditInfo(row);
    setModalOpen(true);
  }

  async function handleEditOk() {
    const { errorCode } = await dispatch({
      type: "admin/fetchEditAdmin",
      payload: { adnimInfo: editInfo, newAdminInfo: editInfo }
    });
    if (errorCode !== 0) return message.error("修改失败");
    message.success("修改成功");
    setModalOpen(false);
  }

  return (
    <>
      <ProTable
        headerTitle="管理员列表"
        options={{ reload: false }}
        dataSource={adminList}
        rowKey={(row) => row.id}
        columns={columns}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
          current: currentPage,
          total: adminTotal,
          onChange: setCurrentPage
        }}
        onSubmit={handleSearchAdmin}
        onReset={handleResetSearch}
      />

      <Modal
        title="编辑管理员"
        open={modalOpen}
        onOk={handleEditOk}
        onCancel={() => setModalOpen(false)}
      >
        <AdminForm
          type="edit"
          adminInfo={editInfo}
          setAdminInfo={setEditInfo}
          handleSubmit={handleEditOk}
        />
      </Modal>
    </>
  );
};

export default AdminList;
