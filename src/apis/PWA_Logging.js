import server from '.'

const getLog = async (body) => {
  const res = await server().post("/find/logs", body)
  return res
}
export {
  getLog
}