import { Modal, Descriptions, Image } from "antd";

const UserDetailModal = ({ modalOpen, row = {}, onClose }) => {
  const keyMap = {
    id: { label: "ID", content: row?.id },
    account: { label: "登录账号", content: row?.account },
    nickName: { label: "昵称", content: row?.nickName },
    avatar: { label: "头像", content: <Image src={row?.avatar} /> },
    qq: { label: "QQ", content: row?.qq },
    wechat: { label: "微信", content: row?.wechat },
    self: { label: "自我介绍", content: row?.self },
    gender: { label: "性别", content: row?.gender === 0 ? "男" : "女" },
    enable: { label: "账号状态", content: row?.enable === 0 ? "禁用" : "启用" }
  };
  const items = Object.keys(row).map((key, index) => ({
    key: row.id,
    label: keyMap[key].label,
    children: keyMap[key].content
  }));

  return (
    <Modal open={modalOpen} footer={null} onCancel={onClose} width={600}>
      <Descriptions title="用户详情" items={items} column={1} />
    </Modal>
  );
};

export default UserDetailModal;
