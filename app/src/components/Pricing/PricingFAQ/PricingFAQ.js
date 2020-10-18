import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, ButtonBase } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: "80%",
        margin: "auto",
        marginTop: 24
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: "10px",
        [theme.breakpoints.down("xs")]: {
            fontSize: 15,
            textAlign: "left"
        }
    },
    subHeading: {
        fontSize: 16,
        color: "#999999",
        maxWidth: "50%",
        [theme.breakpoints.down("xs")]: {
            maxWidth: "95%",
            fontSize: 12
        }
    }
}));


const PricingFAQ = props => {
    const classes = useStyles();
    return (
        <Box boxShadow={2} className={classes.container} p={3}>
            <ButtonBase>
                <Typography className={classes.heading}>{props.question}</Typography>
            </ButtonBase>
            <Typography className={classes.subHeading}>{props.answer}</Typography>
        </Box>
    )
}
export default PricingFAQ