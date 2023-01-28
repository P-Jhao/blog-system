//工具库集合

export function formatDate(timeStamp) {
  const date = new Date(timeStamp);
  const year = date.getFullYear().toString().padStart(2, 0);
  const month = (date.getMonth() + 1).toString().padStart(2, 0);
  const day = date.getDate().toString().padStart(2, 0);

  const hour = date.getHours().toString().padStart(2, 0);
  const minute = date.getMinutes().toString().padStart(2, 0);
  const second = date.getSeconds().toString().padStart(2, 0);

  const weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const week = weekArr[date.getDay()];

  return `${year}-${month}-${day} ${hour}:${minute}:${second} ${week}`;
}
