import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  p: {
    width: '100%',
  },
  wrapper: {
    height: '400px',
    maxHeight: '90vh',
  },
  captionMargin: {
    margin: '12px',
  },
});

const Loader = ({ classes }) => {
  return (
    <Paper elevation={0} square={true} className={classes.p}>
      <Grid
        alignItems="center"
        container={true}
        direction="column"
        justify="center"
        className={classes.wrapper}
      >
        <CircularProgress />
        <Typography className={classes.captionMargin} variant="title">
          Loading...
        </Typography>
      </Grid>
    </Paper>
  );
};

Loader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
