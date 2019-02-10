import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import theme from './theme';

const styles = () => ({
  wrapper: {
    margin: '0 auto',
    maxWidth: '1024px',
    padding: '20px',
    width: '100%',
  },
});

const Layout = ({ children, classes }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid
        alignItems="center"
        container={true}
        direction="column"
        justify="center"
        className={classes.wrapper}
      >
        <CssBaseline />
        {children}
      </Grid>
    </MuiThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

Layout.defaultProps = {
  children: null,
};

export default withStyles(styles)(Layout);
