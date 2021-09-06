import React from "react"

import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch'

import "./analog.css"

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

function Analog (props) {
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
    }, 300)
    return () => {
      clearInterval(intervalTime)
    }
  }, [])

  // config "min"
  const handleMin_1_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mn1 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mn1 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMin_2_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mn2 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mn2 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMin_3_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mn3 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mn3 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMin_4_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mn4 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mn4 = value
    store.dispatch(CONFIG(Config_))
  }

  // config "max"
  const handleMax_1_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mx1 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mx1 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMax_2_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mx2 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mx2 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMax_3_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mx3 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mx3 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMax_4_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mx4 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mx4 = value
    store.dispatch(CONFIG(Config_))
  }

  // Config "map min"
  const handleMap_Min_1_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mmn1 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mmn1 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMap_Min_2_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mmn2 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mmn2 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMap_Min_3_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mmn3 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mmn3 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMap_Min_4_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.mmn4 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.mmn4 = value
    store.dispatch(CONFIG(Config_))
  }

  // Config "map max"
  const handleMap_Max_1_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pc1 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pc1 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMap_Max_2_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pc2 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pc2 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMap_Max_3_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pc3 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pc3 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleMap_Max_4_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pc4 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pc4 = value
    store.dispatch(CONFIG(Config_))
  }

  // Config "Factor"
  const handleFactor_1_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pt1 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pt1 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleFactor_2_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pt2 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pt2 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleFactor_3_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pt3 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pt3 = value
    store.dispatch(CONFIG(Config_))
  }
  const handleFactor_4_Change = (e) => {
    var value = Number(e.target.value)
    var Config_ = () => {
    let Config_ = Object.assign({}, Config);
      Config_.pt4 = value;
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.pt4 = value
    store.dispatch(CONFIG(Config_))
  }

  // Config Checkbox
  const handleEnable_1_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.aen & 1){
        Config_.aen = Config_.aen - 1
      }else {
        Config_.aen = Config_.aen + 1
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.aen & 1){
      Config_.aen = Config_.aen - 1
    }else {
      Config_.aen = Config_.aen + 1
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_2_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.aen & 2){
        Config_.aen = Config_.aen - 2;
      }else {
        Config_.aen = Config_.aen + 2;
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.aen & 2){
      Config_.aen = Config_.aen - 2;
    }else {
      Config_.aen = Config_.aen + 2;
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_3_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.aen & 4){
        Config_.aen = Config_.aen - 4;
      }else {
        Config_.aen = Config_.aen + 4;
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.aen & 4){
      Config_.aen = Config_.aen - 4;
    }else {
      Config_.aen = Config_.aen + 4;
    }
    store.dispatch(CONFIG(Config_))
  }
  const handleEnable_4_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      if (Config_.aen & 8){
        Config_.aen = Config_.aen - 8;
      }else {
        Config_.aen = Config_.aen + 8;
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    if (Config_.aen & 8){
      Config_.aen = Config_.aen - 8;
    }else {
      Config_.aen = Config_.aen + 8;
    }
    store.dispatch(CONFIG(Config_))
  }

  // Config "Switch Mode"
  const handleMode_1_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      Config_.am1 = ((!Config_.am1) ? 1: 0)
      if (Config_.am1){
        Config.mn1 = 4
        Config.mx1 = 20
      }else {
        Config.mn1 = 0
        Config.mx1 = 10
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.am1 = ((!Config_.am1) ? 1: 0)
    store.dispatch(CONFIG(Config_))
  }
  const handleMode_2_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      Config_.am2 = ((!Config_.am2) ? 1: 0)
      if (Config_.am2){
        Config.mn2 = 4
        Config.mx2 = 20
      }else {
        Config.mn2 = 0
        Config.mx2 = 10
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.am2 = ((!Config_.am2) ? 1: 0)
    store.dispatch(CONFIG(Config_))
  }
  const handleMode_3_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      Config_.am3 = ((!Config_.am3) ? 1: 0)
      if (Config_.am3){
        Config.mn3 = 4
        Config.mx3 = 20
      }else {
        Config.mn3 = 0
        Config.mx3 = 10
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.am3 = ((!Config_.am3) ? 1: 0)
    store.dispatch(CONFIG(Config_))
  }
  const handleMode_4_Change = (e) => {
    var Config_ = () => {
      let Config_ = Object.assign({}, Config);
      Config_.am4 = ((!Config_.am4) ? 1: 0)
      if (Config_.am4){
        Config.mn4 = 4
        Config.mx4 = 20
      }else {
        Config.mn4 = 0
        Config.mx4 = 10
      }
      return Config_;
    }
    setConfig(Config_)
    var Config_ = Config
    Config_.am4 = ((!Config_.am4) ? 1: 0)
    store.dispatch(CONFIG(Config_))
  }

  return (
    <div>

      <Grid container spacing={1} style={
        {
          paddingTop: "20px",
          paddingRight: "0px",
          paddingLeft: "5px"
        }
      }>
        <Grid item xs={6} style={
          {
            display: "flex",
            justifyContent: "flex-start"
          } 
        }>
          <fieldset className="analog-fieldset">
            <legend className="analog-legend">Ain 1 Pressure 1(P_IN)</legend>
            <Grid container spacing={1} style={
              {
                paddingTop: "20px",
                paddingRight: "0px",
                paddingLeft: "5px"
              }
            }>
              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <Grid item xs={12} style={
                  {
                    display: "flex",
                    justifyContent: "flex-start"
                  } 
                }>
                  <div className="analog-flex">
                    <Checkbox
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      checked={((Config.aen !== undefined) ? ((Config.aen & 1) ? true: false): "")}
                      onChange={handleEnable_1_Change}
                    />
                    <span className="digitalin-label-checkbox">Enable</span>
                  </div>
                </Grid>
                <Grid item xs={12} style={
                  {
                    display: "flex",
                    justifyContent: "flex-end"
                  } 
                }>
                  <div className="analog-flex">
                    <span className="digitalin-label-checkbox">0-10V</span>
                    <Switch
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      checked={((Config.am1 !== undefined) ? (Config.am1 === 1): "")}
                      onChange={handleMode_1_Change}
                    />
                    <span className="digitalin-label-checkbox">4-20mA</span>
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">min:</div>
                  <InputBox 
                    type="number"
                    value={Config.mn1}
                    onChange={handleMin_1_Change}
                  />    
                </div>  
              </Grid>

              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">max:</div>
                  <InputBox 
                    type="number"
                    value={Config.mx1}
                    onChange={handleMax_1_Change}
                  />    
                </div>  
              </Grid>


              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">map min:</div>
                  <InputBox 
                    type="number"
                    value={Config.mmn1}
                    onChange={handleMap_Min_1_Change}
                  />    
                  <div className="device-lable-unit">bar</div>
                </div>  
              </Grid>


              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">map max:</div>
                  <InputBox 
                    type="number"
                    value={Config.pc1}
                    onChange={handleMap_Max_1_Change}
                  />    
                  <div className="device-lable-unit">bar</div>
                </div>  
              </Grid>



              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">Factor:</div>
                  <InputBox 
                    type="number"
                    value={Config.pt1}
                    onChange={handleFactor_1_Change}
                  />    
                </div>  
              </Grid>



            </Grid>
          </fieldset>
        </Grid>
        <Grid item xs={6} style={
        {
          display: "flex",
          justifyContent: "flex-start"
        } 
      }>
        <fieldset className="analog-fieldset">
          <legend className="analog-legend">Ain 2 Pressure 1(P_OUT)</legend>
          <Grid container spacing={1} style={
            {
              paddingTop: "20px",
              paddingRight: "0px",
              paddingLeft: "5px"
            }
          }>
            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    checked={((Config.aen !== undefined) ? ((Config.aen & 2) ? true: false): "")}
                    onChange={handleEnable_2_Change}
                  />
                  <span className="digitalin-label-checkbox">Enable</span>
                </div>
              </Grid>
              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-end"
                } 
              }>
                <div className="analog-flex">
                  <span className="digitalin-label-checkbox">0-10V</span>
                  <Switch
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    checked={((Config.am2 !== undefined) ? (Config.am2 === 1): "")}
                    onChange={handleMode_2_Change}
                  />
                  <span className="digitalin-label-checkbox">4-20mA</span>
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">min:</div>
                <InputBox 
                    type="number"
                    value={Config.mn2}
                    onChange={handleMin_2_Change}
                  />    
              </div>  
            </Grid>

            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">max:</div>
                <InputBox 
                    type="number"
                    value={Config.mx2}
                    onChange={handleMax_2_Change}
                  />    
              </div>  
            </Grid>

            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">map min:</div>
                <InputBox 
                    type="number"
                    value={Config.mmn2}
                    onChange={handleMap_Min_2_Change}
                  />    
                <div className="device-lable-unit">bar</div>
              </div>  
            </Grid>


            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">map max:</div>
                <InputBox 
                    type="number"
                    value={Config.pc2}
                    onChange={handleMap_Max_2_Change}
                  />    
                <div className="device-lable-unit">bar</div>
              </div>  
            </Grid>



            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">Factor:</div>
                <InputBox 
                    type="number"
                    value={Config.pt2}
                    onChange={handleFactor_2_Change}
                  />    
              </div>  
            </Grid>



          </Grid>
        </fieldset>
      </Grid>
      </Grid>

      <Grid container spacing={1} style={
        {
          paddingTop: "20px",
          paddingRight: "0px",
          paddingLeft: "5px"
        }
      }>
        <Grid item xs={6} style={
          {
            display: "flex",
            justifyContent: "flex-start"
          } 
        }>
          <fieldset className="analog-fieldset">
            <legend className="analog-legend">Ain 3 Pressure</legend>
            <Grid container spacing={1} style={
              {
                paddingTop: "20px",
                paddingRight: "0px",
                paddingLeft: "5px"
              }
            }>
              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <Grid item xs={12} style={
                  {
                    display: "flex",
                    justifyContent: "flex-start"
                  } 
                }>
                  <div className="analog-flex">
                    <Checkbox
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      checked={((Config.aen !== undefined) ? ((Config.aen & 4) ? true: false): "")}
                      onChange={handleEnable_3_Change}
                    />
                    <span className="digitalin-label-checkbox">Enable</span>
                  </div>
                </Grid>
                <Grid item xs={12} style={
                  {
                    display: "flex",
                    justifyContent: "flex-end"
                  } 
                }>
                  <div className="analog-flex">
                    <span className="digitalin-label-checkbox">0-10V</span>
                    <Switch
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      checked={((Config.am3 !== undefined) ? (Config.am3 === 1): "")}
                      onChange={handleMode_3_Change}
                    />
                    <span className="digitalin-label-checkbox">4-20mA</span>
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">min:</div>
                  <InputBox 
                    type="number"
                    value={Config.mn3}
                    onChange={handleMin_3_Change}
                  />    
                </div>  
              </Grid>

              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">max:</div>
                  <InputBox 
                    type="number"
                    value={Config.mx3}
                    onChange={handleMax_3_Change}
                  />    
                </div>  
              </Grid>

              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">map min:</div>
                  <InputBox 
                    type="number"
                    value={Config.mmn3}
                    onChange={handleMap_Min_3_Change}
                  />    
                  <div className="device-lable-unit">bar</div>
                </div>  
              </Grid>


              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">map max:</div>
                  <InputBox 
                    type="number"
                    value={Config.pc3}
                    onChange={handleMap_Max_3_Change}
                  />    
                  <div className="device-lable-unit">bar</div>
                </div>  
              </Grid>



              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <div className="analog-label-input">Factor:</div>
                  <InputBox 
                    type="number"
                    value={Config.pt3}
                    onChange={handleFactor_3_Change}
                  />    
                </div>  
              </Grid>



            </Grid>
          </fieldset>
        </Grid>
        <Grid item xs={6} style={
        {
          display: "flex",
          justifyContent: "flex-start"
        } 
      }>
        <fieldset className="analog-fieldset">
          <legend className="analog-legend">Ain 4 Pressure</legend>
          <Grid container spacing={1} style={
            {
              paddingTop: "20px",
              paddingRight: "0px",
              paddingLeft: "5px"
            }
          }>
            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-start"
                } 
              }>
                <div className="analog-flex">
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    checked={((Config.aen !== undefined) ? ((Config.aen & 8) ? true: false): "")}
                    onChange={handleEnable_4_Change}
                  />
                  <span className="digitalin-label-checkbox">Enable</span>
                </div>
              </Grid>
              <Grid item xs={12} style={
                {
                  display: "flex",
                  justifyContent: "flex-end"
                } 
              }>
                <div className="analog-flex">
                  <span className="digitalin-label-checkbox">0-10V</span>
                  <Switch
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    checked={((Config.am4 !== undefined) ? (Config.am4 === 1): "")}
                    onChange={handleMode_4_Change}
                  />
                  <span className="digitalin-label-checkbox">4-20mA</span>
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">min:</div>
                <InputBox 
                    type="number"
                    value={Config.mn4}
                    onChange={handleMin_4_Change}
                  />    
              </div>  
            </Grid>

            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">max:</div>
                <InputBox 
                    type="number"
                    value={Config.mx4}
                    onChange={handleMax_4_Change}
                  />    
              </div>  
            </Grid>

            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">map min:</div>
                <InputBox 
                    type="number"
                    value={Config.mmn4}
                    onChange={handleMap_Min_4_Change}
                  />    
                <div className="device-lable-unit">bar</div>
              </div>  
            </Grid>


            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">map max:</div>
                <InputBox 
                    type="number"
                    value={Config.pc4}
                    onChange={handleMap_Max_4_Change}
                  />    
                <div className="device-lable-unit">bar</div>
              </div>  
            </Grid>



            <Grid item xs={12} style={
              {
                display: "flex",
                justifyContent: "flex-start"
              } 
            }>
              <div className="analog-flex">
                <div className="analog-label-input">Factor:</div>
                <InputBox 
                    type="number"
                    value={Config.pt4}
                    onChange={handleFactor_4_Change}
                  />    
              </div>  
            </Grid>



          </Grid>
        </fieldset>
      </Grid>
      </Grid>

    </div>
  )
}

export default Analog