import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  flexDirection: {
    flexDirection: "column"
  },
  flexCenter:{
    display: "flex",
    justifyContent: "center",
  },
  success: {
    color: "#14a239",
    fontSize: "1.3em"
  },
  error: {
    color: "#b70404",
    fontSize: "1.3em"
  }
}));


export default function DialogAuto(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title" maxWidth={"lg"}>
      <DialogTitle id="form-dialog-title">กำลังดำเนินการบันทึกคอนฟิก</DialogTitle>
        <DialogContent>
          <div style={{width: "500px"}} >
            {
              ((props.state === 0) ? <LinearProgress />  : null)
            }

            <div className={classes.flexDirection}>

              {/* 0 wait */}
              {
                ((props.state === 0) ? <div className={classes.flexCenter}>กรุณารอซักครู่ . . . . </div>  : null)
              }

              {/* 1 mqtt error */}
              {
                ((props.state === 1) ? <div className={classes.flexCenter, classes.error}><ErrorRoundedIcon />ดำเนินการบันทึกไม่สำเร็จ Broker มีปัญหา</div>  : null)
              }

              {/* 2 success */}
              {
                ((props.state === 2) ? <div className={clsx(classes.flexCenter, classes.success)}><CheckCircleIcon />ดำเนินการบันทึกสำเร็จ</div>  : null)
              }

              {/* 3 unsuccess */}
              {
                ((props.state === 3) ? <div className={classes.flexCenter, classes.error}><ErrorRoundedIcon />ดำเนินการบันทึกไม่สำเร็จ Api มีปัญหา</div> : null)
              }
            </div>

          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary">
          
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}