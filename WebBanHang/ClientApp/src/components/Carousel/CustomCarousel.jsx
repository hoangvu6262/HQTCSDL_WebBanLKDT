import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles } from "@mui/styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        flexGrow: 1,
        "& h2": {
            backgroundColor: "rgb(23, 58, 94)",
            padding: "15px 0",
            fontSize: 20,
            fontWeight: 600,
            color: "",
            fontFamily: "'Dongle', sans- serif",
        }
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        pl: 2
    },
    image: {
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    stepper: {
        
    }
})


const CustomCarousel = (props) => {
    const classes = useStyles();
    const { images } = props;
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 600, flexGrow: 1 }} className={ classes.root}>
            {/*<Paper
                square
                elevation={0}
                sx={classes.paper}
            >
                <h2>Hình ảnh sản phẩm</h2>
            </Paper>*/}
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                
                {images.map((step, index) => (
                    <Paper key={step.id} className={classes.image}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Paper>
                                <Box
                                    component="img"
                                    sx={{
                                        height: 500,
                                        display: 'block',
                                        maxWidth: 600,
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    //className={classes.image}
                                    src={step.imgPath}
                                    alt={step.id}
                                />
                            </Paper>
                            
                        ) : null}
                    </Paper>
                ))}
                
            </AutoPlaySwipeableViews>
            <MobileStepper
                className={classes.stepper}
                //variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        variant="outlined"
                        
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        variant="outlined"
                        
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                    </Button>
                }
            />
        </Box>
    );
}

export default CustomCarousel;