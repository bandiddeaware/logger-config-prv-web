import React from "react"

import { useNavigate } from "react-router-dom";

import "./device.css"

import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles';
import defaultValue from './default.json';

import { MODBUS ,CONFIG } from "./../stores/actions"

var intervalTime

const InputBox = withStyles((theme) => ({
  root: {
    'label + &': {
      // marginTop: theme.spacing(3),
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
      'Kanit',
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

function Device (props) {
  let history = useNavigate();
  const [Serial] = React.useState(props.Serial)
  const [store] = React.useState(props.store)
  const [Config, setConfig] = React.useState(defaultValue.config)
  const [Modbus, setModbus] = React.useState(defaultValue.modbus)

  React.useEffect(() => {
    intervalTime = setInterval(() => {
      if (store.getState().Config.dev !== undefined && store.getState().Modbus.mbd !== undefined){
        setConfig(store.getState().Config)
        setModbus(store.getState().Modbus)
        // clearInterval(intervalTime)
        
      }
    }, 200)
    return () => {
      console.log("unmountcomponent \"device\"")
      clearInterval(intervalTime)
    }
  }, [])
  
  const handleSamplingChange = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.sr = value;
      // console.log(Config_)
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.sr = value
    store.dispatch(CONFIG(Config_))
  }

  const handleUpdateChange = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.tr = value;
      // console.log(Config_)
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.tr = value
    store.dispatch(CONFIG(Config_))
  }

  const handleChangeVoltageChange = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.bsf = value;
      // console.log(Config_)
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.bsf = value
    store.dispatch(CONFIG(Config_))
  }

  const handleAddresChange = (e) => {
    var value = e.target.value
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.ip = value;
      // console.log(Config_)
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.ip = value
    store.dispatch(CONFIG(Config_))
  }

  const handlePortChange = (e) => {
    var value = e.target.value
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.port = value;
      // console.log(Config_)
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.port = value
    store.dispatch(CONFIG(Config_))
  }

  const handleScriptChange = (e) => {
    var value = e.target.value
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.dest = value;
      // console.log(Config_)
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.dest = value
    store.dispatch(CONFIG(Config_))
  }

  return (
    <div>

      <fieldset className="device-fieldset">
        <legend className="device-legend">Device</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input">Device Name:</div>
            <span className="device-lable-value">{Config.dev}</span>
          </Grid>

          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input">Sampling Rate:</div>
            <InputBox 
              type="number"
              value={((Config.sr !== undefined) ? Config.sr: "")}
              onChange={handleSamplingChange}
            />
            <div className="device-lable-unit sec">Sec.</div>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input upload">Upload:</div>
            <InputBox 
              type="number"
              value={Config.tr}
              onChange={handleUpdateChange}
            />
            <div className="device-lable-unit sec">Sec.</div>
          </Grid>

          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input change-voltage">เปลี่ยนโหมดแรงดัน:</div>
            <InputBox 
              type="number"
              value={Config.bsf}
              onChange={handleChangeVoltageChange}
            />
            <div className="device-lable-unit volt">V</div>
          </Grid>
        </Grid>

      </fieldset>
      
      <fieldset className="device-fieldset">
        <legend className="device-legend">Server</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input">Address:</div>
            <InputBox 
              value={Config.ip}
              onChange={handleAddresChange}
              disabled={true}
            />
          </Grid>

          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input">Port:</div>
            <InputBox 
              type="number"
              value={Config.port}
              onChange={handlePortChange}
              disabled={true}
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
          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input">Script:</div>
            <InputBox 
              value={Config.dest}
              onChange={handleScriptChange}
            />
          </Grid>


        </Grid>

      </fieldset>
      
      <fieldset className="device-fieldset">
        <legend className="device-legend">SIM</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input">APN:</div>
            <span className="device-lable-value">{Config.apn}</span>
          </Grid>

        </Grid>

      </fieldset>
      
      <fieldset className="device-fieldset">
        <legend className="device-legend">Firmware Version</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="device-label-input">Version:</div>
            <span className="device-lable-value">{Config.ver}</span>
          </Grid>

        </Grid>

      </fieldset>
    
    </div>
  )
}

export default Device