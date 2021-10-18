import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './index.css'

import ListDevice from '../components/Body/ListDevice'
import TableListDevice from '../components/Body/TableListDevice'

import AddDevice from '../components/Body/AddDevice'

import { DETAIL, USERINFO, DEVICE } from './../stores/actions'

import MQTT from 'paho-mqtt'
import PWAMqtt from './../module/mqtt'
import sconfig from "./../config"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  margin: {
    // margin: theme.spacing(1),
  },
  width: {
    width: "124px",
    height: "38px",
    padding: "10px",
    marginLeft: "10px"
  }
}));

var mqtt_connection = new PWAMqtt(MQTT, sconfig.mqtt_url, 8083, sconfig.mqtt_user, sconfig.mqtt_pass)
async function ConnectMqtt () {
  var isConnect = await mqtt_connection.onConnect()
  //console.log(isConnect)
}
ConnectMqtt()

function ManagerDevice (props) {
  const classes = useStyles();
  const [device, setdevice] = React.useState([])
  const [store] = React.useState(props.store)
  const [detail, setdetail] = React.useState([{
    area: "",
    branch: "",
    count: 0,
    userAccress: ''
  }])
  const [userInfo, setuserInfo] = React.useState([])

  var IntervalTime

  const findArea = (area, Province) => {
    var area_ = ""
    Province.forEach((item) => {
      if (item.reg === area) {
        area_ = item.reg_desc
      }
    })
    return area_
  }

  const findBranch = (branch, Province) => {
    var branch_ = ""
    Province.forEach((item) => {
      item.ww_all.forEach((item) => {
        if (Number(item.ww) === Number(branch)){
          branch_ = item.ww_desc
        }
      })
    })
    return branch_
  }

  React.useEffect(() => {

    IntervalTime = setInterval((() => {
      var ddvice = store.getState().Device
      var ddetail = store.getState().Detail
      var Province = store.getState().Province

      if (Province !== undefined){
        setdevice(ddvice.map((item) => {
          return {
            device: item.serial_no,
            area_id: item.zone_id,
            branch_id: item.wwcode,
            area: findArea(item.zone_id, Province),
            branch: findBranch(item.wwcode, Province),
            remove: false
          }
        }))
        setdetail(ddetail)
      }
    }), 300);
    setuserInfo(store.getState().UserInfo)
    // var province = store.getState().Province
    // console.log(province)

    return () => {
      clearInterval(IntervalTime);
      setdevice([])
      setdetail([])
      store.dispatch(DETAIL([{
        area: "",
        branch: "",
        count: 0
      }]))
      store.dispatch(USERINFO([]))
      store.dispatch(DEVICE([]))
    }
  }, [])
  return (
    <div className="manager-device">
      <div className="m-container shadow">
        <div className="m-card-header">
          <div className="card-title">
            รายการอุปกรณ์สมาร์ทล๊อกเกอร์
          </div>
          <div className="card-add-device">
            {/* <BtnCustom variant="contained" color="primary" className={classes.margin}>
              เพิ่มอุปกรณ์
            </BtnCustom> */}
            {
              ((userInfo[0] !== undefined) ? ((userInfo[0].is_admin !== "1") ? <AddDevice store={store} hidden={true} client={mqtt_connection}/>: <AddDevice store={store} hidden={false} client={mqtt_connection}/>): "")
            }
          </div>
        </div>
        <div className="list-device">
          <div className="result-search">
            สิทธิ์ของผู้ใช้ระดับ
            <span className="accress">
              {
                " " + ((userInfo[0] !== undefined) ? userInfo[0].access_level_desc : "") + " "
              }  
            </span>
            ผลลัพท์การค้นหา
            <span className="place">
              {
                ((detail[0] !== undefined) ? " " + detail[0].area + " " + ((detail[0].branch) ? detail[0].branch: ""): "")
              }  
            </span> จำนวนที่พบ <span className="unit">
            {
              ((detail[0] !== undefined) ? detail[0].count : "")
            }  
            </span> อุปกรณ์ 
          </div>

          {
            // ((store.getState().isSearch) ? <div className="progressbar-search-device"><CircularProgress /></div>: null)
          }

          <TableListDevice deviceInfo={device} store={store} mqtt_connection={mqtt_connection}/>
          {/* <ListDevice deviceInfo={device} store={store} /> */}

        </div>
      </div>
    </div>
  )
}

export default ManagerDevice;