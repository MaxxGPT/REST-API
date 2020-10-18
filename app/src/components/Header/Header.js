import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, ButtonBase, Typography, IconButton } from '@material-ui/core';

import Logo from '../../assets/images/logo.png';
import Oval from '../../assets/images/Oval.png';
import Oval1 from '../../assets/images/Oval-1.png';
import OvalSmall from '../../assets/images/Oval-small.png';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    pricingPlanMenuItem: {
        color: "white",
        marginRight: 25,
        marginTop: 10,
    },
    pricingPlanMenuItemTitle: {
        fontSize: 18
    },
    pricingPlanSignUpButton: {
        background: "#FDBC2A",
        borderRadius: 10,
        minWidth: 100,
        minHeight: 40
    },
    pricingPlanSignUpButtonTitle: {
        color: "#000000",
        fontWeight: "bold"
    },
    pricingPlanHeaderOval: {
        position: "absolute",
        top: 0,
        left: 0,
        [theme.breakpoints.down("xs")]: {
            width: 150,
        }
    },
    headerLogo: {
        [theme.breakpoints.down("xs")]: {
            width: 100,
        }
    },
    pricingPlanHeaderOvalSmall: {
        position: "absolute",
        top: 150,
        right: 220,
        [theme.breakpoints.down("xs")]: {
            top: 50,
            right: 50,
        }
    },
    rightSideNavContainer: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    rightSideMenuContainer: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        }
    },
    headerBalanceContainer: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }

}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <Box>
            <Grid container alignItems="center">
                <Grid container item xs={3}>
                    <Box m={3}>
                        <img
                            src={Logo}
                            className={classes.headerLogo}
                            alt="Logo"
                        />
                        <img
                            className={classes.pricingPlanHeaderOval}
                            src={Oval1}
                            alt="Oval"
                        />
                        <img
                            className={classes.pricingPlanHeaderOval}
                            src={Oval}
                            alt="Oval 1"
                        />
                    </Box>
                </Grid>
                <Grid className={classes.headerBalanceContainer} container item sm={false} xs={false}></Grid>
                <Grid container item sm={9} xs={9} alignItems="center" justify="flex-end">
                    <Box className={classes.rightSideMenuContainer} mr={4}>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Grid container alignItems="center" className={classes.rightSideNavContainer}>
                        <Grid item xs={6} className={classes.pricingPlanMenuContainer}>
                            <Grid container>
                                <ButtonBase className={classes.pricingPlanMenuItem}>
                                    <Typography className={classes.pricingPlanMenuItemTitle}>Pricing</Typography>
                                </ButtonBase>
                                <ButtonBase className={classes.pricingPlanMenuItem}>
                                    <Typography className={classes.pricingPlanMenuItemTitle}>Developer</Typography>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} className={classes.pricingPlanMenuContainer}>
                            <Grid container>
                                <ButtonBase className={classes.pricingPlanMenuItem}>
                                    <Typography className={classes.pricingPlanMenuItemTitle}>Sign Up</Typography>
                                </ButtonBase>
                                <ButtonBase className={`${classes.pricingPlanMenuItem} ${classes.pricingPlanSignUpButton}`}>
                                    <Typography className={classes.pricingPlanSignUpButtonTitle}>Sign In</Typography>
                                </ButtonBase>
                            </Grid>
                            <img
                                className={classes.pricingPlanHeaderOvalSmall}
                                src={OvalSmall}
                                alt="Oval Small Right"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    );
}