/**
 * 判断是否有权限
 * @param {*} initialState 由umi自动注入，对应的是在getInitState方法中的返回值
 */
export default (initialState) => {
  // 该函数返回一个对象，对象中对应一个个权限，每个权限对应的是布尔值
  return {
    superAdmin: initialState?.adminInfo?.role === 1,
    normalAdmin: [1, 2].includes(initialState?.adminInfo?.role)
  };
};
