import React from 'react';
import {DataGrid} from "@material-ui/data-grid";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    filmBox: {
        marginTop: theme.spacing(3)
    },
    filmsGrid: {
        backgroundColor: 'white',
    }
}))

const SecondStep = () => {
    const classes = useStyles()

    return (
        <Box className={classes.filmBox}>
            <div style={{ height: 250, width: '100%' }}>
                <DataGrid
                    className={classes.filmsGrid}
                    columns={[{ field: 'username' }, { field: 'age' }]}
                    rows={[
                        {
                            id: 1,
                            username: '@MaterialUI',
                            age: 20,
                        },
                    ]}
                />
            </div>
        </Box>
    );
};

export default SecondStep;
