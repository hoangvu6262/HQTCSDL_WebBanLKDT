import React from "react";
import { styled } from "@mui/styles"

const CustomContainer = styled('div')({
    height: "369,7px !important"
})

const CustomImg = styled('img')({
    height: "369,7px"
})

const HomeCarousel = () => {
    return (
        <CustomContainer>
            <CustomContainer id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <CustomImg src="https://theme.hstatic.net/1000026716/1000440777/14/slideshow_1.jpg?v=22853" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <CustomImg src="https://theme.hstatic.net/1000026716/1000440777/14/slideshow_4.jpg?v=22853" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <CustomImg src="https://theme.hstatic.net/1000026716/1000440777/14/slideshow_5.jpg?v=22853" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-target="#carouselExampleFade" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-target="#carouselExampleFade" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
            </CustomContainer>
        </CustomContainer>
    );
}

export default HomeCarousel;