import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { CONFIG, MODBUS, DEVICE, DMA } from './../../stores/actions'

import { updateConfig, getConfig, getDMAUnique } from './../../apis/PWA_Config'
import { getPointInstall } from './../../apis/PWA_Api'

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
  }
}));

function EditDevice (props) {
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

  const [Serial, setSerial] = React.useState("hello")

  const [MQTTpayloadConfig, setMQTTpayloadConfig] = React.useState({})
  const [checkConfig, setcheckConfig] = React.useState(false)
  const [MQTTpayloadModbus, setMQTTpayloadModbus] = React.useState({})
  const [checkModbus, setcheckModbus] = React.useState(false)

  const [controlBtnConfirm, setcontrolBtnConfirm] = React.useState(true)
  const [controlBtnClose, setcontrolBtnClose] = React.useState(false)

  const [dmainstall, setdmainstall] = React.useState([])
  
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

  const handleComfirmSave = async () => {
    var area = selectArea
    var branch = Branch[selectBranch].ww
    try{
      var res = await updateConfig({
        serial_no: props.device,
        zone_id: area,
        wwcode: branch.toString(),
        dmacode: PointInstall[selectPointInstall].code,
        dmaname: PointInstall[selectPointInstall].name,
        dmakhet: PointInstall[selectPointInstall].khet,
      })
      console.log(res)
      if (res.status === 200){
        if (res.data.ret === "OK"){
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
          setSerial("")

          // hook update data
          var qry = store.getState().Query[0]
          console.log(qry)
          var update_store_config = await getConfig(qry)
          console.log(update_store_config.data)
          store.dispatch(DEVICE(update_store_config.data))
          const getdma = async () => {
            const res = await getDMAUnique()
            store.dispatch(DMA(res.data))
          }
          getdma()
        }
      }
    }catch (e) {
      handleClose()
      alert("อุปกรณ์ล๊อกเกอร์นี้นำไปติดตั้งแล้ว")        
    }

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
    setSerial("")

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
          <div className="dialog-title">แก้ไขจุดติดตั้งอุปกรณ์ Smart Logger</div>
          
          {
            ((showSearch) ? 
            <>

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

            </> : null)
          }


        </div>
        <div className="dialog-btn-group">
          <div className={classes.root}>
            <Button variant="outlined" color="secondary" onClick={handleClose} disabled={controlBtnClose}>
              ยกเลิก
            </Button>
            <Button variant="outlined" color="primary" onClick={handleComfirmSave} disabled={(controlBtnConfirm)}>
              บันทึก
            </Button>
          </div>
        </div>
      </Dialog>

    </div>
  )
}

export default EditDevice