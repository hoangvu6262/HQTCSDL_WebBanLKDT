import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomDrawer from "./CustomDrawer";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';

const drawerWidth = 280;

const sidebarList = [
  {
    name: "Dashboard",
    icon: DashboardOutlinedIcon,
    link: "/admin",
    exact: true,
  },
  {
    name: "Quản lý người dùng",
    icon: AccountBoxOutlinedIcon,
    link: "/admin/user",
    exact: false,
  },
  {
    name: "Quản lý sản phẩm",
    icon: KeyboardOutlinedIcon,
    link: "/admin/products",
    exact: false,
  },
  {
    name: "Quản lý Hóa đơn",
      icon: ReceiptRoundedIcon,
    link: "/admin/bills",
    exact: false,
  },
  {
    name: "Quản lý tin tức",
    icon: CreateOutlinedIcon,
    link: "/admin/news",
    exact: false,
  },
  {
    name: "Thống kê",
    icon: AssessmentOutlinedIcon,
    link: "/admin/report",
    exact: false,
  },
];

const adminUser = {
  maKhachHang: 2,
  tenDangNhap: "hoangvu22",
  matKhau: "1234567",
  anhDaiDien:
    "https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:Tr%C3%BAc_Anh_%E2%80%93_M%E1%BA%AFt_bi%E1%BA%BFc_BTS_(2).png",
  email: "hoangvubg6262@gmail.com",
  ten: "Hoang Vu",
  diaChi: "brvt",
  sdt: "065481523",
  isAdmin: false,
};

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{ backgroundColor: "rgb(23, 58, 94)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Linh Kiện Máy Tính
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {/* {drawer} */}
          <CustomDrawer adminUser={adminUser} sidebarList={sidebarList} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {/* {drawer} */}
          <CustomDrawer adminUser={adminUser} sidebarList={sidebarList} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
