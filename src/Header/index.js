import React from 'react';
import logo from './../asset/images/logo.png'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation } from "react-router-dom";

import Cookies from 'universal-cookie';

import UserMenu from '../components/Hearder/UserMenu'

import { getConfig, getProvince, getDMAUnique} from './../apis/PWA_Config'
import { getPointInstall } from './../apis/PWA_Api'

import { DEVICE, PROVINCE, DETAIL, TOKEN, USERINFO, QUERY, ISSEARCH, POINTINSTALL, DMA } from './../stores/actions'

import './index.css';

const cookies = new Cookies();

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#ff00ff",
    backgroundColor: "#5e6dc9",
    '&:hover': {
      backgroundColor: "#5e6dc9",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '0.5vw',
    fontSize: "1vw",
    width: '10vw',
    [theme.breakpoints.down('md')]: {
      fontSize: "2vw",
      width: '20vw',
      margin: '1vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "3.5vw",
      // margin: '1vw',
    },
  }
}));

function Header (props) {
  const history = useNavigate()
  const location = useLocation();
  const [store] = React.useState(props.store)
  const classes = useStyles();
  const [area, setarea] = React.useState([])
  const [branch, setbranch] = React.useState([])
  const [selectarea, setselectarea] = React.useState(-1)
  const [selectbranch, setselectbranch] = React.useState(-1)
  const [province, setprovince] = React.useState([])
  const [userInfo, setuserInfo] = React.useState([]);
  const [Pathname, setPathname] = React.useState(true)
  const [PointInstall, setPointInstall] = React.useState([])
  const [DisableArea, setDisableArea] = React.useState(false)
  const [DisableBranch, setDisableBranch] = React.useState(false)

  const initData = (users, province) => {
    var query = {}
    var detail = {}
    if (users.access_level_id === "1"){
      setselectarea(-1)
      setselectbranch(-1)
      query = {}
      detail = {
        area: "",
        branch: "",
        count: 0,
        userAccress: users.access_level_desc
      }
    }else if (users.access_level_id === "10"){
      if (users.zone_id === "99"){
        setselectarea(0)
      }
      setselectbranch(-1)
      query = {
        zone_id: ((users.zone_id.length === 1) ? "0" + users.zone_id : users.zone_id)
      }
      detail = {
        area: users.zone_desc,
        branch: "",
        count: 0,
        userAccress: users.access_level_desc
      }
    }else if (users.access_level_id === "15"){
      if (users.zone_id === "99"){
        setselectarea(0)
      }
      query = {
        zone_id: ((users.zone_id.length === 1) ? "0" + users.zone_id : users.zone_id),
        wwcode: users.wwcode,
      }
      detail = {
        area: users.zone_desc,
        branch: users.wwcode_desc,
        count: 0,
        userAccress: users.access_level_desc
      }
      province.forEach((item_reg) => {
        if (item_reg.reg === users.zone_id){
          setbranch(item_reg.ww_all)
          item_reg.ww_all.forEach((item_ww, index) => {
            if (item_ww.ww === Number(users.wwcode)){
              setselectbranch(index)
            }
          })
        }
      })
    }
    return [query, detail]
  }

  React.useEffect(() => {
    const getdma = async () => {
      const res = await getDMAUnique()
      store.dispatch(DMA(res.data))
    }
    getdma()

    if (location.pathname === "/Home"){
      setPathname(true)
    }else {
      setPathname(false)
    }
    const checkUser = () => {
      if (store.getState().UserInfo[0] === undefined){
        history('/Login', { replace: true })
      }
    }
    const getProvinces = async () => {
      const res = await getProvince()
      store.dispatch(PROVINCE(res.data[0].province))
      setprovince(res.data[0].province)
      var temp_area = []
      res.data[0].province.forEach((item) => {
        temp_area.push(item)
      })
      setarea(temp_area)
      var qry = initData(user[0], res.data[0].province)
      store.dispatch(QUERY([qry[0]]))
      store.dispatch(ISSEARCH(true))
      store.dispatch(DEVICE([]))
      const resinit = await getConfig(qry[0])
      if (resinit.status === 200){
        qry[1].count = resinit.data.length
        store.dispatch(DETAIL([qry[1]]))
        store.dispatch(DEVICE(resinit.data))
        store.dispatch(ISSEARCH(false))
      }
    }
    
    const getPointInstallFn = async (param_wwcode) => {
      const res = await getPointInstall(param_wwcode)
      store.dispatch(POINTINSTALL(res.data))
      setPointInstall(res.data)
    }

    const CheckAuth = () => {
      if (!cookies.get('Token') && !cookies.get('UserInfo')){
        history('../', { replace: true })
      }else{
        var Token = cookies.get('Token')
        store.dispatch(USERINFO(cookies.get('UserInfo')))
        store.dispatch(TOKEN(Token))

        var userInfo = cookies.get('UserInfo')
        console.log(userInfo[0])
        if (userInfo[0].access_level_id === "15"){
          getPointInstallFn(userInfo[0].wwcode)
        }
      }
    }
    CheckAuth()
    setuserInfo(store.getState().UserInfo)
    var user = store.getState().UserInfo
    console.log("user[0].access_level_id: ", user[0].access_level_id)
    if (user[0].access_level_id === "1"){
      setDisableArea(true)
      setDisableBranch(true)
    } else if (user[0].access_level_id === "10"){
      setDisableArea(false)
      setDisableBranch(true)
    } else if (user[0].access_level_id === "15"){
      setDisableArea(false)
      setDisableBranch(false)
    }
    getProvinces()
    // unmount here
    // return () => { 

    // };
    checkUser()
  }, []);

  const handleAreaChange = async (e) => {
    if (e.target.value !== '-1'){
      setbranch(area[Number(e.target.value)].ww_all)
      setselectarea(e.target.value)
      store.dispatch(QUERY([{
        "zone_id": area[e.target.value].reg
      }]))
      store.dispatch(ISSEARCH(true))
      store.dispatch(DEVICE([]))
      const res = await getConfig({
        "zone_id": area[e.target.value].reg
      })
      if (res.status === 200) {
        store.dispatch(DEVICE(res.data))
        store.dispatch(DETAIL([{
          area: area[Number(e.target.value)].reg_desc,
          count: res.data.length
        }]))
        store.dispatch(ISSEARCH(false))
      }
    }else{
      setselectbranch(-1)
      setselectarea(-1)
      setbranch([])
      // store.dispatch(DETAIL([{
      //   area: "",
      //   branch: "",
      //   count: res.data.length
      // }]))
      store.dispatch(ISSEARCH(true))
      store.dispatch(DEVICE([]))
      const res = await getConfig({})
      if (res.status === 200) {
        store.dispatch(DEVICE(res.data))
        store.dispatch(DETAIL([{
          area: "",
          branch: "",
          count: res.data.length
        }]))
        store.dispatch(ISSEARCH(false))
      }
    }
    setselectarea(e.target.value)
    setselectbranch(-1)
  }

  const handleBranchChange = async (e) => {
    if (e.target.value !== "-1") {
      setselectbranch(e.target.value)
      store.dispatch(QUERY([{
        "wwcode": branch[e.target.value].ww,
        "zone_id": area[selectarea].reg
      }]))
      store.dispatch(ISSEARCH(true))
      store.dispatch(DEVICE([]))
      const res = await getConfig({
        "wwcode": branch[e.target.value].ww,
        "zone_id": area[selectarea].reg
      })
      if (res.status === 200) {
        store.dispatch(DEVICE(res.data))
        store.dispatch(DETAIL([{
          area: area[selectarea].reg_desc,
          branch: branch[e.target.value].ww_desc,
          count: res.data.length
        }]))
        store.dispatch(ISSEARCH(false))
      }
    }else{
      setselectbranch(e.target.value)
      store.dispatch(QUERY([{
        "zone_id": area[selectarea].reg
      }]))
      store.dispatch(ISSEARCH(true))
      store.dispatch(DEVICE([]))
      const res = await getConfig({
        "zone_id": area[selectarea].reg
      })
      if (res.status === 200){
        store.dispatch(DEVICE(res.data))
        store.dispatch(DETAIL([{
          area: area[selectarea].reg_desc,
          branch: '',
          count: res.data.length
        }]))
        store.dispatch(ISSEARCH(false))
      }
    }
  }

  return (
    <div className="header">
      <div className="box-header">
        {/* <button className="btn-area" >click me!</button> */}
        <div className="logo">
          <img src={logo} width="100%" width="100%"/>
        </div>
        <div className="container-title">
          <div className="title">
            ระบบจัดการสมาร์ทล็อคเกอร์
          </div>
          <div className="sub-title">
            การประปาส่วนภูมิภาค
          </div>
        </div>
      </div>
      <div className="box-query">
        {/* <button className="btn-branch" >click me!</button> */}
        <div className="container" style={{
          // display: ((Pathname) ? "block": "none")
        }}>
           {/* && DisableArea && DisableBranch */}
          {
            (DisableArea ? <>
              <div className="area-title" style={{
                display: ((Pathname) ? "block": "none")
              }}>
                เขต
              </div>
              <select className="select-area" value={selectarea} onChange={handleAreaChange} style={{
                display: ((Pathname) ? "block": "none")
              }}>
                <option value="-1">ทุกเขต</option>
                {
                  area.map((item, index) => {
                    return <option key={index} value={index}>{item.reg_desc}</option>
                  })
                }
              </select> 
            </>: null)
          }

          {
            (DisableBranch ? <>
              <div className="branch-title" style={{
                display: ((Pathname) ? "block": "none")
              }}>
                สาขา
              </div>
              <select className="select-branch" value={selectbranch} onChange={handleBranchChange} style={{
                display: ((Pathname) ? "block": "none")
              }}>
                <option value="-1">ทุกสาขา</option>
                {
                  branch.map((item, index) => {
                    return <option key={index} value={index}>{item.ww_desc}</option>
                  })
                }
              </select>
            </>: null)
          }
        
          <div className="border-divide" style={{
            display: ((Pathname) ? "block": "none")
          }}></div>

          {
            ((Pathname) ? <UserMenu />: <UserMenu />)
          }
          
        </div>
      </div>
    </div>
  )
}

export default Header;