import React from "react"

import { useNavigate } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import "./digitalin.css"

import defaultValue from './default.json';

import { MODBUS ,CONFIG } from "./../stores/actions"
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";

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

function DigitalIn (props) {
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
      }
    }, 200)
    return () => {
      clearInterval(intervalTime)
    }
  }, [])

  const handleFlowrateAverrageAmountChange = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.fam = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.fam = value
    store.dispatch(CONFIG(Config_))
  }

  const handleLiterPerPulse_1_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.lp1 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.lp1 = value
    store.dispatch(CONFIG(Config_))
  }

  const handleLiterPerPulse_2_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.lp2 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.lp2 = value
    store.dispatch(CONFIG(Config_))
  }


  const handleLiterPerPulse_3_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.lp3 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.lp3 = value
    store.dispatch(CONFIG(Config_))
  }


  const handleLiterPerPulse_4_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.lp4 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.lp4 = value
    store.dispatch(CONFIG(Config_))
  }


  const handleFlowTotal_1_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.fa1 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.fa1 = value
    store.dispatch(CONFIG(Config_))
  }

  const handleFlowTotal_2_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.fa2 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.fa2 = value
    store.dispatch(CONFIG(Config_))
  }
  
  const handleEnable_1_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.den & 1){
        Config_.den = Config_.den - 1;
      }else {
        Config_.den = Config_.den + 1;
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.den & 1){
      Config_.den = Config_.den - 1;
    }else {
      Config_.den = Config_.den + 1;
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_2_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.den & 2){
        Config_.den = Config_.den - 2;
      }else {
        Config_.den = Config_.den + 2;
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.den & 2){
      Config_.den = Config_.den - 2;
    }else {
      Config_.den = Config_.den + 2;
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_3_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.den & 4){
        Config_.den = Config_.den - 4;
      }else {
        Config_.den = Config_.den + 4;
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.den & 4){
      Config_.den = Config_.den - 4;
    }else {
      Config_.den = Config_.den + 4;
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_4_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.den & 8){
        Config_.den = Config_.den - 8
      }else {
        Config_.den = Config_.den + 8
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.den & 8){
      Config_.den = Config_.den - 8
    }else {
      Config_.den = Config_.den + 8
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_5_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.den & 16){
        Config_.den = Config_.den - 16
      }else {
        Config_.den = Config_.den + 16
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.den & 16){
      Config_.den = Config_.den - 16
    }else {
      Config_.den = Config_.den + 16
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_6_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.den & 32){
        Config_.den = Config_.den - 32
      }else {
        Config_.den = Config_.den + 32
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.den & 32){
      Config_.den = Config_.den - 32
    }else {
      Config_.den = Config_.den + 32
    }
    store.dispatch(CONFIG(Config_))
  }

  return (
    <div>
      <fieldset className="digitalin-fieldset">
        <legend className="digitalin-legend">Flowrate Average</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={12} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            } 
          }>
            <div className="digitalin-label-input">Flowrate Average Amount:</div>
            <InputBox 
              type="number"
              value={((Config.fam !== undefined) ? Config.fam: "")}
              onChange={
                handleFlowrateAverrageAmountChange
              }
            />  
          </Grid>

        </Grid>

      </fieldset>

      <fieldset className="digitalin-fieldset">
        <legend className="digitalin-legend">Din1_Flow Forward</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={2} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={((Config.den !== undefined) ? ((Config.den & 1) ? true: false): "")}
              onChange={handleEnable_1_Change}
            />
            <span className="digitalin-label-checkbox">Enable</span>
          </Grid>

          <Grid item xs={5} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="digitalin-label-input">Liter Per Pulse:</div>
            <InputBox 
              type="number"
              value={Config.lp1}
              onChange={handleLiterPerPulse_1_Change}
            />  
          </Grid>

          <Grid item xs={5} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="digitalin-label-input">Flow Total:</div>
            <InputBox 
              type="number"
              value={Config.fa1}
              onChange={handleFlowTotal_1_Change}
            />  
          </Grid>

        </Grid>

      </fieldset>

      <fieldset className="digitalin-fieldset">
        <legend className="digitalin-legend">Din2_Flow Reverse</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={2} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={((Config.den !== undefined) ? ((Config.den & 2) ? true: false): "")}
              onChange={handleEnable_2_Change}
            />
            <span className="digitalin-label-checkbox">Enable</span>
          </Grid>

          <Grid item xs={5} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="digitalin-label-input">Liter Per Pulse:</div>
            <InputBox 
              type="number"
              value={Config.lp2}
              onChange={handleLiterPerPulse_2_Change}
            />  
          </Grid>

          <Grid item xs={5} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="digitalin-label-input">Flow Total:</div>
            <InputBox 
              type="number"
              value={Config.fa2}
              onChange={handleFlowTotal_2_Change}
            />  
          </Grid>

        </Grid>

      </fieldset>

      <fieldset className="digitalin-fieldset">
        <legend className="digitalin-legend">Din3_Flow Forward2</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={2} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={((Config.den !== undefined) ? ((Config.den & 4) ? true: false): "")}
              onChange={handleEnable_3_Change}
            />
            <span className="digitalin-label-checkbox">Enable</span>
          </Grid>

          <Grid item xs={5} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="digitalin-label-input">Liter Per Pulse:</div>
            <InputBox 
              type="number"
              value={Config.lp3}
              onChange={handleLiterPerPulse_3_Change}
            />  
          </Grid>

        </Grid>

      </fieldset>

      <fieldset className="digitalin-fieldset">
        <legend className="digitalin-legend">Din4_Flow Reverse2</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={2} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={((Config.den !== undefined) ? ((Config.den & 8) ? true: false): "")}
              onChange={handleEnable_4_Change}
            />
            <span className="digitalin-label-checkbox">Enable</span>
          </Grid>

          <Grid item xs={5} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="digitalin-label-input">Liter Per Pulse:</div>
            <InputBox 
              type="number"
              value={Config.lp4}
              onChange={handleLiterPerPulse_4_Change}
            />  
          </Grid>

        </Grid>

      </fieldset>

      <fieldset className="digitalin-fieldset">
        <legend className="digitalin-legend">Din5</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={2} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={((Config.den !== undefined) ? ((Config.den & 16) ? true: false): "")}
              onChange={handleEnable_5_Change}
            />
            <span className="digitalin-label-checkbox">Enable</span>
          </Grid>

        </Grid>

      </fieldset>


      <fieldset className="digitalin-fieldset">
        <legend className="digitalin-legend">Din6</legend>

        <Grid container spacing={1} style={
          {
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "5px"
          }
        }>
          <Grid item xs={2} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={((Config.den !== undefined) ? ((Config.den & 32) ? true: false): "")}
              onChange={handleEnable_6_Change}
            />
            <span className="digitalin-label-checkbox">Enable</span>
          </Grid>

        </Grid>

      </fieldset>

    </div>
  )
}

export default DigitalIn