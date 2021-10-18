import React from "react";
import { createTheme , MuiThemeProvider } from "@material-ui/core/styles";
import './App.css';

import Header from './Header'
import ManagerDevice from './Managerdevice'
import PRVConfig from './PRVConfig'
import DeviceConfig from './DeviceConfig'
import Redirect from './Redirect'
import Test from './test'
// import Footer from './Footer'

import { useRoutes } from 'react-router-dom';
import Login from './Login'
import { store } from './stores/store'

import sconfig from './config'

// import PWAmqtt from './module/mqtt'

// var client = new PWAmqtt(MQTT, 'dwdev.info', 8083)
// async function ConnectMqtt () {
//   var isConnect = await client.onConnect()
//   console.log(isConnect)
// }
// ConnectMqtt()

// try{
//   client = new MQTT.Client(sconfig.mqtt_url, Number('8083'), "__LOGGER_WEB_CONFIG_MANAGER__" + Math.random().toString().slice(2,10));
//   client.onConnectionLost = (responseObject) => {
//     if (responseObject.errorCode !== 0) {
//       console.log('onConnectionLost')
//       console.log(responseObject.errorMessage);
//       window.location.reload();
//     }
//   };
//   client.connect({onSuccess:onConnect, keepAliveInterval : 10, reconnect : true});
//   function onConnect() {
//     console.log("onConnect");
//   }
// }catch(e){
//   console.log(e)
// }

const theme = createTheme ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200
    }
  }
});

const Home = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
          
      <Header store={props.store} />
      
      <ManagerDevice store={props.store} />
      {/* <Test store={props.store}/> */}
      
      {/* <Footer /> */}
      
    </MuiThemeProvider>
  )
}

const PRV = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
          
      <Header store={props.store} />
      
      <PRVConfig store={props.store} />

      {/* <Footer /> */}
      
    </MuiThemeProvider>
  )
}

const Config = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
          
      <Header store={props.store} />
      
      <DeviceConfig store={props.store}  />

      {/* <Footer /> */}
      
    </MuiThemeProvider>
  )
}

const RedirectPage = (props) => {
  return (
    <Redirect store={store} />
  )
}

function App() {
  const routing = useRoutes([
    {
      path: '/',
      element: <Login store={store}/>,
    },{
      path: '/Home',
      element: <Home store={store} />,
    }, {
      path: '/Login',
      element: <Login store={store} />,
    }, {
      path: "/PRVConfig",
      element: <PRV store={store} />
    }, {
      path: "/Config",
      element: <Config store={store} />
    }, {
      path: "/redirect",
      element: <RedirectPage store={store} />
    },
  ]);

  return (
    <div>
      {routing}
    </div>
  );
}

export default App;
