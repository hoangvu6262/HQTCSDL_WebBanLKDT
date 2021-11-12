import React from "react";
import { Tooltip, IconButton, Paper, Grid, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    background: "transparent",
    "& p": {
      marginBottom: 0,
      // paddingLeft: 15,
      fontSize: 35,
      fontWeight: 700,
      color: "black",
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      //   textTransform: "uppercase",
    },
  },
  AdminHeaderTitleContainer: {
    marginTop: "-8px",
  },
  adminHeaderContainer: {
    paddingTop: 20,
    paddingBottom: 5,
  },
  adminHeaderAdd: {
    marginTop: "-8px",
    // marginLeft: 5,
    textAlign: "right",
    // backgroundColor: "#fff",
  },
  adminHeaderSubtitle: {
    fontSize: "15px !important",
    fontWeight: "300 !important",
  },
});

export default function AdminHeader(props) {
  const classes = useStyles();

  const {
    title,
    subtitle = "This is a list of all items",
    handleOnlick,
  } = props;

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.adminHeaderContainer}>
          <Grid item xs={11}>
            <div className={classes.AdminHeaderTitleContainer}>
              <p>{title}</p>
              {/* <p className={classes.adminHeaderSubtitle}>{subtitle}</p> */}
            </div>
          </Grid>
          {/* {children} */}
          <Grid item xs={1} className={classes.adminHeaderAdd}>
            <Tooltip title="Add Product" arrow>
              <IconButton
                onClick={handleOnlick}
                style={{
                  backgroundColor: "rgba(0, 30, 60, 0.85)",
                  color: "#fff",
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
      <Divider />
    </>
  );
}
