import React from "react"
import { useLocation } from "react-router-dom";
import './index.css'
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import optional from './optional.json'
import InputBase from "@material-ui/core/InputBase"
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box'
import DialogAuto from './dialog_auto'

import PropTypes from 'prop-types';

import { useNavigate } from "react-router-dom";

import { DEVICE } from './../stores/actions'

import { updateConfig } from './../apis/PWA_Config'

import MQTT from 'paho-mqtt'
import PWAMqtt from './../module/mqtt_v2'
import { TrendingUpRounded } from "@material-ui/icons";
import sconfig from './../config'
var mqtt_connection = new PWAMqtt(MQTT, sconfig.mqtt_url, 8083, sconfig.mqtt_user, sconfig.mqtt_pass) 

let IntervalCheckStore

const StyledTalbe = withStyles({
  root: {
    fontFamily: "sans-serif !important"
  },
})(Table);

const AddButton = withStyles((theme) => ({
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

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#ff005c"),
    backgroundColor: "#ffeb3b",
    color: "#000",
    '&:hover': {
      backgroundColor: "#ffeb3b",
      color: "#000"
    },
  },
}))(Button);

const ConfirmButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#ff005c"),
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
  },
  NativeselectError: {
    border: "solid 1px #ff0000",
    borderRadius: "4px"
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
  const [Serial, setSerial] = React.useState("")
  const [selectRow, setselectRow] = React.useState(0)
  const [PRV_config, setPRV_config] = React.useState([])
  const [FailureMode, setFailureMode] = React.useState([])
  const [nativeError, setnativeError] = React.useState([false, false, false, false, false, false, false, false])
  const [arrFlow, setarrFlow] = React.useState([])
  const [arrPressure, setarrPressure] = React.useState([])
  const [btnDisabled, setbtnDisabled] = React.useState(false)
  const [modalstate, setmodalstate] = React.useState(0)

  function TabPanelContrainer(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        //eslint-disable-next-line
        role="TabPanelContrainer"
        hidden={value !== index}
        id={`scrollable-force-TabPanelContrainer-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <div>{children}</div>
          </Box>  
        )}
      </div>
    );
  }
  
  TabPanelContrainer.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const pop_prv =  () => {
    var PRV_config_ = PRV_config
    PRV_config_.pop()
    setPRV_config([...PRV_config_])

    // save to store

  }

  const ChangeStepValve = (e) => {
    var value = e.target.value
    var FailureMode_ = FailureMode
    FailureMode_.step_valve = value
    setFailureMode(Object.assign({}, FailureMode_))
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.failure_mode = FailureMode_
      }
    })
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial="+ Serial);
  }

  const ChangeTime_Loop_min = (e) => {
    var value = e.target.value
    var FailureMode_ = FailureMode
    FailureMode_.time_loog_min = value
    setFailureMode(Object.assign({}, FailureMode_))
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.failure_mode = FailureMode_
      }
    })
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial="+ Serial);
  }

  const ChangeLimitValveMin = (e) => {
    var value = e.target.value
    var FailureMode_ = FailureMode
    FailureMode_.limit_valve_min = value
    setFailureMode(Object.assign({}, FailureMode_))
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.failure_mode = FailureMode_
      }
    })
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial="+ Serial);
  }

  const ChangeDadbandPressure = (e) => {
    var value = e.target.value
    var FailureMode_ = FailureMode
    FailureMode_.deadband_pressure = value
    setFailureMode(Object.assign({}, FailureMode_))
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.failure_mode = FailureMode_
      }
    })
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial="+ Serial);
  }

  const ChangeDadbandFlow = (e) => {
    var value = e.target.value
    var FailureMode_ = FailureMode
    FailureMode_.deadband_flow = value
    setFailureMode(Object.assign({}, FailureMode_))
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.failure_mode = FailureMode_
      }
    })
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial="+ Serial);
  }

  const push_prv = () => {
    var PRV_config_ = PRV_config
    PRV_config_.push({
      "device_mode": "Pressure",
      "pressure": "",
      "flow": "",
      "time": "-1",
    })
    var arrflow_ = arrFlow
    arrflow_.push("")
    var arrpressure_ = arrPressure
    arrpressure_.push("")
    setarrFlow([...arrflow_])
    setarrPressure([...arrpressure_])
    setPRV_config([...PRV_config_])
    // history("/PRVConfig?serial="+ Serial);
  }

  React.useEffect(() => {
    var Serial_no = query.get("remotename")
    setSerial(Serial_no)

    // search PRVConfig
    IntervalCheckStore = setInterval(() => {
      var Device_Store = store.getState().Device
      var PRV_Store = []
      Device_Store.forEach((item, index) => {
        if (item.serial_no === Serial_no){
          PRV_Store.push(item)
        }
      })
      if (PRV_Store[0] !== undefined && PRV_Store[0] !== undefined){
        if (PRV_Store[0].prv_config.length === 0){
          setPRV_config([... [{
            "device_mode": "Disable",
            "pressure": "",
            "flow": "",
            "time": "-1",
          }]])
          var arrflow_ = []
          arrflow_.push("")
          var arrpressure_ = []
          arrpressure_.push("")
          setarrFlow([...arrflow_])
          setarrPressure([...arrpressure_])
        }else {
          setPRV_config([...PRV_Store[0].prv_config])
          var arrflow_ = []
          var arrpressure_ = []
          PRV_Store[0].prv_config.forEach((item) => {
            arrflow_.push(item.flow)
            arrpressure_.push(item.pressure)
          })
        }
        setarrFlow([...arrflow_])
        setarrPressure([...arrpressure_])
        setFailureMode(PRV_Store[0].failure_mode)
        clearInterval(IntervalCheckStore)
      }
    }, 200)

    return () => {
      clearInterval(IntervalCheckStore)
    }
  }, [])

  const ChangeFlow = (e, index) => {
    var device = store.getState().Device
    var PRV_config_ = PRV_config
    PRV_config_[index].flow = e.target.value
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.prv_config = PRV_config_
      }
    })
    setPRV_config([...PRV_config_])
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial=" + Serial);

  }
  const ChangePressure = (e, index) => {
    var device = store.getState().Device
    var PRV_config_ = PRV_config
    PRV_config_[index].pressure = e.target.value
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.prv_config = PRV_config_
      }
    })
    setPRV_config([...PRV_config_]);
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial=" + Serial);
  }

  const ChangeTime = (e, index) => {
    var PRV_config_ = PRV_config
    PRV_config_[index].time = e.target.value
    setPRV_config([...PRV_config_])
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.prv_config = PRV_config_
      }
    })
    store.dispatch(DEVICE(device))
  }

  const checkDiffTime = (ptime1, ptime2) => {

    var splitTimeIndex1 = ptime1.split(":")
    var splitTimeIndex2 = ptime2.split(":")
    var time1 = new Date()
    var time2 = new Date()

    time1.setHours(splitTimeIndex1[0])
    time1.setMinutes(splitTimeIndex1[1])
    time1.setSeconds(0)

    time2.setHours(splitTimeIndex2[0])
    time2.setMinutes(splitTimeIndex2[1])
    time2.setSeconds(0)
    
    var difSeconds = (time1.getTime() - time2.getTime()) / 1000;
    return difSeconds
  }

  const commitConfig = async () => {
    var PRV_config_ = PRV_config
    var alength = PRV_config_.length // Amount config user add or default.
    if (alength === 1) {
      savePRV()
    }else if (alength === 2){
      var returnTime = checkDiffTime(PRV_config_[0].time, PRV_config_[1].time)
      if (returnTime < 0){
        savePRV()
      }else {
        var nativeError_ = nativeError
        nativeError_[0] = true
        nativeError_[1] = true
        setnativeError(Object.assign([], nativeError_))
        alert("เลือกเวลาควบคุมอัตโนมัติผิด")
      }
    }else if (alength >= 3){
      var CheckResult = true
      PRV_config_.forEach((item ,index) => {
        if (index === 0) {
          var returnTime = checkDiffTime(item.time, PRV_config_[index+1].time)
          // time_index1 > time_index2
          if (returnTime >= 0){
            CheckResult = false
            var nativeError_ = nativeError
            nativeError_[index] = true
            setnativeError(Object.assign([], nativeError_))
          }else {
            var nativeError_ = nativeError
            nativeError_[index] = false
            setnativeError(Object.assign([], nativeError_))
          }
        }else if (index === (alength - 1)){
          // last index
          var returnTime = checkDiffTime(item.time, PRV_config_[index-1].time)
          if (returnTime <= 0){
            CheckResult = false
            var nativeError_ = nativeError
            nativeError_[index] = true
            setnativeError(Object.assign([], nativeError_))
          }else {
            var nativeError_ = nativeError
            nativeError_[index] = false
            setnativeError(Object.assign([], nativeError_))
          }
        } else {
          var returnTime1 = checkDiffTime(item.time, PRV_config_[index-1].time)
          var returnTime2 = checkDiffTime(item.time, PRV_config_[index+1].time)
          if (returnTime1 <= 0 || returnTime2 >= 0){
            CheckResult = false
            var nativeError_ = nativeError
            nativeError_[index] = true
            setnativeError(Object.assign([], nativeError_))
          } else {
            var nativeError_ = nativeError
            nativeError_[index] = false
            setnativeError(Object.assign([], nativeError_))
          }
        }
      })
      if (CheckResult){
        savePRV()
      }else {
        alert("เลือกเวลาควบคุมอัตโนมัติผิด")
      }
    }
  }

  // const savePRV = async () => {
  //   //save to store
  //   var store_prv = store.getState().Device
  //   store_prv.forEach((item) => {
  //     if (item.serial_no === Serial){
  //       item.prv_config = PRV_config
  //     }
  //   })
  //   store.dispatch(DEVICE(Object.assign([], store_prv)))
  //   //save to api
  //   const res = await updateConfig({
  //     serial_no: Serial,
  //     prv_config: PRV_config,
  //     failure_mode: FailureMode
  //   })
  //   if (res.status === 200){
  //     alert("ตั้งค่าควบคุมอัตโนมัติเรียบร้อยแล้ว")
  //     history("/PRVConfig?serial=" + Serial);
  //   }
  // }



  const savePRV = async () => {
    //save to store
    var store_prv = store.getState().Device
    var userinfo = store.getState().UserInfo[0]
    var devicelog = []
    store_prv.forEach((item) => {
      if (item.serial_no === Serial){
        item.prv_config = PRV_config
        devicelog.push(item)
      }
    })
    store.dispatch(DEVICE(Object.assign([], store_prv)))

    var connection = await mqtt_connection.onConnect()
    if (connection){
      setbtnDisabled(true)
      setmodalstate(0)
      mqtt_connection.onSubscript("logger/"+Serial+"/prv/config")

      // Message publish auto timeout 10s
      const resa = await mqtt_connection.onMessageAuto("logger/"+Serial+"/prv/config/set", JSON.stringify({
        prv_config: PRV_config,
        failure_mode: FailureMode
      }), 10)
      if (resa === false){
        // setmodalstate(1)
        // history("/PRVConfig?serial=" + Serial);
        alert(`ไม่สามารถส่งข้อมูลอัพเดทข้อมูลที่จุดติดตั้ง ${Serial} ได้`)
        window.location.reload()
      }else {
        //save to api
        console.log(resa)
        const resapi = await updateConfig({
          serial_no: Serial,
          prv_config: resa.prv_config,
          failure_mode: resa.failure_mode,

          "mode": "auto",

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
            setmodalstate(2)
            setTimeout(() => {
              setbtnDisabled(false)
            }, 2000)
          } else {
            setmodalstate(3)
            setTimeout(() => {
              setbtnDisabled(false)
            }, 2000)
          }
        }
      }
    }
  }

  const handleChangeMode = (e, index) => {
    var PRV_config_ = PRV_config
    PRV_config_[index].device_mode = e.target.value
    setPRV_config([...PRV_config_])
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.prv_config = PRV_config_
      }
    })
    store.dispatch(DEVICE(device))
  }

  const renderTable = () => {
    return PRV_config.map((row, index) => (
        <TableRow key={index}>
          
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell component="th" scope="row">
          <FormControl className={classes.formControl} error>
            <NativeSelect
                input={<FormInputStyle />}
                onClick={() => {
                  setselectRow(index)
                }}
                onChange={(e) => {
                  handleChangeMode(e, index)
                }}
                defaultValue={row.device_mode}
              >
                {
                  optional.device_mode.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    )
                  })
                }
             </NativeSelect>
          </FormControl>

          </TableCell>
          <TableCell align="right">
            <FormControl className={classes.formControl}>

              <NativeSelect
                className={((nativeError[index]) ? classes.NativeselectError: "")}
                input={<FormInputStyle />}
                onChange={(e) => {
                  ChangeTime(e, index)
                }}
                value={row.time}
                onClick={() => {
                  setselectRow(index)
                }}
              >
                <option value="-1">เลือกช่วงเวลา</option>
                {
                  optional.time.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    )
                  })
                }
             </NativeSelect>
            </FormControl>
          </TableCell>
          
          <TableCell align="left">
            <FormInputStyle
              value={row.pressure}
              type="number"
              // onClick={() => {
              //   setselectRow(index)
              // }}
              onChange={(e) => {
                ChangePressure(e, index)
              }}
              placeholder="Input Pressure"
            />
          </TableCell>
          
          {/* <TableCell align="right">
            <FormInputStyle
              value={row.flow}
              type="number"
              onChange={(e) => {
                ChangeFlow(e, index)
              }}
              // onClick={() => {
              //   setselectRow(index)
              // }}
              placeholder="Input Flow"
            />
          </TableCell> */}
        </TableRow>
      )
    )
  }

  return (
  <>
    <div className="prv-auto-config-header-new">
      ตั้งค่าควบคุมอัตโนมัติ
    </div>

    <TableContainer component={Paper} className={classes.fontinherit}>
      <StyledTalbe className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 20, fontSize: "1.2em" }} align="left">No.</TableCell>
            <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">Device Mode</TableCell>
            <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">Time</TableCell>
            <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">Pressure&nbsp;</TableCell>
            {/* <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">Flow&nbsp;</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            renderTable()
          }
        </TableBody>
      </StyledTalbe>
      <div className="prv-group-btn">
        <AddButton className={classes.spaceLeft} variant="contained" color="primary"
          onClick={() => {
            push_prv()
          }}
          disabled={PRV_config.length === 8}
        >
          เพิ่ม
        </AddButton>

        <DeleteButton className={classes.spaceLeft} variant="contained" color="primary" 
        disabled={PRV_config.length === 1}
          onClick={() => {
            pop_prv()
          }}
        >
          ลบ
        </DeleteButton>
      </div>
    </TableContainer>
    
    
    <div className="prv-failuremode-config-header-new">
      Failure Mode
    </div>

    <Grid container spacing={1} style={
      {
        paddingTop: "20px",
        paddingRight: "20px",
        paddingLeft: "5px"
      }
    }>
      <Grid item xs={2} style={{paddingTop: "14px"}}>
        Mode:
      </Grid>
      <Grid item xs={3}>
        <FormInputStyle
          type="text"
          value={((FailureMode.mode !== undefined) ? FailureMode.mode: "")}
          disabled={true}
        />
      </Grid>

      <Grid item xs={1}></Grid>

      <Grid item xs={2} style={{paddingTop: "14px"}}>
        Step Valve (%):
      </Grid>
      <Grid item xs={3}>
        <FormInputStyle
        type="number"
          value={((FailureMode.step_valve !== undefined) ? FailureMode.step_valve: "")}
          onChange={ChangeStepValve}
        />
      </Grid>
    </Grid>  

    <Grid container spacing={1} style={
      {
        paddingTop: "20px",
        paddingRight: "20px",
        paddingLeft: "5px"
      }
    }>
      <Grid item xs={2} style={{paddingTop: "14px"}}>
        Time Loop Min:
      </Grid>
      <Grid item xs={3}>
        <FormInputStyle
        type="number"
          value={((FailureMode.time_loog_min !== undefined) ? FailureMode.time_loog_min: "")}
          onChange={ChangeTime_Loop_min}
        />
      </Grid>

      <Grid item xs={1}></Grid>

      <Grid item xs={2} style={{paddingTop: "14px"}}>
        Limit Valve Min (%):
      </Grid>
      <Grid item xs={3}>
        <FormInputStyle
        type="number"
          value={((FailureMode.limit_valve_min !== undefined) ? FailureMode.limit_valve_min: "")}
          onChange={ChangeLimitValveMin}
        />
      </Grid>
    </Grid>  

    <Grid container spacing={1} style={
      {
        paddingTop: "20px",
        paddingRight: "20px",
        paddingLeft: "5px"
      }
    }>
      <Grid item xs={2} style={{paddingTop: "14px"}}>
      Deadband Pressure:
      </Grid>
      <Grid item xs={3}>
        <FormInputStyle
        type="number"
          value={((FailureMode.deadband_pressure !== undefined) ? FailureMode.deadband_pressure: "")}
          onChange={ChangeDadbandPressure}
        />
      </Grid>

      <Grid item xs={1}></Grid>

      <Grid item xs={2} style={{paddingTop: "0px"}}>
      Deadband Flow (m3/hr):
      </Grid>
      <Grid item xs={3}>
        <FormInputStyle
        type="number"
          value={((FailureMode.deadband_flow !== undefined) ? FailureMode.deadband_flow: "")}
          onChange={ChangeDadbandFlow}
        />
      </Grid>
    </Grid>

    <div className="prv-button-save">
      <ConfirmButton className={classes.spaceLeft} variant="contained" color="primary" disabled={btnDisabled}
        onClick={() => {
          commitConfig()
        }}
      >
        บันทึก
      </ConfirmButton>
      <DialogAuto open={btnDisabled} state={modalstate} />
    </div>
  </>
  )
}

export default PRVConfig