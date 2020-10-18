import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, ButtonBase, Typography, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import OvalSmall from '../../assets/images/Oval-small.png';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    pricingPlanMenuItem: {
        color: "white",
        marginRight: 25,
        marginTop: 10,
        '&:focus': {
            outline: "none !important"
        }
    },
    rightSideMenuIcon: {
        '&:focus': {
            outline: "none !important"
        },
        color: "white"
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
const Header = props => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Box>
            <Grid container alignItems="center">
                <Grid container item md={3} xs={3}>
                    <Box m={3}>
                        <a href="/">
                        <img
                            src={Logo}
                            className={classes.headerLogo}
                            alt="Logo"
                        />
                        </a>
                    </Box>
                </Grid>
                <Grid className={classes.headerBalanceContainer} container item md={4} sm={false} xs={false}></Grid>
                <Grid container item md={5} sm={9} xs={9} alignItems="center" justify="flex-end">
                    <Box className={classes.rightSideMenuContainer} mr={4}>
                        <IconButton className={classes.rightSideMenuIcon} onClick={() => props.navHandler()}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Grid container alignItems="center" className={classes.rightSideNavContainer}>
                        <Grid item xs={6} className={classes.pricingPlanMenuContainer}>
                            <Grid container>
                                <ButtonBase
                                    onClick={() => history.push("/Pricing")}
                                    className={classes.pricingPlanMenuItem}>
                                    <Typography className={classes.pricingPlanMenuItemTitle}>Pricing</Typography>
                                </ButtonBase>
                                <ButtonBase
                                    onClick={() => history.push("/developers")}
                                    className={classes.pricingPlanMenuItem}>
                                    <Typography className={classes.pricingPlanMenuItemTitle}>Developer</Typography>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} className={classes.pricingPlanMenuContainer}>
                            <Grid container>
                                <ButtonBase
                                    onClick={() => history.push("/register")}
                                    className={classes.pricingPlanMenuItem}>
                                    <Typography className={classes.pricingPlanMenuItemTitle}>Sign Up</Typography>
                                </ButtonBase>
                                <ButtonBase
                                    onClick={() => history.push("/login")}
                                    className={`${classes.pricingPlanMenuItem} ${classes.pricingPlanSignUpButton}`}>
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

export default Header;