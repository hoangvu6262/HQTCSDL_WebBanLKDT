import React, {useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, CardActions, IconButton } from '@mui/material';
import { styled, makeStyles } from '@mui/styles';
import Label from './Label';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

const useStyles = makeStyles({
    card: {
        borderRadius: "0px !important",
        border: "2px solid #ddcece",
        //boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px !important',
    },
    cardAction: {
        display: "flex",
        justifyContent: "flex-end"
    },
    stackContent: {
        paddingTop: "7px !important",
        paddingBottom: "0px !important",
        

    },
    routerlink: {
        "&:hover": {
            listStyle: "none",
            textDecoration: "none !important",
            color: "#000",
        }
    },
    link: {
        fontWeight: "700 !important",
        fontSize: "15px !important",
        fontFamily: "'Urbanist', sans- serif !important",
        
    },
    price: {
        marginTop: "5px !important",
        color: "red",
        fontFamily: "'Urbanist', sans- serif !important",
    }
})


export default function ShopProductCard({ product, onClickAddToCard }) {
    const {maSp, tenSp, hinhAnh, donGia, soLuongCon } = product;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <Label
                    variant="filled"
                    color={soLuongCon === 0 ? 'error' : 'info'}
                    sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase'
                    }}
                >
                    {soLuongCon === 0 ? 'sold out' : 'new'}
                </Label>
                <ProductImgStyle alt={tenSp} src={hinhAnh} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }} className={classes.stackContent}>
                <Link to={`/product-detail&product-id=${maSp}`} color="inherit" underline="hover" component={RouterLink} className={classes.routerlink}>
                    <Typography variant="subtitle2" noWrap className={classes.link}>
                        {tenSp}
                    </Typography>
                </Link>

                <Typography variant="subtitle1" className={classes.price}>
                    {parseInt(donGia).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </Typography>
            </Stack>
            <CardActions className={classes.cardAction}>
                <IconButton onClick={() => onClickAddToCard({
                    maSp,
                    tenSp,
                    hinhAnh,
                    soLuong: 1,
                    donGia,
                    total: donGia
                })}
                    disabled={soLuongCon === 0 ?? true}
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}