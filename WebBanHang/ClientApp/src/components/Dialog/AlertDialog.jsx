import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Link} from "react-router-dom"

export default function AlertDialog({ open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thông báo"}
                </DialogTitle>
                <img src="https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="alert_login" width="400px" height="350px" style={{ padding: "15px 30px" }} />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn phải đăng nhập để thực hiện thanh toán
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button component={ Link} to="/login">Đăng nhập</Button>
                    <Button onClick={handleClose} autoFocus>
                        thoát
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}