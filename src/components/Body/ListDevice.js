import React from 'react'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import { useNavigate, useLocation } from "react-router-dom";

import { DEVICE, DETAIL } from './../../stores/actions'

// icon
import DeleteIcon from '@material-ui/icons/Delete';

// style
import "./ListDevice.css"

// api
import { deleteConfig } from "./../../apis/PWA_Config"

import Dialog from '@material-ui/core/Dialog'

const BtnCustom = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#023e8a",
      '&:hover': {
        backgroundColor: "#1161ca",
      },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  btnWidth: {
    width: "120px",
    height: "34px",
    // padding: "10px",
    margin: "10px 10px 10px 0px",
    fontSize: "0.9em"
  },
  iconremove: {
    color: "#ff0000",
    paddingTop: "10px"
  },
  btnconfigremove :{
    width: "100px",
    marginLeft: "10px"
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ListDevice (props) {
  let history = useNavigate();
  let query = useQuery();
  const [device, setdevice] = React.useState([])
  const [token, settoken] = React.useState("")
  const classes = useStyles()
  const [store] = React.useState(props.store)
  const [userInfo, setuserInfo] = React.useState([])
  const [Checked, setChecked] = React.useState([])
  const [opendialog, setopendialog] = React.useState(false)
  const [selectDevice, setselectDevice] = React.useState(undefined)

  var IntervalTime

  React.useEffect(() => {
    var Serial = query.get("remotename")
    settoken(store.getState().AccessToken[0])
    setdevice(props.deviceInfo)

    IntervalTime = setInterval(() => {
      setuserInfo(store.getState().UserInfo)
      settoken(store.getState().AccessToken[0])
    }, 300)

    return () => {
      clearInterval(IntervalTime)
      setuserInfo([])
      setdevice([])
    }
  }, [])

  const btnConfig = (user, area, branch) => {
    if (user.access_level_id === "1"){
      return false
    }else {
      if (user.access_level_id === "10"){
        if (user.zone_id === area){
          return false
        }else {
          return true
        }
      } else if (user.access_level_id === "15"){
        if (Number(user.zone_id) === Number(area) && Number(user.wwcode) === Number(branch)){
          return false
        }else {
          return  true
        }
      } else {
        return true
      }
    }
  }

  const gotoDeviceConfig = (device_) => {
    var pagename = "logger_config"
    // history("/redirect?pagename="+ pagename +"&userinfo="+ JSON.stringify(userInfo) + "&token="+ token +"&serial_no=" + device_)
    history("/config?remotename=" + device_)
    // http://localhost:11111/#/redirect?pagename=hello_pagename&userinfo=hello_userinfo&token=hello_token&serialno=SM03-001
  }

  const gotoPRVConfig = (serial) => {
    var pagename = "prv_config"
    // history("/redirect?pagename="+ pagename +"&userinfo="+ JSON.stringify(userInfo) + "&token="+ token +"&serial_no=" + serial)
    history("/PRVconfig?remotename=" + serial)
  }

  const handleRemove = (serial) => {
    setselectDevice(serial)
    setopendialog(true)
  }
  const handleConfirmRemoveClose = () => {
    setopendialog(false)
  }
  const handleConfirmRemove = async () => {
    var serial = selectDevice
    const res = await deleteConfig({
      "serial_no": [
        serial
      ]
    })
    if (res.data.n === 1 && res.data.ok === 1){
      setopendialog(false)

      var device_ = store.getState().Device
      var detail_ = store.getState().Detail

      var newdevice_ = device_.filter(function( obj ) {
        return obj.serial_no !== serial;
      });

      detail_[0].count = newdevice_.length
      
      store.dispatch(DEVICE(newdevice_))
      store.dispatch(DETAIL(detail_))

      // alert("ลบข้อมูลเรียบร้อยแล้ว")
    } else {
      alert("ดำเนินการล้มเหลว !")
    }
  }

  return (
    ((props.deviceInfo.length > 0) ? props.deviceInfo.map((item, index, arr) => {
      return <div 
            key={index}
            className="device" 
          >

          <div className="deivce-name">{item.device}</div>

          <div className="device-area">{
            item.area
          }</div>
          <div className="device-branch">{
            item.branch
          }</div>

          <div className="device-config device-margin">
          {/* 
            {
              ((userInfo[0] !== undefined) ? ((userInfo[0].is_config  === '1') ? ((userInfo[0].is_config === '1') ? <BtnCustom variant="contained" disabled={
                btnConfig(userInfo[0], item.area_id, item.branch_id)
              } color="primary" className={classes.btnWidth} value = {item.serial} onClick={() => {
                gotoDeviceConfig(item.device)
              }}>
                Config
              </BtnCustom>: false) : false)   : "")          
            } */}


            {
              ((userInfo[0] !== undefined)  ? ((userInfo[0].is_control === '1') ? <BtnCustom variant="contained" disabled={
                btnConfig(userInfo[0], item.area_id, item.branch_id)
              } color="primary" className={classes.btnWidth} value = {item.serial} onClick={() => {
                gotoDeviceConfig(item.device)
              }}>
                Config
              </BtnCustom>: false) : null)          
            }


            {
              ((userInfo[0] !== undefined) ? ((userInfo[0].is_config  === '1') ? ((userInfo[0].is_config === '1') ? <BtnCustom 
              variant="contained" 
              disabled={
                btnConfig(userInfo[0], item.area_id, item.branch_id)
              }color="primary" 
              className={classes.btnWidth}
              onClick= {() => {
                gotoPRVConfig(item.device)
              }}
              >
                PRV Config
              </BtnCustom>: false) : false)   : null)    
            }


            {
              ((userInfo[0] !== undefined) ? ((userInfo[0].is_admin === "1") ? <IconButton aria-label="delete" onClick={
                () => {
                  var serial = item.device
                  handleRemove(serial)
                }
              }>
                <DeleteIcon style={{color: "#f94144"}}/>
              </IconButton>: ""): "")
            }
          
            {
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={opendialog}
                onClose={handleConfirmRemoveClose}
                maxWidth={'lg'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <div className="dialog-container">
                  <div className="dialog-title">ลบข้อมูล</div>
                  <div className="dialog-from" >
                    <div>             
                      <div className="dialog-icon-notfound" style={{fontSize:"1.3em"}}>
                        ยืนยันการลบล๊อกเกอร์
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dialog-btn-group">
                  <Button variant="outlined" color="secondary" className={classes.btnconfigremove} onClick={handleConfirmRemoveClose}>
                    ยกเลิก
                  </Button>
                  <Button variant="outlined" color="primary" className={classes.btnconfigremove} onClick={handleConfirmRemove}>
                    ยืนยัน
                  </Button>
                </div>
              </Dialog>
            }

          </div>
        </div>
    }): <div className="not-found-props-deviceinfo">{ ((store.getState().isSearch) ? null: "ไม่พบข้อมูล") }</div> )
  )
}

export default ListDevice