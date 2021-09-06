import React from "react"
import { useLocation } from "react-router-dom";
import './index.css'
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from "@material-ui/core/InputBase"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box'

import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { useNavigate } from "react-router-dom";

import Auto from './auto'
import Manual from './manual'
import Logging from './logging'

// icon
import TuneIcon from '@material-ui/icons/Tune';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import ViewListIcon from '@material-ui/icons/ViewList';
import { updateConfig } from "./../apis/PWA_Config"

let IntervalCheckStore

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-TabPanelContrainer-${index}`,
  };
}

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
    padding: "8px 16px",
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

  const [arrFlow, setarrFlow] = React.useState([])
  const [arrPressure, setarrPressure] = React.useState([])

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

  React.useEffect(() => {
    var Serial_no = query.get("remotename")
    setSerial(Serial_no)

    window.onhashchange = function() {
      if (window.innerDocClick) {
          // Your own in-page mechanism triggered the hash change
          console.log("page mechanism triggered the hash change")
      } else {
          history("/Login")
      }
    }

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
    
    return () => {
      clearInterval(IntervalCheckStore)
    }
  }, [])

  const handleSubmitValve = async () => {
    var manual = []
    var device = store.getState().Device
    device.forEach((item) => {
      if (item.serial_no === Serial){
        manual.push(item.manual)
      }
    })
    const res = await updateConfig({
      "serial_no": Serial,
      "manual": manual[0]
    })
    if (res.status === 200){
      alert("บันทึกสำเร็จ")
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
        {/* <div className="prv-manual-save">
          {
            ((AppBarValuue === 0) ? <SaveValve className={classes.saveButton} variant="contained"
            onClick={handleSubmitValve}
          >
            บันทึก
          </SaveValve>: "")
          }
        </div> */}

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
            {/* log config */}
            <Tab label="Logging" icon={<ViewListIcon />} {...a11yProps(2)} disabled ={false} style ={{fontSize: "14px"}}/>

          </Tabs>
        </AppBar>
        
        <TabPanelContrainer value={AppBarValuue} index={0}>
          <Manual store={store}  serial={Serial}/>
        </TabPanelContrainer>
        <TabPanelContrainer value={AppBarValuue} index={1}>
          <Auto store={store} serial={Serial}/>
        </TabPanelContrainer>
        <TabPanelContrainer value={AppBarValuue} index={2}>
          <Logging store={store} serial={Serial}/>
        </TabPanelContrainer>

      </div>
    </div>
  </div>
  )
}

export default PRVConfig