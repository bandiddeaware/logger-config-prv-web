import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import CircularProgress from '@material-ui/core/CircularProgress';

import { CONFIG, MODBUS, DEVICE, DMA } from './../../stores/actions'

import { updateConfig, getConfig, getDMAUnique } from './../../apis/PWA_Config'
import { getPointInstall } from './../../apis/PWA_Api'

import MQTT from 'paho-mqtt'
import PWAMqtt from './../../module/mqtt_v2'
import sconfig from './../../config'
var mqtt_connection = new PWAMqtt(MQTT, sconfig.mqtt_url, 8083, sconfig.mqtt_user, sconfig.mqtt_pass) 

var IntervalTime, TimeoutTime

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margin: {
    marginLeft: "30px",
  },
  spaceLeft: {
    marginLeft: "10px",
  },
  progressPadding: {
    padding: 20,
    display: 'flex',
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap"
  }
}));

function EditDevice (props) {

  const device = props.device

  const classes = useStyles();
  const [store] = React.useState(props.store)

  const [open, setOpen] = React.useState(false);
  const [showSearch, setshowSearch] = React.useState(true);
  const [showResult, setshowResult] = React.useState(false);
  const [showFrom, setshowFrom] = React.useState(false);
  const [showLoad, setshowLoad] = React.useState(false);
  const [showNotFound, setshowNotFound] = React.useState(false);

  const [Province, setProvice] = React.useState([])
  const [Area, setArea] = React.useState([])
  const [Branch, setBranch] = React.useState([])
  const [PointInstall, setPointInstall] = React.useState([])
  const [selectArea, setselectArea] = React.useState("-1")
  const [selectBranch, setselectBranch] = React.useState("-1")
  const [selectAreaName, setselectAreaName] = React.useState("")
  const [selectBranchName, setselectBranchName] = React.useState("")
  const [selectPointInstall, setselectPointInstall] = React.useState("")

  const [Serial, setSerial] = React.useState(props.device)

  const [MQTTpayloadConfig, setMQTTpayloadConfig] = React.useState({})
  const [checkConfig, setcheckConfig] = React.useState(false)
  const [MQTTpayloadModbus, setMQTTpayloadModbus] = React.useState({})
  const [checkModbus, setcheckModbus] = React.useState(false)

  const [controlBtnConfirm, setcontrolBtnConfirm] = React.useState(true)
  const [controlBtnClose, setcontrolBtnClose] = React.useState(false)

  const [dmainstall, setdmainstall] = React.useState([])
  
  const [WaitCheckMqtt, setWaitCheckMqtt] = React.useState(true)

  React.useEffect(() => {

    // clear store 
    store.dispatch(CONFIG({}))
    store.dispatch(MODBUS({}))

    const getdma = async () => {
      const res = await getDMAUnique()
      store.dispatch(DMA(res.data))
    }
    getdma()

    IntervalTime = setInterval(() => {
      var Province = store.getState().Province
      var modbus = store.getState().Modbus
      var config = store.getState().Config
      var dmainstalll = store.getState().DMA
      setdmainstall(dmainstalll)
      setArea(Province)
      setProvice(store.getState().Province)
      if (config.ver !== undefined){
        setcheckConfig(true)
      }
      if (modbus.mbd !== undefined){
        setcheckModbus(true)
      }
      if (modbus.mbd !== undefined && config.ver !== undefined){
        clearTimeout(TimeoutTime)
        setshowLoad(false)
        setshowResult(true)
        setshowFrom(true)

        // Hide btn close, confrim
        setcontrolBtnConfirm(false)
        setcontrolBtnClose(false)

        setshowNotFound(false)
        setshowLoad(false)

      }
    }, 300)

    return () => {
      clearInterval(IntervalTime)
      clearTimeout(TimeoutTime)
      setshowLoad(false)

      
      setshowResult(false)
    }
  }, [])

  const handleInputSerial = (e) => {
    setSerial(e.target.value)
  }

  const handleAreaChange = (e) => {
    var area_value =  e.target.value
    if (area_value !== "-1"){
      setBranch(Area[area_value].ww_all)
      setselectArea(Area[area_value].reg)
      setselectBranch("-1")


      setselectAreaName(Area[area_value].reg_desc)

    } else {
      setcontrolBtnConfirm(true)
      setselectBranch("-1")
    }
  }
  
  const handleBranchChange = async (e) => {
    var branch_value =  e.target.value
    if (branch_value !== "-1"){
      // var branch_id = Branch[branch_value].ww
      setselectBranchName(Branch[branch_value].ww_desc)
      setselectBranch(branch_value)

      var ww = Branch[branch_value].ww
      console.log(ww)
      const res = await getPointInstall(ww)
      setPointInstall(res.data)

      setcontrolBtnConfirm(true)
    } else {
      setcontrolBtnConfirm(true)
    }
  }
  
  const handleComfirm = () => {

    if (Serial !== ""){
  
      setshowSearch(false)  
  
      // Hide btn close, confrim
      setcontrolBtnConfirm(true)
      setcontrolBtnClose(true)
  
      setshowLoad(true)  
    } else {
      alert("กรุณากรอก Remote Name.")
    }

  }

  const checkLoggerForEdit = async () => {
    var connection = await mqtt_connection.onConnect()
    if (connection){
      mqtt_connection.onSubscript(`logger/${Serial}/device/config`)
      mqtt_connection.onSubscript(`logger/${Serial}/modbus/config`)
      var data_config = await mqtt_connection.onMessageDevice(
        `logger/${Serial}/device/config/get`, 
        "get config", 
        3
      )
      var data_modbus = await mqtt_connection.onMessageModbus(
        `logger/${Serial}/modbus/config/get`, 
        "get config", 
        3
      )
      await mqtt_connection.onDisconnect()
      return {
        isconnect: true,
        config: data_config,
        modbus: data_modbus
      }
    }else {
      return {
        isconnect: false,
        config: {},
        modbus: {}
      }
    }
  }

  const handleComfirmSave = async () => {

    setWaitCheckMqtt(false)
    var ConfigAndModbus = await checkLoggerForEdit()
    if (ConfigAndModbus.isconnect){

      if (ConfigAndModbus.config === false || ConfigAndModbus.modbus === false){
        alert("ไม่พบอุปกรณ์")
      } else {
        var area = selectArea
        var branch = Branch[selectBranch].ww
        try{
          var res = await updateConfig({
            zone_id: area,
            wwcode: branch.toString(),
            serial_no: device,
            serial_no_new: Serial,
            device_config: [ConfigAndModbus.config],
            modbus_config: [ConfigAndModbus.modbus],
            dmacode: PointInstall[selectPointInstall].code,
            dmaname: PointInstall[selectPointInstall].name,
            dmakhet: PointInstall[selectPointInstall].khet,
          })
          if (res.status === 200){
            if (res.data.result){
              // alert("บันทึกสำเร็จ")
              setOpen(false);
    
              // show hide btn
              setcontrolBtnConfirm(true)
              setcontrolBtnClose(false)
              
              setshowSearch(true)
              setshowNotFound(false)
          
              setselectArea("-1")
              setselectBranch("-1")
              setselectPointInstall("-1")
              // setSerial("")
    
              // hook update data
              var qry = store.getState().Query[0]
              var update_store_config = await getConfig(qry)
              store.dispatch(DEVICE(update_store_config.data))
              const getdma = async () => {
                const res = await getDMAUnique()
                store.dispatch(DMA(res.data))
              }
              getdma()
            } else {
              alert("ไม่สามารถแก้ไขข้อมูลได้")
            }
          }
        }catch (e) {
          handleClose()
          alert("อุปกรณ์ล๊อกเกอร์นี้นำไปติดตั้งแล้ว")        
        }
      }
    } else {
      alert("ไม่สามารถเชื่อมต่ออุปกรณ์ได้")
    }

    // reset state
    // show hide btn
    setcontrolBtnConfirm(true)
    setcontrolBtnClose(false)
    
    setshowResult(false)


    setshowSearch(true)

    
    setshowNotFound(false)

    setselectArea("-1")
    setselectBranch("-1")
    setselectPointInstall("-1")
    setBranch([])
    setPointInstall([])
    setSerial(device)

    setWaitCheckMqtt(true)

    // clear store config and modbus
    store.dispatch(CONFIG({}))
    store.dispatch(MODBUS({}))

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    // show hide btn
    setcontrolBtnConfirm(true)
    setcontrolBtnClose(false)
    
    setshowResult(false)


    setshowSearch(true)

    
    setshowNotFound(false)

    setselectArea("-1")
    setselectBranch("-1")
    setselectPointInstall("-1")
    setBranch([])
    setPointInstall([])
    setSerial(device)

    setWaitCheckMqtt(true)

    // clear store config and modbus
    store.dispatch(CONFIG({}))
    store.dispatch(MODBUS({}))

  };

  const handlePointInstall = (e) => {
    var index = e.target.value
    if (index !== -1){
      console.log(PointInstall[index])
      setselectPointInstall(index)
      setcontrolBtnConfirm(false)
    }
  }

  const CheckUnique = (dma, dmacode) => {
    var result = false
    dma.forEach((item, index) => {
      if (dmacode === item.dmacode){
        result = true
      }
    })
    return result
  }

  return (
    <div>

      <IconButton hidden={props.hidden} aria-label="delete" onClick={handleClickOpen}>
        <EditIcon style={{color: "#ff9800"}}/>
      </IconButton>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-container">
          <div className="dialog-title">แก้ไขจุดติดตั้งอุปกรณ์ Smart Logger [ {device} ]</div>
          
          {
            ((WaitCheckMqtt) ? 
            <>
              <div className="dialog-from" >
                <div className="dialog-name">Remote Name.</div> 
                <input className="dialog-form-textbox" value={Serial} type='text' onChange={handleInputSerial} placeholder="กรอก Remote Name."/>
              </div>

              <div className="dialog-from" >
                <div className="dialog-name">เขต</div> 
                <select className="dialog-select-area" onChange={handleAreaChange}>
                  <option value="-1">เลือกเขตติดตั้ง</option>
                  {
                    Area.map((item, index) => {
                      return (
                        <option value={index} key={index+"op1"}>{item.reg_desc}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="dialog-from">
                <div className="dialog-name">สาขา</div> 
                <select className="dialog-select-branch" onChange={handleBranchChange} value={selectBranch}>
                  <option value="-1">เลือกสาขาติดตั้ง</option>
                  {
                    Branch.map((item, index) => {
                      return (
                        <option value={index} key={index+"op2"}>{item.ww_desc}</option>
                      )
                    })
                  }
                </select>
              </div>


              <div className="dialog-from">
                <div className="dialog-name">จุดติดตั้ง</div> 
                <select className="dialog-select-branch" onChange={handlePointInstall} value={selectPointInstall}>
                  <option value="-1">เลือกจุดติดตั้ง</option>
                  {
                    PointInstall.map((item, index) => {
                      return <option key={index} value={index} disabled={CheckUnique(dmainstall, item.code)}>{ item.name }</option>
                    })
                  }
                </select>
              </div>

            </> : <div className={ classes.progressPadding }>
              <CircularProgress />รอซักครู่ 
            </div>)
          }


        </div>
        <div className="dialog-btn-group">
          <div className={classes.root}>
            <Button variant="outlined" color="secondary" onClick={handleClose} disabled={controlBtnClose || !WaitCheckMqtt}>
              ยกเลิก
            </Button>
            <Button variant="outlined" color="primary" onClick={handleComfirmSave} disabled={(controlBtnConfirm || !WaitCheckMqtt)}>
              บันทึก
            </Button>
          </div>
        </div>
      </Dialog>

    </div>
  )
}

export default EditDevice