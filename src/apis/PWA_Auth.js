import server from './auth';
import FormData from 'form-data';

const getToken = async (bdata) => {
  var data = new FormData();
  data.append('action', 'get_token');
  data.append('user', bdata.username);
  data.append('pass', bdata.password);
  const res = await server().post('/api/authenDma.php', data)
  return res
}
const getUser = async (bdata) => {
  var data = new FormData();
  data.append('action', 'get_user');
  data.append('token', bdata.token);
  const res = await server().post('/api/authenDma.php', data)
  return res
}

const userTest = async (bdata) => {
  const res = await server().post('/login/user', bdata)
  return res
}

export {
  getToken,
  getUser,
  userTest
}


// http://dwdev.info/api/getDmalist.php?wwcode=5542016\
// http://dwdev.info/api/authenDma.php