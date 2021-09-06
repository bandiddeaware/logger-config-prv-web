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
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import optional from './optional.json'
import InputBase from "@material-ui/core/InputBase"
import NativeSelect from '@material-ui/core/NativeSelect';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box'

import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { useNavigate } from "react-router-dom";

import { DEVICE } from './../stores/actions'

import { updateConfig } from './../apis/PWA_Config'

// icon
import TuneIcon from '@material-ui/icons/Tune';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';

let IntervalCheckStore

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-TabPanelContrainer-${index}`,
  };
}

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

const OutButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#ff005c"),
    backgroundColor: "#f44336",
    color: "#000",
    '&:hover': {
      backgroundColor: "#f44336",
      color: "#000"
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
  const [Serial, setSerial] = React.useState("")
  const [DeviceMode, setDeviceMode] =  React.useState([])
  const [Time, setTime] =  React.useState([])
  const [Pressure, setPressure] =  React.useState("")
  const [Flow, setFlow] =  React.useState("")
  const [selectRow, setselectRow] = React.useState(0)
  const [PRV_config, setPRV_config] = React.useState([])
  const [FailureMode, setFailureMode] = React.useState([])
  const [AppBarValuue, setAppBarValue] = React.useState(0)

  const handleAppbarChange = (event, newValue) => {
    setAppBarValue(newValue);
  };

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
    // history("/PRVConfig?serial="+ Serial);
  }

  const ChangeStepValve = (e) => {
    var value = e.target.value
    var FailureMode_ = FailureMode
    FailureMode_.step_valve = value
    setFailureMode(FailureMode_)
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
    setFailureMode(FailureMode_)
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
    setFailureMode(FailureMode_)
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
    setFailureMode(FailureMode_)
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
    setFailureMode(FailureMode_)
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
    setPRV_config([...PRV_config_])
    // history("/PRVConfig?serial="+ Serial);
  }

  React.useEffect(() => {
    var Serial_no = query.get("remotename")
    setSerial(Serial_no)
    setDeviceMode(optional.device_mode)
    setTime(optional.time)
    setPressure(optional.pressure)
    setFlow(optional.flow)

    // search PRVConfig
    IntervalCheckStore = setInterval(() => {
      var Device_Store = store.getState().Device
      var PRV_Store = []
      Device_Store.forEach((item, index) => {
        if (item.serial_no === Serial_no){
          PRV_Store.push(item)
        }
      })
      console.log(Serial_no)
      if (PRV_Store[0] !== undefined && PRV_Store[0] !== undefined){
        if (PRV_Store[0].prv_config.length === 0){
          setPRV_config([... [{
            "device_mode": "Disable",
            "pressure": "",
            "flow": "",
            "time": "-1",
          }]])
        }else {
          setPRV_config([...PRV_Store[0].prv_config])
        }
        setFailureMode(PRV_Store[0].failure_mode)
        clearInterval(IntervalCheckStore)
      }
    }, 300)

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
    // store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial=" + Serial);
  }
  const ChangePressure = (e, index) => {
    var device = store.getState().Device
    var PRV_config_ = PRV_config
    PRV_config_[selectRow].pressure = e.target.value
    device.forEach((item) => {
      if (item.serial_no === Serial){
        item.prv_config = PRV_config_
      }
    })
    setPRV_config([...PRV_config_]);
    store.dispatch(DEVICE(device))
    // history("/PRVConfig?serial=" + Serial);
  }

  const selectTime = (e) => {
    var strtimeBefore = PRV_config[((selectRow === 0) ? 0: selectRow - 1)].time
    var strtime = e.target.value
    strtimeBefore = strtimeBefore.split(":")
    strtime = strtime.split(":")
    var time = new Date()
    var timeBefore = new Date()
    timeBefore.setHours(strtimeBefore[0])
    timeBefore.setMinutes(strtimeBefore[1])
    timeBefore.setSeconds(0)
    time.setHours(strtime[0])
    time.setMinutes(strtime[1])
    time.setSeconds(0)
    var seconds = (time.getTime() - timeBefore.getTime()) / 1000;
    // console.log(seconds)
    if (seconds <= 0){
      alert("คุณเลือกช่วงเวลาผิด")
    }else {
      var PRV_config_ = PRV_config
      PRV_config_[selectRow].time = e.target.value
      setPRV_config([...PRV_config_])
      var device = store.getState().Device
      device.forEach((item) => {
        if (item.serial_no === Serial){
          item.prv_config = PRV_config_
        }
      })
      store.dispatch(DEVICE(device))
      // history("/PRVConfig?serial="+ Serial);
    }
  }

  const renderTable = () => {
    return PRV_config.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell component="th" scope="row">
            <FormControl variant="outlined" className={classes.formControl}>
              <NativeSelect
                id="demo-customized-select-native"
                input={<FormInputStyle />}
                onClick={() => {
                  setselectRow(index)
                }}
                onChange={(e) => {
                  console.log(e.target.value)
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
            <FormControl variant="outlined" className={classes.formControl}>

              <NativeSelect
                id="demo-customized-select-native"
                input={<FormInputStyle />}
                onChange={selectTime}
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
          <TableCell align="right">
            <FormInputStyle
              value={row.pressure}
              // onClick={() => {
              //   setselectRow(index)
              // }}
              onChange={(e) => {
                ChangePressure(e, index)
              }}
              placeholder="Input Pressure"
            />
          </TableCell>
          <TableCell align="right">
            <FormInputStyle
              value={row.flow}
              onChange={(e) => {
                ChangeFlow(e, index)
              }}
              // onClick={() => {
              //   setselectRow(index)
              // }}
              placeholder="Input Flow"
            />
          </TableCell>
        </TableRow>
      )
    })
  }

  const commitConfig = async () => {
    const res = await updateConfig({
      serial_no: Serial,
      prv_config: PRV_config,
      failure_mode: FailureMode
    })
    if (res.status === 200){
      alert("ตั้งค่าควบคุมอัตโนมัติเรียบร้อยแล้ว")
      history("/PRVConfig?serial=" + Serial);
    }
  }

  return (
  <div className="prvconfig-device">
    <div className="prv-container prv-shadow">
      <div className="prv-card-header">
        <div>
          <IconButton aria-label="delete" color="primary"  onClick={() => {
            history("/Home")
          }}>
            <KeyboardBackspaceIcon fontSize="default" />
          </IconButton>
        </div>
        <div className="prv-card-title">
          ตั้งค่า PRV ควบคุมอุปกรณ์: {Serial}
        </div>
          
      </div>
      <div className="prv-config-device">

        <AppBar position="static" color="default">
          <Tabs
            value={AppBarValuue}
            onChange={handleAppbarChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Manual Command" icon={<TuneIcon />} {...a11yProps(0)} disabled ={false} style ={{fontSize: "14px"}}/>
            <Tab label="Automatic Command" icon={<BrightnessAutoIcon />} {...a11yProps(1)} disabled ={false} style ={{fontSize: "14px"}}/>
          </Tabs>
        </AppBar>
        <TabPanelContrainer value={AppBarValuue} index={0}>
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
                placeholder="Valve"
              />
            </Grid>
            <Grid item xs={4}>
              <SaveValve className={classes.saveButton} variant="contained">
                บันทึก
              </SaveValve>
            </Grid>
          </Grid>


        </TabPanelContrainer>
        <TabPanelContrainer value={AppBarValuue} index={1}>

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
                  <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">Flow&nbsp;</TableCell>
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
              
              />
            </Grid>

            <Grid item xs={1}></Grid>

            <Grid item xs={2} style={{paddingTop: "14px"}}>
              Limit Valve Min (%):
            </Grid>
            <Grid item xs={3}>
              <FormInputStyle
              
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
              
              />
            </Grid>

            <Grid item xs={1}></Grid>

            <Grid item xs={2} style={{paddingTop: "0px"}}>
            Deadband Flow (m3/hr):
            </Grid>
            <Grid item xs={3}>
              <FormInputStyle
              
              />
            </Grid>
          </Grid>

          {/* <Grid container spacing={1} style={
            {
              paddingTop: "20px",
              paddingRight: "20px",
              paddingLeft: "5px"
            }
          }>
            <Grid item xs={4}>
              <TextField
                label="Mode"
                style={{ margin: 8 }}
                placeholder="Mode"
                fullWidth
                margin="normal"
                variant="outlined"
                value={((FailureMode.mode !== undefined) ? FailureMode.mode: "")}
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Step Valve (%):"
                style={{ margin: 8 }}
                placeholder="Step Valve (%)"
                fullWidth
                margin="normal"
                variant="outlined"
                value={((FailureMode.step_valve !== undefined) ? FailureMode.step_valve: "")}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ChangeStepValve}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Time Loop Min (minute):"
                style={{ margin: 8 }}
                placeholder="Time Loop Min"
                fullWidth
                margin="normal"
                variant="outlined"
                value={((FailureMode.time_loog_min !== undefined) ? FailureMode.time_loog_min: "")}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ChangeTime_Loop_min}
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
            <Grid item xs={4}>
              <TextField
                label="Limit Valve Min (%):"
                style={{ margin: 8 }}
                placeholder="Limit Valve Min"
                fullWidth
                margin="normal"
                variant="outlined"
                value={((FailureMode.limit_valve_min !== undefined) ? FailureMode.limit_valve_min: "")}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ChangeLimitValveMin}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Deadband Pressure (bar):"
                style={{ margin: 8 }}
                placeholder="Deadband Pressure"
                fullWidth
                margin="normal"
                variant="outlined"
                value={((FailureMode.deadband_pressure !== undefined) ? FailureMode.deadband_pressure: "")}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ChangeDadbandPressure}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Deadband Flow (m3/hr):"
                style={{ margin: 8 }}
                placeholder="Deadband Flow"
                fullWidth
                margin="normal"
                variant="outlined"
                value={((FailureMode.deadband_flow !== undefined) ? FailureMode.deadband_flow: "")}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ChangeDadbandFlow}
              />
            </Grid>
          </Grid>
 */}

          <div className="prv-button-save">
          <ConfirmButton className={classes.spaceLeft} variant="contained" color="primary"
              onClick={() => {
                commitConfig()
              }}
            >
              บันทึก
            </ConfirmButton>
            {/* <OutButton className={classes.spaceLeftout}  variant="contained"
              onClick={() => {
                history("/Home")
              }}
            >
              ออก
            </OutButton> */}
          </div>
        </TabPanelContrainer>

      </div>
    </div>
  </div>
  )
}

export default PRVConfig
