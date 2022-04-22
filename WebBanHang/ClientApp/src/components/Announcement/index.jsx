import React from "react";
import { styled } from "@mui/styles";
//import { makeStyles } from '@mui/material/styles';

const Container = styled('div')(({ displayAnnouncement }) => ({
    //position: "absolute",
    //top: 0,
    //left: 0,
    position: "relative",
    width: "100%",
    padding: 5,
    fontFamily: "'Urbanist', sans- serif !important",
    backgroundColor: "#aeb4ff",
    
    "& p": {
        margin: 0,
        color: "#fff",
        textAlign: "center",
        fontFamily: "'Urbanist', sans- serif !important",
    }
}))




const Announcement = () => {
    

    return (
        <Container>
            <p>Supper Deal! Free Shipping on Order over 1,000,000 vnd</p>
        </Container>
        
        )
}

export default Announcement;