import React from "react";
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
        borderRadius: "10px !important",
        boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px !important',
    },
    cardAction: {
        display: "flex",
        justifyContent: "flex-end"
    }
})


export default function ShopProductCard({ product }) {
    const { tenSp, hinhAnh, donGia } = product;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <Label
                    variant="filled"
                    color='info'
                    sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase'
                    }}
                >
                    New
                </Label>
                <ProductImgStyle alt={tenSp} src={hinhAnh} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {tenSp}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        {parseInt(donGia).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </Typography>
                </Stack>
            </Stack>
            <CardActions className={classes.cardAction}>
                <IconButton>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}