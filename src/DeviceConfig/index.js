import React from "react"
import { useLocation, useNavigate} from "react-router-dom";

import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box,
  Button,
  CircularProgress,
  IconButton
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

import "./index.css"

import PropTypes from 'prop-types';

import CancelIcon from '@material-ui/icons/Cancel';

import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import SettingsIcon from '@material-ui/icons/Settings';
import TuneIcon from '@material-ui/icons/Tune';
import WavesIcon from '@material-ui/icons/Waves';
import Dialog from '@material-ui/core/Dialog'
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'; 

// icon
import LoopIcon from '@material-ui/icons/Loop';
import CloudIcon from '@material-ui/icons/Cloud';
import ErrorIcon from '@material-ui/icons/Error';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';

import Device from './device'
import DigitalIn from './digitalin'
import Analog from './analog'
import RS485 from './rs485'

import { updateConfig, getConfig } from './../apis/PWA_Config'

import MQTT from 'paho-mqtt'

import PWAMqtt from "../module/mqtt.js"

import { MODBUS, CONFIG } from './../stores/actions'

var mqtt_connection = new PWAMqtt(MQTT, 'dwdev.info', 8083)

var TimeoutSearchDevice

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-TabPanelContrainer-${index}`,
  };
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

const StyledListItemIcon = withStyles(() => ({
  root: {
    minWidth: "32px"
  },
}))(ListItemIcon)

const StyledMenuItem = withStyles((theme) => ({
  root: {
    // '&:focus': {
    //   backgroundColor: theme.palette.primary.main,
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.white,
    //   },
    // },
  },
}))(MenuItem);

const ReadNewConfigButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#4267ec"),
    backgroundColor: "#023e8a",
    color: "#fff",
    marginRight: "20px",
    '&:hover': {
      backgroundColor: "#023e8a",
      color: "#fff"
    },
  },
}))(Button);

const DefaultConfigButton = withStyles((theme) => ({
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

const SaveConfigButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#4267ec"),
    backgroundColor: "#023e8a",
    color: "#fff",
    padding: "8px 16px",
    // width: "100px",
    '&:hover': {
      backgroundColor: "#023e8a",
      color: "#fff"
    },
  },
}))(Button);


const CloseConfigButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#4267ec"),
    backgroundColor: "#f44336",
    color: "#000",
    padding: "5px",
    marginRight: "10px",
    width: "100px",
    '&:hover': {
      backgroundColor: "#f44336",
      color: "#000"
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  rootTab: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: "#f6f6f6",
    marginTop: '0px',
  },
}))

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function DeviceConfig (props) {
  const classes = useStyles()
  let query = useQuery()
  let history = useNavigate()
  const [store] = React.useState(props.store)
  const [Serial, setSerial] = React.useState("")
  const [Token, setToken] = React.useState("")
  const [AppBarValuue, setAppBarValue] = React.useState(0)
  const [DialogOpen, setDialogOpen] = React.useState(true)
  const [DialogOpenMQTTResult, setDialogOpenMQTTResult] = React.useState(false)
  const [Modbus, setModbus] = React.useState([])
  const [Config, setConfig] = React.useState([])
  const [isSearch, setisSearch] = React.useState(true)
  const [DialogOpenMQTTNotFoundToken, setDialogOpenMQTTNotFoundToken] = React.useState(false)
  const [Source, setSource] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpenMQTTNotFoundToken = () => {
    setDialogOpenMQTTNotFoundToken(false)
  }
  const handleDialogCloseMQTTResult = () => {
    setDialogOpenMQTTResult(false)
  }

  React.useEffect(() => {

    // window.onpopstate = (e) => {
    //   // mqtt_connection.onDisconnect()
    //   history("/Home")
    // }


    var Serial_no = query.get("remotename")
    setSerial(Serial_no)
    // var token = query.get("token")
    // console.log(token)
    // setToken(token)
    // if (token === null){
    //   setDialogOpenMQTTNotFoundToken(true)
    // }
    async function fetchMyAPI() {
      var isConnect = await mqtt_connection.onConnect()

      console.log("Connect Mqtt Status : " + isConnect)

      mqtt_connection.onSubscript("logger/"+Serial_no+"/device/config")
      mqtt_connection.onSubscript("logger/"+Serial_no+"/modbus/config")
    
      mqtt_connection.onMessage((mes) => {
        var msg = JSON.parse(mes.payloadString)
        if (msg.dev !== undefined){
          setConfig(msg)
          store.dispatch(CONFIG(msg))
  
          clearTimeout(TimeoutSearchDevice)
          setDialogOpen(false)
          
        }
        if (msg.mbd !== undefined){
          setModbus(msg)
          store.dispatch(MODBUS(msg))
  
          clearTimeout(TimeoutSearchDevice)
          setDialogOpen(false)
  
        }
      })

      mqtt_connection.onPublic("logger/"+ Serial_no +"/device/config/get", "get config")
      mqtt_connection.onPublic("logger/"+ Serial_no +"/modbus/config/get", "get config")

      window.onhashchange = function() {
        if (window.innerDocClick) {
            // Your own in-page mechanism triggered the hash change
            console.log("page mechanism triggered the hash change")
        } else {
            // mqtt_connection.onDisconnect()
            console.log("go to Home")
            history("/Home")
        }
      }

    }

    fetchMyAPI()

    TimeoutSearchDevice = setTimeout(async () => {
      setDialogOpen(true)
      setisSearch(false)
      const res = await getConfig({serial_no: Serial_no})
      console.log("========== Config from Server ==========")
      var config = res.data[0].device_config[0]
      var modbus = res.data[0].modbus_config[0]
      store.dispatch(CONFIG(config))
      store.dispatch(MODBUS(modbus))
      setSource(false)
    }, 10000);

    return () => {
      console.log('componenctunmount')
      mqtt_connection.onDisconnect()
      // history("/Home")
    }
  }, [])

  const handleDefaultConfig = async () => {
    const res = await getConfig({serial_no: Serial})
    var config = res.data[0].device_config[0]
    var modbus = res.data[0].modbus_config[0]
    store.dispatch(CONFIG(config))
    store.dispatch(MODBUS(modbus))
    setConfig(Object.assign([], [config]))
    setModbus(Object.assign([], [modbus]))
    setSource(false)
  }

  const handleReactConfig = () => {
    mqtt_connection.onPublic("logger/"+ Serial +"/device/config/get", "get config")
    mqtt_connection.onPublic("logger/"+ Serial +"/modbus/config/get", "get config")
    setSource(true)
  }

  const handleAppbarChange = (event, newValue) => {
    setAppBarValue(newValue);
  };

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleDialogPrve = () => {
    setDialogOpen(false)
    // mqtt_connection.onDisconnect()
    history("/Home")
  }

  const handleSaveConfig = () => {
    if (isSearch){
      saveMqtt()
      saveServer()
    }else {
      saveServer()
    }
  }

  const saveMqtt = () => {
    var config = store.getState().Config
    var modbus = store.getState().Modbus

    mqtt_connection.onPublic("logger/"+ Serial +"/device/config/set", JSON.stringify(config))
    mqtt_connection.onPublic("logger/"+ Serial +"/modbus/config/set", JSON.stringify(modbus))
    setDialogOpenMQTTResult(true)
  }

  const saveServer = async () => {
    var config = store.getState().Config
    var modbus = store.getState().Modbus
    const res = await updateConfig({
      "serial_no": Serial,
      "device_config": [config],
      "modbus_config": [modbus]
    })
    if (res.status === 200){
      // alert("บันทึกสำเร็จ")
    }
  }

  const handleDialogCloseMQTTResultClose = () => {
    setDialogOpenMQTTResult(false)
  }

  const handlegotologin = () => {
    setDialogOpenMQTTResult(false)
    mqtt_connection.onDisconnect()
    history('/login')
  }

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

  return (
    <div className="config-device">

      <div className="config-container config-shadow">
        <div className="config-card-header">
          <div>
            <IconButton aria-label="delete" color="primary" className={classes.margin} onClick={handleDialogPrve}>
              <KeyboardBackspaceIcon fontSize="default" />
            </IconButton>
          </div>
          <div className="config-card-title">
            <div>ตั้งค่าอุปกรณ์ : {Serial}</div> 
            <div className="config-card-title-status">
              {
                ((Source) ? <div className="status-flex"><div className="status-logger"></div><span style={{color: "#0bb327", fontWeight: "400"}}>ข้อมูล Config จาก Logger</span></div>: <div className="status-flex"><div className="status-server"></div><span style={{color: "#0a5cc4", fontWeight: "400"}}>ข้อมูล Config ล่าสุดจาก Server</span></div>)
              }
            </div>
          </div>
          
          <div className="config-card-icon">

            <SaveConfigButton onClick={handleSaveConfig} style={{display: "flex", alignItems: "center", marginRight: "10px",}}><SaveIcon style={{marginRight: "10px"}}/> บันทึก </SaveConfigButton>

            <SaveConfigButton onClick={handleClick} style={{display: "flex", alignItems: "center", minWidth: "40px", padding: 0}}><MoreVertIcon fontSize="default"/></SaveConfigButton>

            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {
                ((isSearch) ? <StyledMenuItem onClick={handleReactConfig}>
                <StyledListItemIcon>
                  <LoopIcon fontSize="small" />
                </StyledListItemIcon>
                <ListItemText primary="อ่าน Config ล่าสุดจาก Logger" />
              </StyledMenuItem>: null)
              }

              <StyledMenuItem onClick={handleDefaultConfig}>
                <StyledListItemIcon>
                  <CloudIcon fontSize="small" />
                </StyledListItemIcon>
                <ListItemText primary="อ่าน Config ล่าสุดจาก Server" />
              </StyledMenuItem>
            </StyledMenu>
            
          </div>

        </div>

        {/* dialog search */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={DialogOpen}
          onClose={handleDialogClose}
          maxWidth={'lg'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="dialog-container">
            <div className="dialog-title">การค้นหา</div>
            <div className="dialog-from" >
              <div>              
                <div className="dialog-icon-notfound">
                  {
                    ((isSearch) ? <CircularProgress /> : <CancelIcon style={
                      {
                        fontSize: "3em",
                        color: "#ff005c"
                      }
                    }/>)
                  }
                </div>

                  {
                    ((isSearch) ? <span className="dialog-notfound-logger">กำลังค้นหาสมาร์ทล๊อกเกอร์ : <span className="dialog-notfound-serial">{Serial}</span></span> : <div className="dialog-notfound-logger">ไม่สามารถเชื่อมต่ออุปกรณ์ : <span className="dialog-notfound-serial">{Serial}</span><br></br><div style={
                      {
                        fontSize: "0.7em",
                        fontWeight: 300,
                        textAlign: "center",
                        marginTop: "6px",
                        color: "crimson",
                      }
                    }>* โปรดทราบข้อมูลที่จะแสดง เป็นข้อมูลที่ถูกบันทึกครั้งล่าสุด</div></div>)
                  }

              </div>
            </div>
          </div>
          <div className="dialog-btn-group">

          {
            ((isSearch) ? <Button variant="outlined" color="primary" onClick={handleDialogPrve}>
            ย้อนกลับ
          </Button>: <Button variant="outlined" color="primary" onClick={handleDialogClose}>
            ตกลง
          </Button>)
          }

          </div>
        </Dialog>

        {/* dialog save config */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={DialogOpenMQTTResult}
          onClose={handleDialogCloseMQTTResult}
          maxWidth={'lg'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="dialog-container">
            <div className="dialog-title">การบันทึกข้อมูล</div>
            <div className="dialog-from" >
              <div >             
                <div className="dialog-icon-notfound">
                  {
                    <CheckCircleIcon style={
                      {
                        fontSize: "3em",
                        color: "#042f99"
                      }
                    }/>
                  }
                </div>
                {
                  ((isSearch) ? <span className="dialog-notfound-logger">บันทึกคอนฟิกล๊อกเกอร์  : <span className="dialog-notfound-serial">{"สำเร็จ"}</span></span> : <span className="dialog-notfound-logger">ไม่สามารถบันทึกคอนฟิกล๊อกเกอร์ : <span className="dialog-notfound-serial">{Serial}</span></span>)
                }
              </div>
            </div>
          </div>
          <div className="dialog-btn-group">
          <Button variant="outlined" color="primary" onClick={handleDialogCloseMQTTResultClose}>
            ยืนยัน
          </Button>
          </div>
        </Dialog>

        {/* dialog not found token */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={DialogOpenMQTTNotFoundToken}
          onClose={handleDialogOpenMQTTNotFoundToken}
          maxWidth={'lg'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="dialog-container">
            <div className="dialog-title">กรุณาล๊อกอิน</div>
            <div className="dialog-from" >
              <div>             
                <div className="dialog-icon-notfound">
                  {
                    <ErrorIcon style={
                      {
                        fontSize: "3em",
                        color: "#ff9800"
                      }
                    }/>
                  }
                </div>
                {
                  ((isSearch) ? <span className="dialog-notfound-logger"> กรุณาล๊อกอินก่อนใช้งาน </span> : "")
                }
              </div>
            </div>
          </div>
          <div className="dialog-btn-group">
          <Button variant="outlined" color="primary" onClick={handlegotologin}>
            Login
          </Button>
          </div>
        </Dialog>

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
            <Tab label="Device" icon={<SettingsIcon />} {...a11yProps(0)} disabled ={false} style ={{fontSize: "14px"}}/>
            <Tab label="Digital In" icon={<SettingsInputCompositeIcon />} {...a11yProps(1)} disabled ={false} style ={{fontSize: "14px"}}/>
            <Tab label="Analog In" icon={<WavesIcon />} {...a11yProps(3)} disabled ={false} style ={{fontSize: "14px"}}/>
            <Tab label="RS485" icon={<TuneIcon />} {...a11yProps(4)} disabled ={false} style ={{fontSize: "14px"}}/>
          </Tabs>
        </AppBar>
        <TabPanelContrainer value={AppBarValuue} index={0}>
          <Device store={store} Serial={Serial}></Device>
        </TabPanelContrainer>

        <TabPanelContrainer value={AppBarValuue} index={1}>
          <DigitalIn store={store}></DigitalIn>
        </TabPanelContrainer>


        <TabPanelContrainer value={AppBarValuue} index={2}>
          <Analog store={store}></Analog>
        </TabPanelContrainer>


        <TabPanelContrainer value={AppBarValuue} index={3}>
          <RS485 store={store}></RS485>
        </TabPanelContrainer>

        {/* <div style={
          {
            display: "flex",
            justifyContent: "flex-end"
          }
        }>
          <CloseConfigButton onClick={handleDialogPrve}>ออก</CloseConfigButton>
          <SaveConfigButton onClick={handleSaveConfig}>บันทึก</SaveConfigButton>
        </div> */}

      </div>
    </div>
  )
}

export default DeviceConfig