import React from "react"

import "./rs485.css"

import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase'
import { withStyles, makeStyles} from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';

import { MODBUS ,CONFIG } from "./../stores/actions"

import defaultValue from "./default.json"
import { SettingsRemoteRounded } from "@material-ui/icons";

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "54%",
  },
}));

function Rs485 (props) {
  const classes = useStyles()
  const [store] = React.useState(props.store)
  const [RS485, setRS485] = React.useState(undefined)
  const [Config, setConfig] = React.useState(defaultValue.config)
  const [Modbus, setModbus] = React.useState(defaultValue.modbus)

  React.useEffect(() => {
    fetch('RS485.json').then(res => res.json())
    .then(
      (result) => {
        var new_result = []
        result.forEach((item1) => {
          var fa1, fl1 = false
          item1.reg.forEach((item2) => {
            if (item2.tag === "fa1"){
              fa1 = true
            }
            if (item2.tag === "fl1"){
              fl1 = true
            }
          })
          if (fa1 && fl1){
            new_result.push(item1)
          }
        })
        setRS485(new_result)
      },
      (err) => {
        console.log(err)
      }
    )
    intervalTime = setInterval(() => {
      if (store.getState().Config.dev !== undefined && store.getState().Modbus.mbd !== undefined){
        setConfig(store.getState().Config)
        var modbus = store.getState().Modbus
        modbus.mrs = modbus.mrs.sort((a, b) => (a.tag > b.tag) ? 1 : -1)
        setModbus(modbus)
      }
    }, 200)
    return () => {
      clearInterval(intervalTime)
    }
  }, [])

  const handleBaudrateChange = (e) => {
    var value = Number(e.target.value)
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mbd = value;
      return Modbus_;
    }
    setConfig(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mbd = value
    store.dispatch(MODBUS(Modbus_))
  }


  const handleDataBitChange = (e) => {
    var value = Number(e.target.value)
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mbt = value;
      return Modbus_;
    }
    setConfig(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mbt = value
    store.dispatch(MODBUS(Modbus_))
  }

  const handleParityChange = (e) => {
    var value = Number(e.target.value)
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mpr = value;
      return Modbus_;
    }
    setConfig(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mpr = value
    store.dispatch(MODBUS(Modbus_))
  }

  const handleStopBitChange = (e) => {
    var value = Number(e.target.value)
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mst = value;
      return Modbus_;
    }
    setConfig(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mst = value
    store.dispatch(MODBUS(Modbus_))
  }

  const handleMeterModelChange = (e) => {
    var value = e.target.value
    var mrs = []
    var mml = []
    RS485.forEach((item) => {
      if (value === item.mn) {
        mrs.push(item.reg)
        mml.push(item)
      }
    })
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mrs = mrs[0];
      Modbus_.mml = [
        {
          mc: mml[0].mc,
          mn: mml[0].mn
        }
      ]
      return Modbus_;
    }
    setModbus(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mrs = mrs[0]
    Modbus_.mml = [
      {
        mc: mml[0].mc,
        mn: mml[0].mn
      }
    ]
    store.dispatch(MODBUS(Modbus_))
  }

  const handleMeter_id_Change = (e) => {
    var value = e.target.value
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mrs[0].mid = value
      Modbus_.mrs[1].mid = value
      return Modbus_;
    }
    setModbus(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mrs[0].mid = value
    Modbus_.mrs[1].mid = value
    store.dispatch(MODBUS(Modbus_))
  }

  const handleFlow_Total_Register_Change = (e) => {
    var value = Number(e.target.value )
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mrs.forEach((item) => {
        if (item.tag === "fl1"){
          item.mba = value
        }
      })
      return Modbus_;
    }
    setModbus(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mrs.forEach((item) => {
      if (item.tag === "fl1"){
        item.mba = value
      }
    })
    store.dispatch(MODBUS(Modbus_))
  }

  const handleFlow_Rate_Register_Change = (e) => {
    var value = Number(e.target.value )
    var Modbus_ = () => {
      let Modbus_ = Object.assign({}, Modbus);
      Modbus_.mrs.forEach((item) => {
        if (item.tag === "fa1"){
          item.mba = value
        }
      })
      return Modbus_;
    }
    setModbus(Modbus_)
    var Modbus_ = Modbus
    Modbus_.mrs.forEach((item) => {
      if (item.tag === "fa1"){
        item.mba = value
      }
    })
    store.dispatch(MODBUS(Modbus_))
  }
  
  return (
    <div>
      <fieldset className="rs485-fieldset">
        <legend className="rs485-legend">RS485 Config</legend>

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
              justifyContent: "flex-start",
              width: "100%"
            }
          }>
            <div className="rs485-label-input">Baudrate: </div>
            <FormControl variant="outlined" className={classes.formControl}>
              <NativeSelect
                  id="demo-customized-select-native"
                  input={<InputBox />}
                  value={Modbus.mbd}
                  onChange={handleBaudrateChange}
                >
                  {
                    defaultValue.baudrate.map((item, index) => {
                      return (
                        <option key={index} value={item}>{item}</option>
                      )
                    })
                  }
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="rs485-label-input">Meter Model:</div>
            <FormControl variant="outlined" className={classes.formControl}>
              <NativeSelect
                  id="demo-customized-select-native"
                  input={<InputBox />}
                  value={Modbus.mml[0].mn}
                  onChange={handleMeterModelChange}
                >
                  {
                    ((RS485) ? RS485.map((item, index) => {
                      return (
                        <option key={index} value={item.mn}>{item.mn}</option>
                      )
                    }): "")
                  }
              </NativeSelect>
            </FormControl>
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
            <div className="rs485-label-input">Data bits:</div>
            <FormControl variant="outlined" className={classes.formControl}>
              <NativeSelect
                id="demo-customized-select-native"
                input={<InputBox />}
                value={Modbus.mbt}
                onChange={handleDataBitChange}
              >
                {
                  defaultValue.databit.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    )
                  })
                }
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="rs485-label-input">Meter ID:</div>
            <InputBox 
              value={Modbus.mrs[0].mid}
              onChange={handleMeter_id_Change}
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
            <div className="rs485-label-input">Parity:</div>
            <FormControl variant="outlined" className={classes.formControl}>
              <NativeSelect
                id="demo-customized-select-native"
                input={<InputBox />}
                value={Modbus.mpr}
                onChange={handleParityChange}
              >
                {
                  defaultValue.parity.map((item, index) => {
                    return (
                      <option key={index} value={index}>{item}</option>
                    )
                  })
                }
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="rs485-label-input">Flow Rate Register:</div>
            <InputBox 
              value={Modbus.mrs[1].mba}
              onChange={handleFlow_Total_Register_Change}
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
            <div className="rs485-label-input">Stop bits:</div>
            <FormControl variant="outlined" className={classes.formControl}>
              <NativeSelect
                id="demo-customized-select-native"
                input={<InputBox />}
                value={Modbus.mst}
                onChange={handleStopBitChange}
              >
                {
                  defaultValue.stopbit.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    )
                  })
                }
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={6} style={
            {
              display: "flex",
              justifyContent: "flex-start"
            }
          }>
            <div className="rs485-label-input">Flow Total Register:</div>
            <InputBox 
              value={Modbus.mrs[0].mba}
              onChange={handleFlow_Rate_Register_Change}
            />
          </Grid>
        </Grid>

      </fieldset>
    </div>
  )
}

export default Rs485