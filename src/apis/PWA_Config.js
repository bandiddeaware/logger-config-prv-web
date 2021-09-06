import server from '.'

const getConfig = async (body) => {
  const res = await server().post("/find", body)
  return res
}
const updateConfig = async (body) => {
  const res = await server().post("/update", body)
  return res
}
const saveConfig = async (body) => {
  const res = await server().put("/save", body)
  return res
}
const deleteConfig = async (body) => {
  const res = await server().delete("/", {data: body})
  return res
}
const getProvince = async (body) => {
  const res = await server().post("/province", body)
  return res
}
const getDMAUnique = async () => {
  const res = await server().post("/find/dmacode")
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