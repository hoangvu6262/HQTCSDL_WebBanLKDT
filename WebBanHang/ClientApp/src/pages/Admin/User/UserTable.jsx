import React, { useEffect } from "react";
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
import Pagination from '../../../components/Pagiantion';
import Switch from "@mui/material/Switch";
import { GetAllUserPaging, DeleteUser } from '../../../redux/actions/user.action';
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
        padding: "30px",
        width: "100%",
        display: "flex",
        justifyContent: "center"

    }
});

const headerName = [
    { id: 1, name: "" },
    { id: 2, name: "Mã Khách hàng" },
    { id: 3, name: "Tên đăng nhập" },
    { id: 4, name: "Họ tên" },
    { id: 5, name: "Email" },
    { id: 6, name: "Địa chỉ" },
    { id: 7, name: "Số ĐT" },
    { id: 8, name: "Admin" },
    { id: 9, name: "Action" },
];


export default function UsersTable(props) {
    const classes = useStyles();
    const { openDialog, setOpenDialog } = props;

    const { listUsersPaging, totalPage, PageNumber } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(GetAllUserPaging(1, 6));
    }, [])


    const handleChangePage = (e, value) => {
        dispatch(GetAllUserPaging(value, 6));
    }

    const handleOnclickDetail = (id) => {
        history.push(`/admin/user/userdetail/${id}`);
    }

    const handleOnclickDelete = (id) => {
        dispatch(DeleteUser(id));
    }

    const handleOnclickEdit = (data)=> {
        setOpenDialog({
            ...openDialog,
            open: true,
            user: data            
        })
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
                        {listUsersPaging.map((row) => (
                            <TableRow
                                key={row.maKhachHang}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell>
                                    <img
                                        alt={row.tenDangNhap}
                                        src={row.anhDaiDien}
                                        width="80px"
                                        height="80px"
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.maKhachHang}
                                </TableCell>
                                <TableCell>{row.tenDangNhap}</TableCell>
                                
                                <TableCell>{row.ten}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.diaChi}</TableCell>
                                <TableCell>{row.sdt}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.isAdmin}
                                        color="warning"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Delete User" arrow>
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
                                    <Tooltip title="Edit User" arrow>
                                        <IconButton
                                            onClick={() => handleOnclickEdit(row)}
                                            className={classes.iconButton}
                                            style={{
                                                backgroundColor: "rgb(206, 147, 216)",
                                            }}
                                        >
                                            <ModeEditOutlinedIcon className={classes.icon} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="User Detail" arrow>
                                        <IconButton
                                            onClick={() => handleOnclickDetail(row.maKhachHang)}
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
