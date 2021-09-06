import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import mqtt_v3 from './module/mqtt_v3'

import mqtt from 'mqtt';

const useStyles = makeStyles(() => ({
  margin: {
    margin: "20px"
  }
}));

const Test = (props) => {
  const [store] = React.useState(props.store)
  const classes = useStyles()
  const [ bntDisabled, setbtnDisabled ] = React.useState(false)

  return (
    <div style={{width: "100%"}}>

      <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
        async () => {

        }
      }>
        TEST
      </Button>

      <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
        () => {

        }
      }>
        Vavle
      </Button>


      <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
        () => {
          
        }
      }>
        Config
      </Button>


      <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
        () => {
          
        }
      }>
        Device
      </Button>


      <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
        () => {
          
        }
      }>
        Modbus
      </Button>

    </div>
  )
}

export default Test







// import React from 'react'
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import MQTT from 'paho-mqtt'
// import PWAMqtt from './module/mqtt_for_manual_auto'
// import sconfig from './../config'
// mqtt: var mqtt_connection = new PWAMqtt(MQTT, sconfig.mqtt_url, 8083, sconfig.mqtt_user, sconfig.mqtt_pass)

// const useStyles = makeStyles(() => ({
//   margin: {
//     margin: "20px"
//   }
// }));
// const useStylesFacebook = makeStyles((theme) => ({
//   root: {
//     position: 'relative',
//   },
//   bottom: {
//     color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
//   },
//   top: {
//     color: '#1a90ff',
//     animationDuration: '550ms',
//     position: 'absolute',
//     left: 0,
//   },
//   circle: {
//     strokeLinecap: 'round',
//   },
// }));
// function FacebookCircularProgress(props) {
//   const classes = useStylesFacebook();

//   return (
//     <div className={classes.root}>
//       <CircularProgress
//         variant="determinate"
//         className={classes.bottom}
//         size={25}
//         thickness={6}
//         {...props}
//         value={100}
//       />
//       <CircularProgress
//         variant="indeterminate"
//         disableShrink
//         className={classes.top}
//         classes={{
//           circle: classes.circle,
//         }}
//         size={25}
//         thickness={6}
//         {...props}
//       />
//     </div>
//   );
// }

// const Test = (props) => {
//   const [store] = React.useState(props.store)
//   const classes = useStyles()
//   const [ bntDisabled, setbtnDisabled ] = React.useState(false)

//   const PublicVavle = async () => {
//     var connection = await mqtt_connection.onConnect()
//     if (connection){
//       setbtnDisabled(true)
//       // subscript
//       mqtt_connection.onSubscript("logger/SM03-001/prv/valve")
//       // Message publish manual timeout 10s
//       const res = await mqtt_connection.onMessageManual("logger/SM03-001/prv/valve/set", JSON.stringify({
//         manual: {
//           valve: "300"
//         }
//       }), 10)
//       if (res === false){
//         alert("MQTT Error")
//       }else {
//         console.log(res)
//       }

//       var disconnection = await mqtt_connection.onDisconnect()
//       setbtnDisabled(false)
//       if (disconnection){
//         console.log("disconnection : success")
//       } else {
//         console.log("disconnection : unsuccess")
//       }
//     }
//   }

//   const PublicConfig = async () => {
//     var connection = await mqtt_connection.onConnect()
//     if (connection){
//       setbtnDisabled(true)
//       // subscript
//       mqtt_connection.onSubscript("logger/SM03-001/prv/config")

//       // Message publish auto timeout 10s
//       const resa = await mqtt_connection.onMessageAuto("logger/SM03-001/prv/config/set", JSON.stringify({
//         "failure_mode": {
//           "deadband_flow": "2",
//           "deadband_pressure": "2",
//           "limit_valve_min": "3",
//           "time_loog_min": "3",
//           "step_valve": "4",
//           "mode": "Pressure"
//         },
//         "prv_config": [{
//             "time": "00:45",
//             "flow": "",
//             "pressure": "3000",
//             "device_mode": "Pressure"
//           }, {
//             "time": "04:15",
//             "flow": "",
//             "pressure": "44444",
//             "device_mode": "Pressure"
//         }]
//       }), 10)
//       if (resa === false){
//         alert("MQTT Error")
//       }else {
//         console.log(resa)
//       }

//       var disconnection = await mqtt_connection.onDisconnect()
//       setbtnDisabled(false)
//       if (disconnection){
//         console.log("disconnection : success")
//       } else {
//         console.log("disconnection : unsuccess")
//       }
//     }
//   }


//   const PublicDevice = async () => {
//     var connection = await mqtt_connection.onConnect()
//     if (connection){
//       setbtnDisabled(true)
//       // subscript
//       mqtt_connection.onSubscript("logger/SM03-001/device/config")

//       // Message publish auto timeout 10s
//       const resa = await mqtt_connection.onMessageDevice("logger/SM03-001/device/config/set", JSON.stringify({
//         "ver": "999999999-DW-LG",
//         "dev": "999999999-DW-LG-DEV",
//         "sr": 60,
//         "tr": 65,
//         "den": 63,
//         "pt1": 1,
//         "pt2": 1,
//         "pt3": 1,
//         "pt4": 1,
//         "lp1": 10,
//         "lp2": 10,
//         "lp3": 10,
//         "lp4": 10,
//         "aen": 15,
//         "am1": 1,
//         "am2": 1,
//         "am3": 0,
//         "am4": 0,
//         "mn1": 4,
//         "mn2": 4,
//         "mn3": 0,
//         "mn4": 0,
//         "mx1": 20,
//         "mx2": 20,
//         "mx3": 10,
//         "mx4": 10,
//         "mmn1": 0,
//         "mmn2": 0,
//         "mmn3": 0,
//         "mmn4": 0,
//         "pc1": 6,
//         "pc2": 7,
//         "pc3": 8,
//         "pc4": 9,
//         "bsf": 11,
//         "fam": 5,
//         "fm1": 0,
//         "fm2": 0,
//         "fa1": 0,
//         "fa2": 0,
//         "apn": "internet",
//         "ip": "google.com",
//         "port": 1880,
//         "dest": "dmalogger"
//     }), 10)
//       if (resa === false){
//         alert("MQTT Error")
//       }else {
//         console.log(resa)
//       }
//       var disconnection = await mqtt_connection.onDisconnect()
//       setbtnDisabled(false)
//       if (disconnection){
//         console.log("disconnection : success")
//       } else {
//         console.log("disconnection : unsuccess")
//       }
//     }
//   }


//   const PublicModbus = async () => {
//     var connection = await mqtt_connection.onConnect()
//     if (connection){
//       setbtnDisabled(true)
//       // subscript
//       mqtt_connection.onSubscript("logger/SM03-001/modbus/config")

//       // Message publish auto timeout 10s
//       const resa = await mqtt_connection.onMessageModbus("logger/SM03-001/modbus/config/set", JSON.stringify({
//           "men": 1,
//           "mbd": 115200,
//           "mbt": 8,
//           "mst": 1,
//           "mpr": 0,
//           "mpl": 3333,
//           "mto": 4444,
//           "mml": [
//               {
//                   "mc": 1,
//                   "mn": "MAG8000"
//               }
//           ],
//           "mrs": [
//               {
//                   "mix": 0,
//                   "mid": 1,
//                   "mba": 3002,
//                   "mbf": 3,
//                   "tag": "fl1"
//               },
//               {
//                   "mix": 0,
//                   "mid": 1,
//                   "mba": 3017,
//                   "mbf": 3,
//                   "tag": "fa1"
//               }
//           ]
//       }), 10)
//       if (resa === false){
//         alert("MQTT Error")
//       }else {
//         console.log(resa)
//       }
//       var disconnection = await mqtt_connection.onDisconnect()
//       setbtnDisabled(false)
//       if (disconnection){
//         console.log("disconnection : success")
//       } else {
//         console.log("disconnection : unsuccess")
//       }
//     }
//   }


//   // mount
//   React.useState(() => {


//     // unmount
//     return () => {

//     }
//   }, [])

//   return (
//     <div style={{width: "100%"}}>

//       <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
//         () => {
//           PublicVavle()
//         }
//       }>
//         {/* <FacebookCircularProgress /> public */}
//         Vavle
//       </Button>


//       <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
//         () => {
//           PublicConfig()
//         }
//       }>
//         {/* <FacebookCircularProgress /> public */}
//         Config
//       </Button>


//       <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
//         () => {
//           PublicDevice()
//         }
//       }>
//         {/* <FacebookCircularProgress /> public */}
//         Device
//       </Button>


//       <Button variant="contained" color="primary" className={classes.margin} disabled={bntDisabled} onClick = {
//         () => {
//           PublicModbus()
//         }
//       }>
//         {/* <FacebookCircularProgress /> public */}
//         Modbus
//       </Button>

//     </div>
//   )
// }

// export default Test