const addDigiNubmerStr = (snum) => {
  return ((Number(snum) < 10) ? "0" + snum.toString(): snum.toString())
}

export default (datetime) => {
  var time = new Date(datetime)
  return `${time.getFullYear()}-${addDigiNubmerStr(time.getMonth() + 1)}-${addDigiNubmerStr(time.getDate())} ${addDigiNubmerStr(time.getHours())}:${addDigiNubmerStr(time.getMinutes())}:${addDigiNubmerStr(time.getSeconds())}`
}