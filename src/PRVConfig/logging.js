import React from "react"
import { useLocation } from "react-router-dom";
import './index.css'
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from "@material-ui/core/InputBase"
import Box from '@material-ui/core/Box'

import Grid from '@material-ui/core/Grid';


import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Pagination from '@material-ui/lab/Pagination';

import PropTypes from 'prop-types';

import { useNavigate } from "react-router-dom";

import { getLog } from "./../apis/PWA_Logging"

import parseDateTime from "../commons/parseDateTime";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const StyledTalbe = withStyles({
  root: {
    fontFamily: "sans-serif !important"
  },
})(Table);

const useStylesPagination = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ViewButton = withStyles((theme) => ({
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
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",

  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


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
  },
  NativeselectError: {
    border: "solid 1px #ff0000",
    borderRadius: "4px"
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

const Logging = (props) => {
  const classes = useStyles()
  const classesPagination = useStylesPagination();
  let query = useQuery()
  let history = useNavigate();
  const [store] = React.useState(props.store)
  const [Serial] = React.useState(props.serial)
  const [selectRow, setselectRow] = React.useState(0)
  const [PRV_config, setPRV_config] = React.useState([])

  const [Logging, setLogging] = React.useState([])
  const [Page, setPage] = React.useState(0)
  const [Open, setOpen] = React.useState(false)
  const [Detail, setDetail] = React.useState(0)

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


  React.useEffect(async () => {
    const getapi = async () => {
      console.log(Serial)
      var findDMAcode = store.getState().Device
      var dmacode = ""
      findDMAcode.forEach((e) => {
        if (e.serial_no === Serial){
          dmacode = e.dmacode
        } 
      })
      const res = await getLog({
        // "dmacode": "DBNOON01"
        "dmacode": dmacode
      })
      setLogging(res.data)
    }
    await getapi()
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const renderTable = () => {
    return Logging.slice(Page * 10, Page * 10 + 10).map((row, index) => (
        <TableRow key={index}>
          
          <TableCell component="th" scope="row">
            {index + 1 + (Page * 10)}
          </TableCell>

          <TableCell align="left">{row.dmaname}</TableCell>
          <TableCell align="left">{parseDateTime(row.time)}</TableCell>
          
          <TableCell align="left">
            <ViewButton onClick = {() => {
              setDetail(row)
              setOpen(true)
            }}>
              คลิกเพื่อดู
            </ViewButton>
          </TableCell>
        
          <TableCell align="left">{row.name}</TableCell>

        </TableRow>
      )
    )
  }

  return (
  <>
    <div className="prv-auto-config-header-new">
      ประวัติการทำงาน
    </div>

    <TableContainer component={Paper} className={classes.fontinherit}>
      <StyledTalbe className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 20, fontSize: "1.2em" }} align="left">ลำดับ</TableCell>
            <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">dmaname</TableCell>
            <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">Time</TableCell>
            <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">รายละเอียด&nbsp;</TableCell>
            <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">สั่งโดย&nbsp;</TableCell>
            {/* <TableCell style={{ width: 120, fontSize: "1.2em" }} align="left">Flow&nbsp;</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            renderTable()
          }
        </TableBody>
      </StyledTalbe>
      <div className="prv-pagging-btn-logging">
        <div className={classes.root}>
          <Pagination count={Math.ceil(Logging.length / 10)} showFirstButton showLastButton onChange={(event, page) => {
            console.log(page)
            setPage(page - 1)
          }}/>
        </div>
      </div>
    </TableContainer>


    <Dialog aria-labelledby="customized-dialog-title" 
      fullWidth={true}
      maxWidth={"xl"}
      open={Open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Config History [dmaname: {Detail.dmaname}, Time: {parseDateTime(Detail.time)}, สั่งโดย {Detail.name}]     
      </DialogTitle>
      <DialogContent dividers>

      <Grid container spacing={2}>
        <Grid item sm={2}>
          <Paper className={classes.paper}>
            <div style={{padding: "10px 10px 5px", borderBottom: "solid 1px #b1afb1"}}><center>Manual</center></div>
            {
              (Detail.manual !== undefined ? <div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}>Value = { Detail.manual.valve }</div>: <div style={{padding: "10px 10px 10px", fontSize: "0.8em"}}></div>)
            }
          </Paper>
        </Grid>
        <Grid item sm={8}>
          <Paper className={classes.paper}>
            <div style={{padding: "10px 10px 5px", borderBottom: "solid 1px #b1afb1"}}><center>PRV Config</center></div>

            {
              (Detail.prv_config !== undefined ? <>

              <TableContainer component={Paper} className={classes.fontinherit}>
                <StyledTalbe className={classes.table} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 120, fontSize: "0.8em" }} align="left">Time</TableCell>
                      <TableCell style={{ width: 120, fontSize: "0.8em" }} align="left">Device Mode</TableCell>
                      <TableCell style={{ width: 120, fontSize: "0.8em" }} align="left">Pressure</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Detail.prv_config.map(e => {return <TableRow>
                      <TableCell align="left">{e.time}</TableCell>
                      <TableCell align="left">{e.device_mode}</TableCell>
                      <TableCell align="left">{e.pressure}</TableCell>
                    </TableRow>})}
                  </TableBody>
                </StyledTalbe>
              </TableContainer>

              </>: <></>)
            }

          </Paper>
        </Grid>
        <Grid item sm={2}>
          <Paper className={classes.paper}>
            <div style={{padding: "10px 10px 5px", borderBottom: "solid 1px #b1afb1"}}><center>Failure Mode</center></div>
            {(Detail.failure_mode !== undefined ? <>
              <div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}>Deadband Flow = { Detail.failure_mode.deadband_flow }</div>
              <div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}>Deadband Pressure = { Detail.failure_mode.deadband_pressure }</div>
              <div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}>Limit Valve min = { Detail.failure_mode.limit_valve_min }</div>
              <div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}>Time Loog min = { Detail.failure_mode.time_loog_min }</div>
              <div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}>Step Value = { Detail.failure_mode.step_valve }</div>
              <div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}>Mode = { Detail.failure_mode.mode }</div>
            </>: <><div style={{padding: "10px 10px 5px", fontSize: "0.8em"}}></div></>)}
          </Paper>
        </Grid>
      </Grid>
      
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          ปิด
        </Button>
      </DialogActions>
    </Dialog>

  </>
  )
}

export default Logging