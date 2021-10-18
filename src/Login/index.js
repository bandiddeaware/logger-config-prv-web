import React from 'react'
import { useNavigate } from "react-router-dom";
import { getToken, getUser, userTest } from './../apis/PWA_Auth'
import Cookies from 'universal-cookie';

// Media
import './login.css'
import image from './../asset/images/logo.png'

import { USERINFO, TOKEN} from './../stores/actions'

const cookies = new Cookies();

function Login(props) {
  let history = useNavigate();
  const [store] = React.useState(props.store)
  const [username, setusername] = React.useState("")
  const [password, setpassword] = React.useState("")

  const handleLogin = async () => {
    if (username !== "" || password !== ""){
      var res = await getToken({
        username: username,
        password: password
      })
      store.dispatch(TOKEN([res.data]))
      if (res.status === 200){
        cookies.set(
          
          'Token', 
          
          JSON.stringify([res.data]), 
          
          { path: '/', expires: new Date(), maxAge: 60 * 60 * 24 }
        );
        var res = await getUser({
          token: res.data
        })
        if (res.status === 200){
          if (res.data.msg !== undefined){
            console.log(res.data)
            if (res.data.msg === "Invalid user" || res.data.msg === "Invalid password"){
              alert("Username หรือ Password ผิดกรุณาตรวจสอบใหม่อีกครั้ง")
            }
          }else {
  
            cookies.set(
  
              'UserInfo', 
  
              JSON.stringify([res.data]), 
  
              { path: '/', expires: new Date(), maxAge: 60 * 60 * 24}
            );
  
            store.dispatch(USERINFO([res.data]))
            history('/Home');
          }
        }
      }
    }else {
      alert("กรุณากรอก Username หรือ Password ด้วย")
    }
  }

  // #################### for test ####################
  // const handleLogin = async () => {
  //   var res = await userTest({
  //     username: username,
  //     password: password
  //   })
  //   if (res.status === 200){

  //     store.dispatch(TOKEN(res.data.token))

  //     cookies.set(

  //       'Token', 

  //       JSON.stringify([res.data.token]), 
      
  //       { path: '/', expires: new Date(), maxAge: 60 * 60 * 24}

  //     );

  //     cookies.set(

  //       'UserInfo', 

  //       JSON.stringify([res.data.data]), 

  //       { path: '/', expires: new Date(), maxAge: 60 * 60 * 24}

  //     );

  //     store.dispatch(USERINFO([res.data.data]))

  //     history('/Home');
      
  //   }
  // }
  // #################### for test ####################

  const handleUsername = (e) => {
    setusername(e.target.value)
  }
  const handlePassword = (e) => {
    setpassword(e.target.value)
  }
  const _handleKeyDown = (e) => {
    if (e.key === "Enter"){
      handleLogin()
    }
  }
  return (
    <div className="login-container">
      <div className="login-warp">
        <div className="login-form-avatar">
          <img src={image} alt="LOGO"  width="100%" height="100%"/> 
        </div>

        <div className="login-title">โปรแกรมจัดการล๊อกเกอร์</div>
        <div className="login-username">
          <label>Username</label>
          <input type="text"className="input-username" onChange={handleUsername} placeholder="Username" onKeyDown={_handleKeyDown} />
        </div>

        <div className="login-password">
          <label>Password</label>
          <input type="password"className="input-password" onChange={handlePassword} placeholder="Password" onKeyDown={_handleKeyDown} />
        </div>

        <div className="login-confirm">
          <button className="btn-confirm" onClick={handleLogin}>Login</button>
        </div>

      </div>
    </div>
  )
}

export default Login