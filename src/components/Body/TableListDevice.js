import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useNavigate, useLocation } from "react-router-dom";

// icon
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { deleteConfig, getDMAUnique } from "./../../apis/PWA_Config"

import { DEVICE, DETAIL, DMA } from './../../stores/actions'

import ReplaceLogger from './ReplaceLogger'

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const ButtonConfig = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#023e8a",
      '&:hover': {
        backgroundColor: "#1161ca",
      },
  },
}))(Button);


const ButtonControl = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#023e8a",
      '&:hover': {
        backgroundColor: "#1161ca",
      },
  },
}))(Button);



const ButtonEdit = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#fdb345",
      '&:hover': {
        backgroundColor: "#ff9800",
      },
  },
}))(Button);


const ButtonDelete = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    marginLeft: 5,
    backgroundColor: "#f72727",
      '&:hover': {
        backgroundColor: "#c30303",
      },
  },
}))(Button);

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  btnWidth: {
    width: "120px",
    height: "34px",
    // padding: "10px",
    margin: "10px 10px 10px 0px",
    fontSize: "0.9em"
  },
  btnWidthMangement: {
    width: "60px",
    height: "34px",
    margin: "10px 10px 10px 0px",
    fontSize: "0.9em"
  },
  btnconfigremove: {
    marginLeft: "10px"
  }
});

export default function TableListDevice(props) {
  let history = useNavigate();
  const [store] = React.useState(props.store)
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ Devices, setDevices ] = React.useState([])
  const [userInfo, setuserInfo] = React.useState([])
  const [opendialog, setopendialog] = React.useState(false)
  const [selectDevice, setselectDevice] = React.useState(undefined)
  const [columns, setcolumns] = React.useState([])
  const [openReplaceLogger, setopenReplaceLogger] = React.useState(false)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, Devices.length - page * rowsPerPage);

  var intervalGetDevice

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

    setcolumns([
      { id: 'pointinstall',label: 'จุดติดตั้ง',minWidth: 200,align: "left"},
      { id: 'serial', label: 'Remote Name.', minWidth: 70 , align: "center"},
      { id: 'reg', label: 'เขต', minWidth: 70, align: "center"},
      { id: 'branch', label: 'สาขา', minWidth: 100, align: "center"},
      { id: 'config',label: 'Config',minWidth: 70,align: "center"},
      { id: 'control',label: 'Control',minWidth: 70,align: "center"},
      { id: 'edit',label: 'จัดการ',minWidth: 140,align: "center"},
    ])
    // ((userInfo[0] !== undefined) ? ((userInfo[0].is_admin === "0") ? <TableCell  align="center">
    // <IconButton aria-label="delete">
    // <EditIcon style={{color: "#ff9800"}}/>
    // </IconButton>

    // <IconButton aria-label="delete" onClick={() => {
    // var serial = row.serial_no
    // handleRemove(serial)
    // }}>
    // <DeleteIcon style={{color: "#f94144"}}  />
    // </IconButton>
    // </TableCell>: ""): "")

    setTimeout(() => {
      intervalGetDevice = setInterval(() => {
        var StoreDevices = store.getState().Device
        var Provice = store.getState().Province 
        StoreDevices.forEach((item) => {
          item.reg_desc = findArea(item.zone_id, Provice)
          item.ww_desc = findBranch(item.wwcode, Provice)
        })
        setDevices(StoreDevices)
        setuserInfo(store.getState().UserInfo)
      }, 200)
    }, 500);
    return () => {
      clearInterval(intervalGetDevice)
      setuserInfo([])
      setDevices([])
    }
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleConfirmRemoveClose = () => {
    setopendialog(false)
  }
  
  const handleRemove = (serial) => {
    setselectDevice(serial)
    setopendialog(true)
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
      setPage(0)
      const getdma = async () => {
        const res = await getDMAUnique()
        store.dispatch(DMA(res.data))
      }
      getdma()
      // alert("ลบข้อมูลเรียบร้อยแล้ว")
    } else {
      alert("ดำเนินการล้มเหลว !")
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="ตารางอุปกรณ์">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={((userInfo[0] !== undefined) ? ((column.id === "edit") ? ((userInfo[0].is_admin === "0") ? {display: "table-cell"}: {display: "none"}): {display: "table-cell"}) : {display: "table-cell"})}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? Devices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : Devices
            ).map((row) => (

              <TableRow key={row.serial_no}>
                <TableCell  component="th" scope="row">
                  { row.dmaname }
                </TableCell>
                <TableCell align="center">
                  { row.serial_no }
                </TableCell>
                <TableCell align="center">
                  { row.reg_desc }
                </TableCell>
                <TableCell align="center">
                  { row.ww_desc }
                </TableCell>
                <TableCell align="center">
                  {
                    ((userInfo[0] !== undefined)  ? ((userInfo[0].is_control === '1') ? <ButtonConfig variant="contained" disabled={
                      btnConfig(userInfo[0], row.zone_id, row.wwcode)
                    } 
                    color="primary" 
                    value = {row.serial_no}
                    className={classes.btnWidth}
                    onClick={() => {
                      gotoDeviceConfig(row.serial_no)
                    }}
                    >
                      Config
                    </ButtonConfig>: false) : null)
                  }
                </TableCell>

                <TableCell align="center">
                  {
                    ((userInfo[0] !== undefined) ? ((userInfo[0].is_config  === '1') ? ((userInfo[0].is_config === '1') ? <ButtonConfig 
                      variant="contained" 
                      disabled={
                        btnConfig(userInfo[0], row.zone_id, row.wwcode)
                      }
                      color="primary" 
                      className={classes.btnWidth}
                      onClick={() => {
                        gotoPRVConfig(row.serial_no)
                      }}
                      >
                      PRV Config
                    </ButtonConfig>: false) : false)   : null)
                  }
                </TableCell>

                {
                  ((userInfo[0] !== undefined) ? ((userInfo[0].is_admin === "0") ? <TableCell align="center">
                    <div style={{display: "flex"}}>

                      <ReplaceLogger store={store} device={ row.serial_no }/>
                      
                      <IconButton aria-label="delete" onClick={() => {
                        var serial = row.serial_no
                        handleRemove(serial)
                      }}>
                        <DeleteIcon style={{color: "#f94144"}}  />
                      </IconButton>

                    </div>
                  </TableCell>: null): null)
                }

              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'ทั้งหมด', value: -1 }]}
                colSpan={7}
                count={Devices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                labelRowsPerPage={"จำนวนแถวต่อหน้า"}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      
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
  );
}