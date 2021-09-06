import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog'

import { TOKEN,  USERINFO } from './../stores/actions'

// icon
import ErrorIcon from '@material-ui/icons/Error';

import Button from '@material-ui/core/Button'

import Cookies from 'universal-cookie';

import { getUser } from './../apis/PWA_Auth'
import { getConfig } from "./../apis/PWA_Config"

const cookies = new Cookies();

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Redirect (props) {
  let query = useQuery()
  let history = useNavigate();
  
  const [store] = React.useState(props.store)

  const [DialogOpenMissingParam, setDialogOpenMissingParam] = React.useState(false)

  const [CheckParam, setCheckParam] = React.useState(false)

  const [ Start_alert, setStart_alert ] = React.useState("")
  
  var timeout

  React.useEffect(() => {
    var pagename = query.get("pagename")
    var token = query.get("token").replaceAll(" ", "+")
    var serial = query.get("serial_no")
    var dmacode = query.get("dmacode")
    console.log(dmacode)
    if (
      pagename !== null &&
      token !== null &&
      dmacode !== null
    ){
      store.dispatch(TOKEN([token]))

      cookies.set(

        'Token', 

        JSON.stringify([token]), 

        { path: '/', expires: new Date(), maxAge: 60 * 60 * 24}

      );

      // ############################## for test ############################## 
      // cookies.set(

      //   'UserInfo', 

      //   JSON.stringify(JSON.parse(userinfo)), 

      //   { path: '/', expires: new Date(), maxAge: 60 * 60 * 24}

      // );

      // store.dispatch(USERINFO(JSON.parse(userinfo)))
      
      // if (pagename === "prv_config"){
      //   history("/PRVConfig?serial=" + serial)
      // }else if (pagename === "logger_config"){
      //   history("/config?serial=" + serial)
      // }
      // ############################## for test ############################## 

      const getu = async () => {
        var res = await getUser({
          token: token
        })
        if (res.status === 200){
          console.log(res.data)
          if (res.data.msg !== undefined){
            setStart_alert("Token ไม่สามารถใช้งานได้")
            setDialogOpenMissingParam(true)
          }else {

            cookies.set(
  
              'UserInfo', 
      
              JSON.stringify([res.data]), 
      
              { path: '/', expires: new Date(), maxAge: 60 * 60 * 24}
      
            );
      
            store.dispatch(USERINFO([res.data]))
            if (pagename === "prv_config"){
              timeout = setTimeout(() => {
              
                const getSerial = async () => {
                  const res = await getConfig({"dmacode": dmacode})
                  if (res.status === 200 && res.data.length > 0){
                    history("/PRVConfig?serial=" + res.data[0].serial_no)
                  } 
                }
                getSerial()

                // window.location.replace("/PRVConfig?serial=" + serial);
              }, 2000);
            }else if (pagename === "logger_config"){
              timeout = setTimeout(() => {

                const getSerial = async () => {
                  const res = await getConfig({dmacode: dmacode})
                  console.log(res)
                  if (res.status === 200 && res.data.length > 0){
                    history("/config?serial=" + res.data[0].serial_no)
                  } else {
                    setStart_alert("ไม่พบอุปกรณ์")
                    setDialogOpenMissingParam(true)
                  }
                }
                getSerial()


                // window.location.replace("/config?serial=" + serial);
              }, 2000);
            }

          }

        }
      }

      getu()
      // http://dwdev.info/#/redirect?pagename=logger_config&token=RNGXK3NuFM/E6ZED7tTBMX4UXHNbX8cSCjfGnkmotk6Cjm5q%20pxfWhYxMxHRqGTYgpeWPWjMUsPmWWcOkEM750dTSRo5I9HaQJuXFbbflhrDu8tGI1zfQiHTntL6hIs7QByxA6GUGXgJ0AixRcUNciu6pVVHYn/Bwh0YJNkGRs4BHQkWY5hmfcFpwhuO0Z4rceD126TSfHn56PwMdHosHwL1nN%20PvXidZWUi2xedDgDLp2M2ps40y6r5PeQySd4uZtC543BjTEG9e3R9reV%20PrP6TP2NQnrbeR73BeIc2Hk0ObzCr2VdLMkY0zIsLDrfylRtFXzc8pxe%20gSR8AvKmygvE7Wh5pTrECpTYaB7eMgTm%203yv3vlGYQh64BBzM1bs7EKSYcewd7Cd5GWYD5qItLCsp1CLZVvxVJTu5xPKiGkbl/L/sxhbJ0RlH1HUJPMIp7APjWvlHGx8v4WYchF/%20ZE91v3bUWKAtgg9PCP4OK8Cj3b7MTS0r7gc2HoItI8Vw83wBlS43%20XUVMaBGQsBB9ziEoHB5/dbAXtpIlXRf29mff0LrUQYsSUQLR%20%20ixPjweRAD7J1W5jmRGXMmuNVD6pv9Tz2iBO3kiWED97nOofoNkF53QlfgrjkuJxPYUQn9cFUY27eKkgp8OG460Cqc165hWxvz5ZJWkHVhQc//tyghzWX28a9drjjGarZtjMv/yduDWi87%20YF9/HmJch4/n0N7h3DiSFNpRjQ7qgzhfQZ1NyHuy0zJy%205cV3SJo6IQOveHLLSEKXT0ewY7DCnnOUmZhrwBsttLDmcHAygQpmuJWwPGvUNVyY3GaRJ3XsfFuif7TY1wjKOrg8w8gPFhEx93m%20aZlDDEhZ7zNT9piwc3Xo9WVGNaxEn0zuKfxyjG26yBLqcG%20I5NMs2SRdOvOrtxUEIp3UyLT6oqAMHySFGUoYTKW44u5dNfknTaFjaowt5KTFIPyuWKjJmJwmlRm5dfD0yb8WrLguUjHX7LJea66Nt/dvflak%20zsGfROAtocLBXWII7g852JCay3TyfzUVSKJbrbJ3aLPAGWyZRAkI%20zEhCk6Au%20Z4PwVqtTm3zMBHfiiJi8BtxXBWbbF5L8D%20JdX%20fg3f%20kqnnGbnitZcb1VZwuxdd9IVOxsA4OBCWQYRepta58Ko5pojmOJVvuSXACB%20Uxsn2iVU4HJIGBzdhxLv1EpXrU1xhgV//pLCnsAGOWCJY5ARSJGV7wZ2naJ1034zGemmX22ettrmhg=&dmacode=9999999-SL-PRV-15
      // http://dwdev.info/#/redirect?pagename=prv_config&token=RNGXK3NuFM/E6ZED7tTBMX4UXHNbX8cSCjfGnkmotk6Cjm5q%20pxfWhYxMxHRqGTYgpeWPWjMUsPmWWcOkEM750dTSRo5I9HaQJuXFbbflhrDu8tGI1zfQiHTntL6hIs7QByxA6GUGXgJ0AixRcUNciu6pVVHYn/Bwh0YJNkGRs4BHQkWY5hmfcFpwhuO0Z4rceD126TSfHn56PwMdHosHwL1nN%20PvXidZWUi2xedDgDLp2M2ps40y6r5PeQySd4uZtC543BjTEG9e3R9reV%20PrP6TP2NQnrbeR73BeIc2Hk0ObzCr2VdLMkY0zIsLDrfylRtFXzc8pxe%20gSR8AvKmygvE7Wh5pTrECpTYaB7eMgTm%203yv3vlGYQh64BBzM1bs7EKSYcewd7Cd5GWYD5qItLCsp1CLZVvxVJTu5xPKiGkbl/L/sxhbJ0RlH1HUJPMIp7APjWvlHGx8v4WYchF/%20ZE91v3bUWKAtgg9PCP4OK8Cj3b7MTS0r7gc2HoItI8Vw83wBlS43%20XUVMaBGQsBB9ziEoHB5/dbAXtpIlXRf29mff0LrUQYsSUQLR%20%20ixPjweRAD7J1W5jmRGXMmuNVD6pv9Tz2iBO3kiWED97nOofoNkF53QlfgrjkuJxPYUQn9cFUY27eKkgp8OG460Cqc165hWxvz5ZJWkHVhQc//tyghzWX28a9drjjGarZtjMv/yduDWi87%20YF9/HmJch4/n0N7h3DiSFNpRjQ7qgzhfQZ1NyHuy0zJy%205cV3SJo6IQOveHLLSEKXT0ewY7DCnnOUmZhrwBsttLDmcHAygQpmuJWwPGvUNVyY3GaRJ3XsfFuif7TY1wjKOrg8w8gPFhEx93m%20aZlDDEhZ7zNT9piwc3Xo9WVGNaxEn0zuKfxyjG26yBLqcG%20I5NMs2SRdOvOrtxUEIp3UyLT6oqAMHySFGUoYTKW44u5dNfknTaFjaowt5KTFIPyuWKjJmJwmlRm5dfD0yb8WrLguUjHX7LJea66Nt/dvflak%20zsGfROAtocLBXWII7g852JCay3TyfzUVSKJbrbJ3aLPAGWyZRAkI%20zEhCk6Au%20Z4PwVqtTm3zMBHfiiJi8BtxXBWbbF5L8D%20JdX%20fg3f%20kqnnGbnitZcb1VZwuxdd9IVOxsA4OBCWQYRepta58Ko5pojmOJVvuSXACB%20Uxsn2iVU4HJIGBzdhxLv1EpXrU1xhgV//pLCnsAGOWCJY5ARSJGV7wZ2naJ1034zGemmX22ettrmhg=&dmacode=9999999-SL-PRV-15
      
      // http://dwdev.info/#/redirect?pagename=logger_config&token=RNGXK3NuFM/E6ZED7tTBMX4UXHNbX8cSCjfGnkmotk6Cjm5q%20pxfWhYxMxHRqGTYgpeWPWjMUsPmWWcOkEM750dTSRo5I9HaQJuXFbbflhrDu8tGI1zfQiHTntL6hIs7QByxA6GUGXgJ0AixRcUNciu6pVVHYn/Bwh0YJNkGRs4BHQkWY5hmfcFpwhuO0Z4rceD126TSfHn56PwMdHosHwL1nN%20PvXidZWUi2xedDgDLp2M2ps40y6r5PeQySd4uZtC543BjTEG9e3R9reV%20PrP6TP2NQnrbeR73BeIc2Hk0ObzCr2VdLMkY0zIsLDrfylRtFXzc8pxe%20gSR8AvKmygvE7Wh5pTrECpTYaB7eMgTm%203yv3vlGYQh64BBzM1bs7EKSYcewd7Cd5GWYD5qItLCsp1CLZVvxVJTu5xPKiGkbl/L/sxhbJ0RlH1HUJPMIp7APjWvlHGx8v4WYchF/%20ZE91v3bUWKAtgg9PCP4OK8Cj3b7MTS0r7gc2HoItI8Vw83wBlS43%20XUVMaBGQsBB9ziEoHB5/dbAXtpIlXRf29mff0LrUQYsSUQLR%20%20ixPjweRAD7J1W5jmRGXMmuNVD6pv9Tz2iBO3kiWED97nOofoNkF53QlfgrjkuJxPYUQn9cFUY27eKkgp8OG460Cqc165hWxvz5ZJWkHVhQc//tyghzWX28a9drjjGarZtjMv/yduDWi87%20YF9/HmJch4/n0N7h3DiSFNpRjQ7qgzhfQZ1NyHuy0zJy%205cV3SJo6IQOveHLLSEKXT0ewY7DCnnOUmZhrwBsttLDmcHAygQpmuJWwPGvUNVyY3GaRJ3XsfFuif7TY1wjKOrg8w8gPFhEx93m%20aZlDDEhZ7zNT9piwc3Xo9WVGNaxEn0zuKfxyjG26yBLqcG%20I5NMs2SRdOvOrtxUEIp3UyLT6oqAMHySFGUoYTKW44u5dNfknTaFjaowt5KTFIPyuWKjJmJwmlRm5dfD0yb8WrLguUjHX7LJea66Nt/dvflak%20zsGfROAtocLBXWII7g852JCay3TyfzUVSKJbrbJ3aLPAGWyZRAkI%20zEhCk6Au%20Z4PwVqtTm3zMBHfiiJi8BtxXBWbbF5L8D%20JdX%20fg3f%20kqnnGbnitZcb1VZwuxdd9IVOxsA4OBCWQYRepta58Ko5pojmOJVvuSXACB%20Uxsn2iVU4HJIGBzdhxLv1EpXrU1xhgV//pLCnsAGOWCJY5ARSJGV7wZ2naJ1034zGemmX22ettrmhg=&serial_no=SM03-001
      // http://dwdev.info/#/redirect?pagename=prv_config&token=RNGXK3NuFM/E6ZED7tTBMX4UXHNbX8cSCjfGnkmotk6Cjm5q%20pxfWhYxMxHRqGTYgpeWPWjMUsPmWWcOkEM750dTSRo5I9HaQJuXFbbflhrDu8tGI1zfQiHTntL6hIs7QByxA6GUGXgJ0AixRcUNciu6pVVHYn/Bwh0YJNkGRs4BHQkWY5hmfcFpwhuO0Z4rceD126TSfHn56PwMdHosHwL1nN%20PvXidZWUi2xedDgDLp2M2ps40y6r5PeQySd4uZtC543BjTEG9e3R9reV%20PrP6TP2NQnrbeR73BeIc2Hk0ObzCr2VdLMkY0zIsLDrfylRtFXzc8pxe%20gSR8AvKmygvE7Wh5pTrECpTYaB7eMgTm%203yv3vlGYQh64BBzM1bs7EKSYcewd7Cd5GWYD5qItLCsp1CLZVvxVJTu5xPKiGkbl/L/sxhbJ0RlH1HUJPMIp7APjWvlHGx8v4WYchF/%20ZE91v3bUWKAtgg9PCP4OK8Cj3b7MTS0r7gc2HoItI8Vw83wBlS43%20XUVMaBGQsBB9ziEoHB5/dbAXtpIlXRf29mff0LrUQYsSUQLR%20%20ixPjweRAD7J1W5jmRGXMmuNVD6pv9Tz2iBO3kiWED97nOofoNkF53QlfgrjkuJxPYUQn9cFUY27eKkgp8OG460Cqc165hWxvz5ZJWkHVhQc//tyghzWX28a9drjjGarZtjMv/yduDWi87%20YF9/HmJch4/n0N7h3DiSFNpRjQ7qgzhfQZ1NyHuy0zJy%205cV3SJo6IQOveHLLSEKXT0ewY7DCnnOUmZhrwBsttLDmcHAygQpmuJWwPGvUNVyY3GaRJ3XsfFuif7TY1wjKOrg8w8gPFhEx93m%20aZlDDEhZ7zNT9piwc3Xo9WVGNaxEn0zuKfxyjG26yBLqcG%20I5NMs2SRdOvOrtxUEIp3UyLT6oqAMHySFGUoYTKW44u5dNfknTaFjaowt5KTFIPyuWKjJmJwmlRm5dfD0yb8WrLguUjHX7LJea66Nt/dvflak%20zsGfROAtocLBXWII7g852JCay3TyfzUVSKJbrbJ3aLPAGWyZRAkI%20zEhCk6Au%20Z4PwVqtTm3zMBHfiiJi8BtxXBWbbF5L8D%20JdX%20fg3f%20kqnnGbnitZcb1VZwuxdd9IVOxsA4OBCWQYRepta58Ko5pojmOJVvuSXACB%20Uxsn2iVU4HJIGBzdhxLv1EpXrU1xhgV//pLCnsAGOWCJY5ARSJGV7wZ2naJ1034zGemmX22ettrmhg=&serial_no=SM03-001
    } else {
      setStart_alert("กรุณาล๊อกอินก่อนใช้งาน")
      setDialogOpenMissingParam(true)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const handleDialogOpenMissingParam = () => {
    console.log('go to login')
  }

  return (
    <div style={
      {
        fontSize: "2em",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        backgroundColor: "#e9ecef"
      }
      }>
      <span style={
        {
          fontSize: "1.3em",
        }
      }>กรุณารอซักครู่ . . . .</span>
      {/* not found token */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={DialogOpenMissingParam}
        onClose={handleDialogOpenMissingParam}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-container">
          <div className="dialog-title">แจ้งเตือน</div>
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
                <span className="dialog-notfound-logger"> { Start_alert } </span>
              }
            </div>
          </div>
        </div>
        <div className="dialog-btn-group">
        <Button variant="outlined" color="primary"
          onClick={
            () => {
              history("/login")
            }
          }
        >
          Login
        </Button>
        </div>
      </Dialog>

    </div>
  )
}

export default Redirect