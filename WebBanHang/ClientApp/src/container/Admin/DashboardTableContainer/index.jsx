import React, { useEffect } from "react";
import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Switch } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUserPaging } from "../../../redux/actions/user.action";
import { GetBillsPaging } from "../../../redux/actions/bill.action";

const StyledTableCell = styled(TableCell)({
    
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(23, 58, 94)",
        color: "#fff",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
});

const CustomGridContainer = styled(Grid)({
    paddingBottom: 30
})

const CustomTableContainer = styled(TableContainer)({
    border: "1px solid #f1f0f1",
})


const headerNameUser = [
    { id: 1, name: "" },
    { id: 2, name: "Mã KH" },
    { id: 3, name: "Tên DN" },
    { id: 4, name: "Email" },
    { id: 8, name: "Admin" },
];


const headerNameBill = [
    { id: 1, name: "Mã HD" },
    { id: 2, name: "Tên KH" },
    { id: 3, name: "Tổng" },
    { id: 5, name: "Cập Nhật" },
    { id: 6, name: "Tình Trạng" },
];

const DashboardTableContainer = () => {
    const dispath = useDispatch();
    const { listUsersPaging } = useSelector(state => state.user)
    const { listBillsPaging } = useSelector(state => state.bill)


    useEffect(() => {
        dispath(GetBillsPaging(1,5));
        dispath(GetAllUserPaging(1, 5));
    }, [])

    const renderStatus = (status) => {
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
            <CustomGridContainer container spacing={ 3}>
                <Grid item md={6} xs={12}>
                    <CustomTableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {headerNameUser.map((header) => {
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
                                            <Avatar
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

                                        
                                        <TableCell>{row.email}</TableCell>
                                        
                                        <TableCell>
                                            <Switch
                                                checked={row.isAdmin}
                                                color="warning"
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CustomTableContainer>
                </Grid>
                <Grid item md={6} xs={12}>
                    <CustomTableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {headerNameBill.map((header) => {
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
                                        <TableCell>{row.capNhat}</TableCell>
                                        <TableCell>{renderStatus(row.tinhTrang)}</TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CustomTableContainer>
                </Grid>
            </CustomGridContainer>
        </>
        )
}

export default DashboardTableContainer;