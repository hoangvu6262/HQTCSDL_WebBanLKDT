import React, { useEffect } from "react";
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
import { GetBillsPaging, DeleteBill } from '../../../redux/actions/bill.action';
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
    { id: 1, name: "Mã Hóa Đơn" },
    { id: 2, name: "Tên Khách Hàng" },
    { id: 3, name: "Tổng Tiền" },
    { id: 4, name: "Thời Gian" },
    { id: 5, name: "Cập Nhật" },
    { id: 6, name: "Tình Trạng" },
    { id: 7, name: "Actions" },
];


export default function BillTable(props) {
    const classes = useStyles();
    const { openDialog, setOpenDialog } = props;

    

    const { listBillsPaging, totalPage, PageNumber } = useSelector((state) => state.bill);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(GetBillsPaging(1, 5));
    }, [])


    const handleChangePage = (e, value) => {
        dispatch(GetBillsPaging(value, 5));
    }

    const handleOnclickDetail = (id) => {

        history.push(`/admin/bills/billdetail/${id}`);
    }

    const handleOnclickEdit = (id, status, maKhachHang, tongTien) => {
        setOpenDialog({
            open: true,
            isAddBill: false,
            title: "Update Bill",
            maKhachHang: maKhachHang,
            tongTien: tongTien,
            status: status,
            id: id,
        });
    }

    const handleOnclickDelete = (id) => {
        dispatch(DeleteBill(id));
    }

    const renderStatus= (status) => {
        switch (status) {
            case 1:
                return (<Chip color="secondary" size="small" label="Chờ Duyệt" />);
            case 2:
                return (<Chip color="info" size="small" label="Đã Duyệt" />);
            case 3:
                return (<Chip color="warning" size="small" label="Đã Nhận" />);
            case 4:
                return (<Chip color="error" size="small" label="Đã Hủy" />);
            default:
                return (<Chip color="secondary" size="small" label="Chờ Duyệt" />);
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
                        {listBillsPaging.map((row) => (
                            <TableRow
                                key={row.maHoaDon}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.maHoaDon}
                                </TableCell>
                                <TableCell>{row.maKhachHang}</TableCell>
                                <TableCell>{row.tongTien}</TableCell>
                                <TableCell>{row.thoiGian}</TableCell>
                                <TableCell>{row.capNhat}</TableCell>
                                <TableCell>{renderStatus(row.tinhTrang)}</TableCell>
                                <TableCell>
                                    <Tooltip title="Delete Bill" arrow>
                                        <IconButton
                                            onClick={() => handleOnclickDelete(row.maHoaDon)}
                                            className={classes.iconButton}
                                            style={{
                                                backgroundColor: "rgb(235, 0, 20)",
                                            }}
                                        >
                                            <DeleteForeverOutlinedIcon className={classes.icon} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit Bill" arrow>
                                        <IconButton
                                            onClick={() => handleOnclickEdit(row.maHoaDon, row.tinhTrang, row.maKhachHang, row.tongTien)}
                                            className={classes.iconButton}
                                            style={{
                                                backgroundColor: "rgb(206, 147, 216)",
                                            }}
                                        >
                                            <ModeEditOutlinedIcon className={classes.icon} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Bill Detail" arrow>
                                        <IconButton
                                            //onClick={() => handleOnclickDetail(row.maSp)}
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
