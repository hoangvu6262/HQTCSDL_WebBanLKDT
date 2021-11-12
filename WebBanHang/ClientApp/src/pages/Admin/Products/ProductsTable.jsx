import React, {useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Pagination from '../../../components/Pagiantion';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { GetAllProductPaging, DeleteProduct } from '../../../redux/actions/product.action';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";



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
    marginRight: "2px !important",
    color: "#fff",
    width: 25,
    height: 25,
  },
  icon: {
    color: "#fff",
    fontSize: "15px !important",
  },
  pagination: {
    padding: "15px 0",

  }
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


export default function ProductsTable(props) {
    const classes = useStyles();
    //const { rows } = props;

    const { listProductsPaging, totalPage, PageNumber } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(GetAllProductPaging(1, 5));
    }, [])


    const handleChangePage = (e, value) => {
        dispatch(GetAllProductPaging(value, 5));
    }

    const handleOnclickDetail = (id) => {
        
        history.push(`/admin/products/productdetail/${id}`);
    }

    const handleOnclickEdit = (id) => {
        history.push(`/admin/products/editproduct/${id}`);
    }

    const handleOnclickDelete = (id) => {
        dispatch(DeleteProduct(id));
    }

    const renderCategory = (categoryId) => {
        switch (categoryId) {
            case 1:
                return (<Chip color="primary" variant="outlined" label="Màn hình" />);
            case 2:
                return (<Chip color="primary" variant="outlined" label="Bàn phím" />);
            case 3:
                return (<Chip color="primary" variant="outlined" label="Tai nghe" />);
            case 4:
                return (<Chip color="primary" variant="outlined" label="Chuột" />);
            default:
                return (<Chip color="primary" variant="outlined" label="Màn hình" />);
        }
    }

    return (
    <>
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
                        {listProductsPaging.map((row) => (
                            <TableRow
                                key={row.tenSp}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.maSp}
                                </TableCell>
                                <TableCell>{row.tenSp}</TableCell>
                                <TableCell>
                                    <img
                                        alt={row.tenSp}
                                        src={row.hinhAnh}
                                        width="80px"
                                    //   height="1px"
                                    />
                                </TableCell>
                                <TableCell>{renderCategory(row.maDanhMuc)}</TableCell>
                                <TableCell>{row.donGia}</TableCell>
                                <TableCell>{row.soLuongCon}</TableCell>
                                <TableCell>
                                    <Tooltip title="Delete Product" arrow>
                                        <IconButton
                                            onClick={() => handleOnclickDelete(row.maSp)}
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
                                            onClick={() => handleOnclickEdit(row.maSp)}
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
                                            onClick={() => handleOnclickDetail(row.maSp)}
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
            <div className={classes.pagination}>
                {totalPage > 1 ? (<Pagination totalPage={totalPage} page={PageNumber} onChange={handleChangePage} />) : null}
                {/*<Pagination totalPage={totalPage} page={PageNumber} onChange={handleChangePage} />*/}
            </div>
    </>
  );
}
