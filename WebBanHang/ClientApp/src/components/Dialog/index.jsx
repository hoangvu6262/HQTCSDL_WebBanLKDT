import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  },
  dialogTitleConteiner: {
    padding: "20px 35px",
    "& p": {
      fontWeight: 300,
      marginBottom: 0,
      fontSize: 15,
    },
  },
  dialogTitle: {
    fontSize: "25px !important",
    fontWeight: "400 !important",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function FormDialog(props) {
  const classes = useStyles();

  const { openDialog, setOpenDialog, handleSubmit, children, ...other } = props;

  const handleClose = () => {
    setOpenDialog({
      ...openDialog,
      open: false,
    });
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={openDialog.open}
      onClose={handleClose}
      className={classes.root}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle className={classes.dialogTitleConteiner}>
        <p className={classes.dialogTitle}>{openDialog.title}</p>
        <p>All aspects related to the app users can be managed.</p>
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
