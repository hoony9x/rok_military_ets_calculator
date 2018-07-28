import React  from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Grid,
  Paper,
  Hidden,
  Typography,
  Divider
} from '@material-ui/core';

import Calc from './Calc';
import Disqus from './Disqus';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: '25px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class App extends React.Component {
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
              <Paper className={classes.paper}>
                <Typography variant="title" gutterBottom>
                  대한민국 군대 전역일 계산기
                </Typography>

                <Calc />

                <br/>
                <Divider />
                <br/>

                <Disqus />

                <br/>
                <Divider />
                <br/>

                <Typography variant="caption" gutterBottom align="center">
                  &copy; 2018 한양대학교 한기훈 / 고려대학교 박승준
                </Typography>
              </Paper>
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
