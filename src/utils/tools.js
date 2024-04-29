export function generateRandomColor() {
  let color;
  do {
    const hex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0");
    // 生成一个随机的颜色
    color = `#${hex}`;
  } while (color === "#ffffff");

  return color;
}

export function resSuccess(res, data) {
  res.json({
    success: true,
    errorCode: 0,
    data
  });
}

export function resError(res, msg) {
  res.json({
    success: false,
    errorCode: -1,
    errMsg: msg,
    data: null
  });
}
