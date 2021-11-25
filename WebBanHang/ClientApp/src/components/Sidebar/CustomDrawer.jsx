import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/img/pngkit_gamecube-logo-png_410453.png";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    paddingBottom: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 30, 60, 0.85)",
    // backgroundColor: "rgba(23, 58, 94, 0.8)",
    height: "100%",
  },
  toolbar: {},
  content: {
    flexGrow: 1,
    padding: 35,
  },
  sidebarListItem: {
    marginTop: 15,
  },
  navlink: {
    // marginTop: theme.spacing(2),
    padding: "11px 10px",
    width: "100%",
    height: "100%",
    color: "#fff",
    textDecoration: "none",
    listStyle: "none",
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    "&:hover": {
      color: "#fff",
      textDecoration: "none",
      listStyle: "none",
      backgroundColor: "rgba(200,200,200,0.1)",
    },
  },
  navlinkText: {
    color: "#fff",
    "& .MuiTypography-body1": {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 300,
      fontSize: 15,
    },
  },
  activeNavlink: {
    backgroundColor: "rgb(15 45 75)",
    color: "#fff",
    "&:hover": {
      color: "#fff",
      textDecoration: "none",
      listStyle: "none",
      backgroundColor: "rgb(15 45 75)",
    },
  },
  logo: {
    // margin: "auto",
    margin: "5px 0",
    marginLeft: "28px",
    width: "75%",
    height: "70%",
  },
  sideBarPaper: {
    paddingBottom: 20,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // zIndex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundImage:
      "url(https://demos.creative-tim.com/material-dashboard-react/static/media/sidebar-4.dd4b5581.jpg)",
  },
  drawerDivider: {
    width: "80%",
    margin: "0 auto",
    backgroundColor: "rgb(137 135 135)",
  },
});

export default function CustomDrawer(props) {
  const { adminUser, sidebarList } = props;
    const classes = useStyles();

    const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

    const handleLogOut = () => {
        localStorage.removeItem("adminLogin");
        dispatch({
            type: "ADMIN_LOGOUT",
            payload: false,
        });
    };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.toolbar}>
          <img src={logo} className={classes.logo} />
        </div>

        <Divider className={classes.drawerDivider} />
        <List className={classes.sidebarListItem}>
          {sidebarList.map((text, index) => (
            <ListItem button key={index}>
              <NavLink
                to={text.link}
                activeClassName={classes.activeNavlink}
                className={classes.navlink}
                exact={text.exact}
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <text.icon />
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  className={classes.navlinkText}
                />
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider className={classes.drawerDivider} />
        {adminUser ? (
          <List>
            <ListItem button onClick={handleClick}>
              <ListItemIcon style={{ margin: "7px 10px" }}>
                <Avatar
                  alt={adminUser.ten}
                  src={adminUser.anhDaiDien}
                  style={{ height: 35, width: 35 }}
                />
              </ListItemIcon>

              <ListItemText
                primary={adminUser.account}
                className={classes.navlinkText}
              />
              {open ? (
                <ExpandLessOutlinedIcon style={{ color: "#fff" }} />
              ) : (
                <ExpandMoreOutlinedIcon style={{ color: "#fff" }} />
              )}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ marginLeft: 35 }}>
                <ListItem button>
                  <ListItemIcon style={{ color: "#fff" }}>PF</ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    className={classes.navlinkText}
                  />
                </ListItem>
                <ListItem button onClick={handleLogOut}>
                  <ListItemIcon style={{ color: "#fff" }}>LO</ListItemIcon>
                  <ListItemText
                    primary="Log Out"
                    className={classes.navlinkText}
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        ) : null}
      </div>

      <div className={classes.sideBarPaper}></div>
    </>
  );
}
