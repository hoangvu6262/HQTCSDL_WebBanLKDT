import React, { useState, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    Divider,
    AppBar,
    Box,
    Toolbar,
    Button,
    IconButton,
    Grid,
    InputBase,
    Badge,
    Fade,
    Paper,
    Popper,
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Hidden,
    Container,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import action from "../../redux/actions/action"
import TopMegaMenu from "../TopMegamenu";
import Announcement from "../Announcement";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArticleIcon from '@mui/icons-material/Article';

import { makeStyles, withStyles } from '@mui/styles';


const CustomAppBar = styled(AppBar)({
    
    color: "#000 !important",
    backgroundColor: "#f1f0f1 !important",
    boxShadow: "none !important",
    transition: "all 0.5s ease-out !important",
})

const Search = styled('div')(({ theme }) => ({
    overflow: "hidden",
    position: 'relative',
    borderRadius: 20,
    //border: "1px solid #000",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        height: 33
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    backgroundColor: "red",
    color: "#fff",
    padding: "8px  13px",
    height: '100%',
    //position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    fontSize: "14px !important",
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0, 1, 0),
        paddingLeft: `15px`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '470px',
        },
        [theme.breakpoints.up('700')]: {
            width: '320px',
        },
        [theme.breakpoints.up('500')]: {
            width: '240px',
        },
        
    },
}));


const AccountButton = styled(Button)(({ theme }) => ({
    color: "#000",
    marginTop: 7,
    marginLeft: "17px",
    //fontFamily: "'Urbanist', sans- serif",
    fontSize: "13px !important",
    "&:hover": {
        color: "#000",
        textDecoration: "none !important"
    },
    [theme.breakpoints.down("1210")]: {
        fontSize: "10px !important",
        marginLeft: "11px",
    },

    [theme.breakpoints.down("md")]: {
        display: "none"
    }
}));

const AccountPopper = styled(Popper)({
    zIndex: 2
})

const AccToggle = styled(Paper)({
    padding: 10,
    fontFamily: "'Urbanist', sans- serif !important",
    color: "#000",
    width: 200
})

const AccToggleText = styled(ListItemText)({
    paddingLeft: 25,
    color: "#000",
    "& span": {
        fontFamily: "'Urbanist', sans- serif !important",
    }
})

const CustomIconButton = styled(IconButton)({
    marginTop: "5px",
    marginLeft: "17px",
    padding: "12px",
    "&:hover": {
        color: "#000",
        textDecoration: "none !important"
    }
})

const CustomMenuItem = styled(MenuItem)({
    "&:hover": {
        color: "#000",
        textDecoration: "none !important"
    }
})

const CustomContainer = styled(Container)({
    padding: "0 5px !important",
    "&.MuiContainer-maxWidthXl": {
        maxWidth: 1310,
    }
})

const CustomHr = styled("hr")({
    padding: "0px 20px 0px 20px",
    margin: "0px 20px 5px 20px",
})

const styles = (theme) => ({
        show: {
            display: "block",
        },
        hide: {
            transform: "translateY(-37px)",
            //display: "none",

        },
        headerTopMegaMenu: {
            padding: "5px 20px 10px 20px",
        }
    })


const MainHeader = (props) =>{
    //const classes = useClasses(styles);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [display, setDisplay] = useState(true)
    const [showCategory, setShowCategory] = useState(false);
    const [show, setShow] = useState(false);

    const location = useLocation();

    const dispatch = useDispatch();

    const { cart, } = useSelector(state => state.product)
    const { customor, isCustomorLogin } = useSelector(state => state.user)

    //console.log(customor)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const handleLogOut = () => {
        dispatch(action("CUSTOMOR_LOGOUT", false));
    }


    const AccMenu = () => {
        

        return (
            <MenuList>
                <CustomMenuItem component={Link} to={`/profile&userid=${customor.id}`}>
                    <ListItemIcon>
                        <AccountBoxOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <AccToggleText>Profile</AccToggleText>
                </CustomMenuItem>
                <CustomMenuItem>
                    <ListItemIcon>
                        <ShoppingBagOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <AccToggleText>Orders</AccToggleText>
                </CustomMenuItem>
                <CustomMenuItem>
                    <ListItemIcon>
                        <SettingsApplicationsOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <AccToggleText>Setting</AccToggleText>
                </CustomMenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <AccToggleText>LogOut</AccToggleText>
                </MenuItem>
            </MenuList>
            )
    }


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 600) {
                setDisplay(false);
                setShowCategory(true)
            } else {
                setDisplay(true)
                setShowCategory(false)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])


    return (
        <Box sx={{ flexGrow: 1 }} >
            <CustomAppBar className={display ? props.classes.show : props.classes.hide} onMouseLeave={() => setShow(false)}>
                <Announcement />
                <CustomContainer maxWidth="xl">
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Grid container>
                            <Grid item md={ 2} xs={3} style={{ padding: "10px 9px 10px 0px"}}>
                                <Link to="/">
                                    <img src="https://theme.hstatic.net/1000026716/1000440777/14/logo.svg?v=22841" alt="logo" width="100%" />
                                </Link>
                            </Grid>
                            <Grid item md={5} xs={ 8} style={{ padding: "10px 0px" }}>
                                <Search>

                                    <StyledInputBase
                                        placeholder="Nhập mã hoặc tên sản phẩm…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                </Search>
                            </Grid>
                            <Grid item md={5} xs={ 1} style={{ display: "flex", justifyContent: "center" }}>

                                <Box sx={{ flexGrow: 1 }} />
                                <Box sx={{ display: { xs: 'flex' } }}>

                                    {isCustomorLogin ? (
                                        <div>
                                            <AccountButton aria-describedby={id} type="button" onClick={handleClick}>
                                                {customor.account}
                                            </AccountButton>
                                            <AccountPopper id={id} open={open} anchorEl={anchorEl} transition disablePortal>
                                                {({ TransitionProps }) => (
                                                    <Fade {...TransitionProps} timeout={350}>
                                                        <AccToggle>
                                                            {AccMenu()}
                                                        </AccToggle>
                                                    </Fade>
                                                )}
                                            </AccountPopper>
                                        </div>
                                    ) : <Box>
                                            <AccountButton component={Link} to="/login" startIcon={<AccountCircleIcon style={{ fontSize: 29 }} />}>Đăng nhập</AccountButton>
                                            <AccountButton component={Link} to="/register" startIcon={<AssignmentIndIcon style={{ fontSize: 29 }}/>}>Đăng ký</AccountButton>
                                            <AccountButton component={Link} to="/register" startIcon={<ArticleIcon style={{ fontSize: 29 }} />}>Khuyến mãi</AccountButton>
                                            {location.pathname === "/cart" ? null : (
                                                <CustomIconButton component={Link} to="/cart" size="large" aria-label="show 4 new mails" color="inherit">
                                                    <Badge badgeContent={cart.quantity} color="error">
                                                        <ShoppingBasketOutlinedIcon />
                                                    </Badge>
                                                </CustomIconButton>
                                            )}
                                    </Box>}

                                    
                                </Box>
                            </Grid>
                        </Grid>
                        
                        
                    </Toolbar>
                    <Hidden mdDown>
                        <CustomHr />
                        <Grid container spacing={1} className={props.classes.headerTopMegaMenu}>
                            <TopMegaMenu showCategory={showCategory} show={show} setShow={setShow} />
                        </Grid>
                    </Hidden>
                </CustomContainer> 
            </CustomAppBar>
        </Box>
    );
}

export default withStyles(styles)(MainHeader);