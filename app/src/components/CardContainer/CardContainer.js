import React from 'react';
import { Box, Grid } from '@material-ui/core';

import Card from './Card/Card';

const CardContainer = props => {

    return (
        <Box m={2}>
            <Grid container spacing={2}>
                <Grid item sm={4}>
                    <Card />
                </Grid>
                <Grid item sm={4}>
                    <Card />
                </Grid>
                <Grid item sm={4}>
                    <Card />
                </Grid>
            </Grid>
        </Box>
    )
}

export default CardContainer;