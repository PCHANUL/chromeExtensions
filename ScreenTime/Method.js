function toTime(int) {
  let num = parseInt(int / 1000);
  let sec = 0, min = 0, hour = 0;
  let calc;
  sec = num > 60 ? num % 60 : num;

  if (num > 60) {
    calc = parseInt(num / 60);
    min = calc > 60 ? calc % 60 : calc;
  }
  if (num > 3600) {
    calc = parseInt(num / 3600);
    hour = calc > 3600 ? calc % 3600 : calc;
  }

  return { sec, min, hour }
}

function getDateNow(prevDate) {
  let now = new Date();
  let date = now.getDate();
  if (prevDate.slice(6) === date) return prevDate;
  let month = now.getMonth();
  return `${now.getFullYear()}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}`;
}