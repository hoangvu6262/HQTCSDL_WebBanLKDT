import React from "react";
import { makeStyles } from "@mui/styles";


const useStyle = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        paddingBottom: 10
    },
    img: {
        maxWidth: "100%",
        maxHeight: "184px",
    }
})

const PosterCard = (props) => {
    const classes = useStyle();
    const { hef, imgSrc } = props;

    return (
        <a hef={hef} className={classes.root}>
            <img src={imgSrc} alt="" className={ classes.img} />
        </a>
    );
}

export default PosterCard;