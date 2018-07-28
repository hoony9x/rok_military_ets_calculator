import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Grid,
  Paper,
  Hidden,
  Typography
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: '25px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container spacing={24} alignItems="center">
            <Hidden xsDown>
              <Grid item md sm />
            </Hidden>
            <Grid item md={6} sm={8} xs>
              <Paper className={classes.paper}>Content</Paper>
            </Grid>
            <Hidden xsDown>
              <Grid item md sm />
            </Hidden>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
