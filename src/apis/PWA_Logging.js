import server from '.'

// const getLog = async (body) => {
//   const res = await server().post("/find/logs", body)
//   return res
// }

// new API forword by php
const getLog = async (body) => {
  const res = await server().post("/logs.php", body)
  return res
}
export {
  getLog
}