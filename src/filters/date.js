export default function (time) {
  const date = new Date(time * 1000);
  return date.toLocaleDateString();
  //toLocaleDateString() 方法可根據本地時間把Date 對象的日期部分轉換為字符串，並返回結果。
}