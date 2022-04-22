import React from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    root: {
        backgroundColor: "#f1f0f1 !important",
    },
    footerContainer: {
        marginBottom: 5,
        padding: "20px 5px",
        "&.MuiContainer-maxWidthXl": {
            maxWidth: 1310,
        }
    },
    inforFooter: {
        "& h5": {
            fontWeight: "bold"
        },
        "& p": {
            marginBottom: 0
        },
        "& img": {
            //marginTop: 15,
            width: 300,
            height: 113
        },
        "& ul": {
            padding: "15px 0px"
        },
        "& li": {
            listStyle: "none",
            fontWeight: "bold",
            color: "#0655a6"
        }

    },
    storeSystemFooter: {
        "& p": {
            marginBottom: 0,
            fontSize: 14
        },
        "& h5": {
            fontWeight: "bold",
            color: "#0655a6"
        },
        "& span": {
            color: "#0655a6",
            cursor: "pointer"
        }
    },
    fanpageFooter: {
        "& p": {
            marginBottom: 0
        },
        "& ul": {
            padding: "15px 0px"
        },
        "& li": {
            listStyle: "none",
            fontWeight: "bold",
            color: "#0655a6"
        }
    }
})

const MainFooter = () => {
    const classes = useStyles();

    return (
        <>
            <div className={ classes.root}>
                <Container maxWidth="xl" className={ classes.footerContainer}>
                    <Grid container>
                        <Grid item md={4} className={ classes.inforFooter}>
                            <div>
                                <h5>CÔNG TY TNHH THƯƠNG MẠI GEARVN</h5>
                                <h5>EMAIL: CSKH@GEARVN.COM</h5>
                                <h6><b>HỆ THỐNG TỔNG ĐÀI MIỄN PHÍ:</b> (Làm việc từ 08h00 - 20h00)</h6>

                                <p>Gọi mua hàng	1800 6975</p>
                                <p>Gọi mua hàng	1800 6975</p>

                                <ul>
                                    <li>Chính sách bảo hành</li>
                                    <li>Chính sách bảo hành</li>
                                    <li>Chính sách bảo hành</li>
                                    <li>Chính sách bảo hành</li>
                                </ul>

                                <img src="https://theme.hstatic.net/1000026716/1000440777/14/20150827110756-dathongbao.png" alt="da-thong-bao-bo-cong-thuong" />
                            </div>
                        </Grid>
                        <Grid item md={5} className={classes.storeSystemFooter}>
                            <h5>HỆ THỐNG CỬA HÀNG</h5>
                            <h6><b>SHOWROOM HCM:</b> (Làm việc từ 08h00 - 20h00)</h6>
                            <p>- Địa chỉ 1: 78-80-82 Hoàng Hoa Thám, Phường 12, Quận Tân Bình.</p>
                            <p>- Địa chỉ 2: 905 Kha Vạn Cân, Phường Linh Tây, Thành phố Thủ Đức.</p>
                            <p>- Địa chỉ 3: 1081 - 1083 Trần Hưng Đạo, Phường 5, Quận 5.</p>
                            <h6><b>SHOWROOM HN:</b> (Làm việc từ 08h00 - 20h00)</h6>
                            <p>- Địa chỉ : 37 Ngõ 121 Thái Hà, Phường Trung Liệt, Quận Đống Đa.</p>
                            <p>- Địa chỉ 1: 78-80-82 Hoàng Hoa Thám, Phường 12, Quận Tân Bình.</p>
                            <div style={{margin: "15px 0"}}>
                                <p>Mua <span>PC Gaming, laptop gaming, card màn hình, màn hình máy tính, ghế gaming, thiết bị chơi game</span> như PS5 hàng đầu Việt Nam bảo hành chính hãng. Mua online nhận nhiều ưu đãi hấp dẫn.</p>
                            </div>
                            <p>- Công ty TNHH Thương Mại Gearvn</p>
                            <p>- GPKD số 0316517394 do Sở KH và ĐT TP Hồ Chí Minh cấp ngày 01/10/2020</p>
                            <p>- GĐ/Sở hữu website: Nguyễn Thế Anh</p>
                            
                        </Grid>
                        <Grid item md={3} className={classes.fanpageFooter}>
                            <p>Gọi mua hàng	1800 6975</p>
                            <p>Gọi mua hàng	1800 6975</p>

                            <ul>
                                <li>Chính sách bảo hành</li>
                                <li>Chính sách bảo hành</li>
                                <li>Chính sách bảo hành</li>
                                <li>Chính sách bảo hành</li>
                            </ul>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
        )
}

export default MainFooter;