import { getAdminListApi, deleteAdminByIdApi, editAdminsApi, addAdminApi } from "@/services/admin";

export default {
  namespace: "admin",
  state: {
    adminList: [],
    adminTotal: 0
  },
  reducers: {
    setAdminList(state, { payload }) {
      return { ...state, adminList: payload?.list || [], adminTotal: payload?.total ?? 0 };
    },

    deleteAdminById(state, { payload }) {
      const delIndex = state.adminList.findIndex((admin) => admin.id === payload.id);
      const newAdminList = [...state.adminList];
      newAdminList.splice(delIndex, 1);
      return { ...state, adminList: newAdminList, adminTotal: state.adminTotal - 1 };
    },

    editAdmins(state, { payload }) {
      const { adnimInfo, newAdminInfo } = payload;
      const newAdminList = [...state.adminList];

      for (let i = 0; i < newAdminList.length; i++) {
        if (newAdminList[i].id === adnimInfo.id) {
          for (let key in newAdminInfo) {
            if (newAdminInfo.hasOwnProperty(key)) {
              newAdminList[i][key] = newAdminInfo[key];
            }
          }
          break;
        }
      }

      return { ...state, adminList: newAdminList };
    },

    addAdmin(state, { payload }) {
      const newAdminList = [...state.adminList];
      newAdminList.push(payload);
      return { ...state, adminList: newAdminList };
    }
  },
  effects: {
    /**
     * 获取所有管理员
     * @param { Object: {page: number, size: number} } payload - 请求参数
     */
    *fetchAdminList({ payload }, { call, put }) {
      const { data } = yield call(getAdminListApi, payload);
      yield put({ type: "setAdminList", payload: data });
    },

    /**
     * 删除管理员
     * @param { Object: { id: number } } payload - 请求参数
     */
    *fetchDeleteAdminById({ payload }, { call, put }) {
      const result = yield call(deleteAdminByIdApi, payload.id);
      if (result.errorCode !== 0) return result;
      yield put({ type: "deleteAdminById", payload });
      return result;
    },

    /**
     * 修改管理员状态
     * @param { Object: { id: number, enable: number } } payload - 请求参数
     */
    *fetchEditAdmin({ payload }, { call, put }) {
      const { adnimInfo, newAdminInfo } = payload;
      const result = yield call(editAdminsApi, adnimInfo.id, newAdminInfo);
      if (result.errorCode !== 0) return result;
      yield put({ type: "editAdmins", payload });
      return result;
    },

    // 新增管理员
    *fetchAddAdmin({ payload }, { call, put }) {
      const result = yield call(addAdminApi, payload);
      if (result.errorCode !== 0) return result;
      yield put({ type: "addAdmin", payload });
      return result;
    }
  }
};
