import React, { useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    Divider,
    AppBar,
    Box,
    Toolbar,
    Button,
    IconButton,
    Typography,
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
    Container
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


const CustomAppBar = styled(AppBar)({
    
    color: "#000 !important",
    backgroundColor: "#fff !important",
})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const AccountButton = styled(Button)({
    color: "#000",
    marginTop: 7,
    fontFamily: "'Urbanist', sans- serif",
    "&:hover": {
        color: "#000",
        textDecoration: "none !important"
    }
});

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

const MainHeader =() =>{
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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


    return (
        <Box sx={{ flexGrow: 1 }}>
            <CustomAppBar>
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

                        <Link to="/">
                            <img src="https://theme.hstatic.net/1000026716/1000440777/14/logo.svg?v=22841" alt="logo" width="150" />
                        </Link>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
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
                                <AccountButton component={Link} to="/login">Sign In</AccountButton>
                                <AccountButton component={Link} to="/register">Register</AccountButton>
                            </Box>}

                            {location.pathname === "/cart" ? null : (
                                <CustomIconButton component={Link} to="/cart" size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={cart.quantity} color="error">
                                        <ShoppingBasketOutlinedIcon />
                                    </Badge>
                                </CustomIconButton>
                            )}
                        </Box>
                    </Toolbar>
                </CustomContainer>
                
            </CustomAppBar>
        </Box>
    );
}

export default MainHeader;