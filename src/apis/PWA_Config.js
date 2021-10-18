import server from '.'

// const getConfig = async (body) => {
//   const res = await server().post("/find", body)
//   return res
// }
// const updateConfig = async (body) => {
//   const res = await server().post("/update", body)
//   return res
// }
// const saveConfig = async (body) => {
//   const res = await server().put("/save", body)
//   return res
// }
// const deleteConfig = async (body) => {
//   const res = await server().delete("/", {data: body})
//   return res
// }
// const getProvince = async (body) => {
//   const res = await server().post("/province", body)
//   return res
// }
// const getDMAUnique = async () => {
//   const res = await server().post("/find/dmacode")
//   return res
// }


// new API forword by php
const getConfig = async (body) => {
  const res = await server().post("/find.php", body)
  console.log(res)
  return res
}
const updateConfig = async (body) => {
  const res = await server().post("/update_config.php", body)
  return res
}
const saveConfig = async (body) => {
  const res = await server().post("/save_config.php", body)
  console.log(" =================== save ==================")
  console.log(res)
  console.log(body)
  console.log(" =================== end ==================")
  return res
}
const deleteConfig = async (body) => {
  const res = await server().post("/delete_config.php", {data: body})
  console.log(res)
  return res
}
const getProvince = async (body) => {
  const res = await server().post("/province.php", body)
  return res
}
const getDMAUnique = async () => {
  const res = await server().post("/find_dmacode.php")
  return res
}
export {
  getConfig,
  updateConfig,
  saveConfig,
  deleteConfig,
  getProvince,
  getDMAUnique,
}