import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(23, 58, 94)",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
});

const useStyles = makeStyles({
  table: {
    overflowX: "auto",
    maxWidth: "100%",
    margin: "auto",
  },
  iconButton: {
    marginRight: 2,
    color: "#fff",
    width: 25,
    height: 25,
  },
  icon: {
    fontSize: 15,
  },
});

const headerName = [
  { id: 1, name: "Mã SP" },
  { id: 2, name: "Tên SP" },
  { id: 3, name: "Ảnh" },
  { id: 4, name: "Mã Danh mục" },
  { id: 5, name: "Giá" },
  { id: 6, name: "Số lượng" },
  { id: 7, name: "Actions" },
];

const rows = [
  {
    MaSP: 1,
    TenSP: "Chuột",
    HinhAnh:
      "https://hanoicomputercdn.com/media/product/51938_tong_the_chuot_khong_day_microsoft_bluetooth_mouse_rjn_00017_mau_xanh_lam.jpg",
    MaDanhMuc: 1,
    DonGia: 1900000,
    SoLuongCon: 35,
  },
];

export default function ProductsTable(props) {
  const classes = useStyles();
  //   const { headerName } = props;
  return (
    <TableContainer className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerName.map((header) => {
              return (
                <StyledTableCell key={header.id}>{header.name}</StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.TenSP}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.MaSP}
              </TableCell>
              <TableCell>{row.TenSP}</TableCell>
              <TableCell>
                <img
                  alt={row.TenSP}
                  src={row.HinhAnh}
                  width="80px"
                  //   height="1px"
                />
              </TableCell>
              <TableCell>{row.MaDanhMuc}</TableCell>
              <TableCell>{row.DonGia}</TableCell>
              <TableCell>{row.SoLuongCon}</TableCell>
              <TableCell>
                <Tooltip title="Delete Product" arrow>
                  <IconButton
                    // onClick={handleOpenAddOrEditDialog}
                    className={classes.iconButton}
                    style={{
                      backgroundColor: "rgb(235, 0, 20)",
                    }}
                  >
                    <DeleteForeverOutlinedIcon className={classes.icon} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Product" arrow>
                  <IconButton
                    // onClick={handleOpenAddOrEditDialog}
                    className={classes.iconButton}
                    style={{
                      backgroundColor: "rgb(206, 147, 216)",
                    }}
                  >
                    <ModeEditOutlinedIcon className={classes.icon} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Product Detail" arrow>
                  <IconButton
                    // onClick={handleOpenAddOrEditDialog}
                    className={classes.iconButton}
                    style={{
                      backgroundColor: "rgb(144, 202, 249)",
                    }}
                  >
                    <InfoOutlinedIcon className={classes.icon} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
