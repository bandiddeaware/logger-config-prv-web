import server from './auth';

// url: http://dwdev.info/api/getDmalist.php?wwcode=5542016
const getPointInstall = async (param) => {
  const res = await server().post("/api/getDmalist.php?wwcode=" + param)
  return res
}

export {
  getPointInstall,
}