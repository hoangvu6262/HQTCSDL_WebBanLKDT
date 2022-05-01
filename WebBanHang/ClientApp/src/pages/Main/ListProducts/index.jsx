import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/styles";
import ListProductsContainer from "../../../container/Main/ListProductsContainer"




const CustomContainer = styled(Container)({
    paddingTop: 15,
    marginBottom: 30,
    "& h2": {
        fontFamily: "'Urbanist', sans- serif !important",
        textAlign: "center"
    },
    "&.MuiContainer-maxWidthXl": {
        maxWidth: 1310,
    }
})



const ListProducts = () => {
    return (
        <>
            <CustomContainer maxWidth="xl">
                <ListProductsContainer />
            </CustomContainer>
        </>
    );
}

export default ListProducts