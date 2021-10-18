import React from "react"
import { useLocation } from "react-router-dom";
import './index.css'
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputBase from "@material-ui/core/InputBase"
import DialogManaul from './dialog_manual'

import { useNavigate } from "react-router-dom";

import { DEVICE } from "./../stores/actions"

import { updateConfig } from './../apis/PWA_Config'

import MQTT from 'paho-mqtt'
import PWAMqtt from './../module/mqtt_v2'
import { TrendingUpRounded } from "@material-ui/icons";
import sconfig from './../config'
var mqtt_connection = new PWAMqtt(MQTT, sconfig.mqtt_url, 8083, sconfig.mqtt_user, sconfig.mqtt_pass)

let IntervalCheckStore

const SaveValve = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#4267ec"),
    backgroundColor: "#023e8a",
    color: "#fff",
    '&:hover': {
      backgroundColor: "#023e8a",
      color: "#fff"
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
  },
  fontinherit: {
    fontFamily: "inherit"
  },
  margin: {
    marginLeft: "30px",
  },
  spaceLeft: {
    marginLeft: "4px",
    width: "100px"
  },
  spaceLeftout: {
    marginLeft: "4px",
    width: "100px"
  },
  spaceRight: {
    marginRight: "6px",
    width: "100px"
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  saveButton: {
    marginTop: "2px",
    width: "100px"
  }
}));

const FormInputStyle = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PRVConfig = (props) => {
  const classes = useStyles()
  let query = useQuery()
  let history = useNavigate();
  const [store] = React.useState(props.store)
  const [Serial, setSerial] = React.useState(props.serial)
  const [valve, setvalve] = React.useState("")
  const [btnDisabled, setbtnDisabled] = React.useState(false)

  const [modalstate, setmodalstate] = React.useState(0)

  React.useEffect(() => {
    var Serial_no = query.get("remotename")
    setSerial(Serial_no)

    // search PRVConfig
    IntervalCheckStore = setInterval(() => {
      var device_ = store.getState().Device
      var myDevice = []
      device_.forEach((item, index) => {
        if (item.serial_no === Serial){
          myDevice.push(item)
        }
      })
      if (myDevice[0] !== undefined){
        setvalve(Object.assign({}, myDevice[0].manual)) 
      }
    }, 200)

    return () => {
      clearInterval(IntervalCheckStore)
      // mqtt_connection = null
    }
  }, [])

  const handleChangeValve = (e) => {
    var value = e.target.value
    var valve_ = valve
    valve_.valve = value
    setvalve(Object.assign({}, valve_))

    var device = store.getState().Device
    device.forEach((item, index) => {
      if (item.serial_no === Serial){
        item.manual = valve_
      }
    })
    store.dispatch(DEVICE(device))
  }

  // const handleSubmitValve = async () => {
  //   var manual = []
  //   var device = store.getState().Device
  //   device.forEach((item) => {
  //     if (item.serial_no === Serial){
  //       manual.push(item.manual)
  //     }
  //   })
  //   const res = await updateConfig({
  //     "serial_no": Serial,
  //     "manual": manual[0]
  //   })
  //   if (res.status === 200){
  //     alert("บันทึกสำเร็จ")
  //   }
  // }

  const handleSubmitValve = async () => {
    var manual = []
    var device = store.getState().Device
    var userinfo = store.getState().UserInfo[0]
    var devicelog = []
    device.forEach((item) => {
      if (item.serial_no === Serial){
        manual.push(item.manual)
        devicelog.push(item)
      }
    })
    setbtnDisabled(true)
    setmodalstate(0)
    var connection = await mqtt_connection.onConnect()
    if (connection){
      mqtt_connection.onSubscript("logger/"+Serial+"/prv/valve")
      const res = await mqtt_connection.onMessageManual("logger/"+Serial+"/prv/valve/set", JSON.stringify({
        manual: manual[0]
      }), 10)
      
      if (res === false){
        // setmodalstate(1)
        alert(`ไม่สามารถส่งข้อมูลอัพเดทข้อมูลที่จุดติดตั้ง ${Serial} ได้`)
        // history("/PRVConfig?serial=" + Serial);
        window.location.reload()
      }else {
        const resapi = await updateConfig({
          "serial_no": Serial,
          "manual": {valve: res.manual.valve},
          "mode": "manual",

          "dmacode": devicelog[0].dmacode,
          "dmaname": devicelog[0].dmaname,
          "dmakhet": devicelog[0].dmakhet,


          "user": userinfo.user, 
          "name": userinfo.name, 
          "position": userinfo.position, 
          "access_level_id": userinfo.access_level_id, 
          "access_level_desc": userinfo.access_level_desc, 

          "wwcode": userinfo.wwcode, 
          "wwcode_desc": userinfo.wwcode_desc, 

          "region_id": userinfo.region_id, 
          "region_desc": userinfo.region_desc, 

          "zone_desc": userinfo.zone_desc, 
          "zone_id": userinfo.zone_id, 

        })
        if (resapi.status === 200){
          var disconnection = await mqtt_connection.onDisconnect()
          if (disconnection){
            // alert("บันทึกสำเร็จ")
            setmodalstate(2)
            setTimeout(() => {
              setbtnDisabled(false)
            }, 2000)
          } else {
            // console.log("disconnection : unsuccess")
            setmodalstate(3)
            setTimeout(() => {
              setbtnDisabled(false)
            }, 2000)
          }
        }
      }
    }



    // const res = await updateConfig({
    //   "serial_no": Serial,
    //   "manual": manual[0]
    // })
    // if (res.status === 200){
    //   alert("บันทึกสำเร็จ")
    // }
  }

  return (
    <>
      <div className="prv-auto-config-header-new">
        ตั้งค่าควบคุม Valve %
      </div>


      <Grid container spacing={1} style={
        {
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "5px"
        }
      }>
        <Grid item xs={1} style={{paddingTop: "14px"}}>
          Valve %:
        </Grid>
        <Grid item xs={3}>
          <FormInputStyle
            value={((valve.valve !== undefined) ? valve.valve: "")}
            onChange={handleChangeValve}
            placeholder="Valve"
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <SaveValve className={classes.saveButton} variant="contained" disabled={btnDisabled}
            onClick={handleSubmitValve}
          >
            บันทึก
          </SaveValve>
          <DialogManaul open={btnDisabled} state={modalstate} />
        </Grid>
      </Grid>
    </>
  )
}

export default PRVConfig