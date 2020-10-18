import React from 'react';
import { Grid, Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

//ICONS
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';


const useStyles = makeStyles(theme => ({
    cardContainer: {
        border: "1px solid lightgrey",
        borderRadius: 12,
    },
    cardTitltContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    cardFooterContainer: {
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    cardMainDescription: {
        marginBottom: 3
    },
    cardNumOfRules: {
        color: '#919294x',
        marginRight: 3
    },
    cardTitle: {
        padding: 4,
        margin: 5,
        color: "white"
    }
}));

const Card = props => {
    const classes = useStyles();
    return (
        <Box className={classes.cardContainer} boxShadow={1}>
            <Grid container direction="column">
                <Box bgcolor="#0f183f" pb={3} className={classes.cardTitltContainer}>
                    <Typography variant="subtitle2" className={classes.cardTitle}>naming test action</Typography>
                </Box>
                <Box bgcolor="white" p={1}>
                    <Typography className={classes.cardMainDescription}>
                        If an exception 'bubble up' to our sub-page a sub page, we don't want the process.
                </Typography>
                    <Divider />
                    <Grid container item justify="flex-start">
                        <Typography className={classes.cardNumOfRules}>Number of rules : </Typography>
                        <Typography>3</Typography>
                    </Grid>
                </Box>
                <Box bgcolor="#e8edf3" p={2} className={classes.cardFooterContainer}>
                    <Grid container justify="space-between">
                        <DeleteIcon />
                        <Box>
                            <Grid container item>
                                <Box mr={1}>
                                    <EditIcon />
                                </Box>
                                <VisibilityIcon />
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}

export default Card;