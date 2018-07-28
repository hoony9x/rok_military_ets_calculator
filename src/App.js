import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Grid,
  Paper,
  Hidden,
  Typography,
  TextField,
  Button,
  Divider
} from '@material-ui/core';

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

const types = [
  {
    name: '선택하세요',
    id: 'NONE'
  },
  {
    name: '육군/해병대/의무경찰/상근예비역',
    id: 'ARMY'
  },
  {
    name: '해군/의무해양경찰/의무소방',
    id: 'NAVY'
  },
  {
    name: '공군',
    id: 'AIR_FORCE'
  },
  {
    name: '사회복무요원',
    id: 'REPLACE_NORMAL'
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'NONE',
      enrollment_date: new Date(),
      ets_date: null
    };
  }

  handleTypeChange = (e) => {
    e.preventDefault();

    this.setState({
      type: e.target.value
    });
  };

  handleDateChange = (e) => {
    e.preventDefault();

    const info = (e.target.value).split("-");

    const year = parseInt(info[0], 10);
    const month = parseInt(info[1], 10) - 1;
    const date = parseInt(info[2], 10);

    const enrollment_date = new Date(year, month, date);
    this.setState({
      enrollment_date: enrollment_date
    });
  };

  displayDate = (dateObj) => {
    let year = (dateObj.getFullYear()).toString();
    let month = (dateObj.getMonth() + 1).toString();
    let date = (dateObj.getDate()).toString();

    if(month.length !== 2) {
      month = "0" + month;
    }

    if(date.length !== 2) {
      date = "0" + date;
    }

    return year + "-" + month + "-" + date;
  };

  displayETSDate = () => {
    const year = (this.state.ets_date.getFullYear()).toString();
    const month = (this.state.ets_date.getMonth() + 1).toString();
    const date = (this.state.ets_date.getDate()).toString();

    let day = "?";
    switch(this.state.ets_date.getDay()) {
      case 0:
        day = "일";
        break;

      case 1:
        day = "월";
        break;

      case 2:
        day = "화";
        break;

      case 3:
        day = "수";
        break;

      case 4:
        day = "목";
        break;

      case 5:
        day = "금";
        break;

      case 6:
        day = "토";
        break;
    }

    return year + "년 " + month + "월 " + date + "일 " + day + "요일";
  };

  isLeapYear = (year) => {
    if(year % 400 === 0) {
      return true;
    }

    if(year % 4 === 0 && year % 100 !== 0) {
      return true;
    }

    return false;
  };

  calculateETS = (e) => {
    e.preventDefault();

    if(this.state.type === 'NONE') {
      alert("소속을 선택해 주세요!");
      return;
    }

    const year = this.state.enrollment_date.getFullYear();
    const month = this.state.enrollment_date.getMonth() + 1;
    const date = this.state.enrollment_date.getDate();

    let ets_date = null;
    switch(this.state.type) {
      case 'ARMY':
        ets_date = this.calcForArmy(year, month, date);
        break;

      case 'NAVY':
        ets_date = this.calcForNavy(year, month, date);
        break;

      case 'AIR_FORCE':
        ets_date = this.calcForAirForce(year, month, date);
        break;

      case 'REPLACE_NORMAL':
        ets_date = this.calcForReplaceNormal();
        break;
    }

    this.setState({
      ets_date: ets_date
    });
  };

  calcForArmy = (year, month, date) => {
    year += 1;
    month += 9;
    date -= 1;

    if(date === 0) {
      date += 31;
      month -= 1;
    }

    if(month > 12) {
      month -= 12;
      year += 1;
    }

    switch(month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        if(date > 31) {
          date = 31;
        }
        break;

      case 4: case 6: case 9: case 11:
        if(date > 30) {
          date = 30;
        }
        break;

      case 2:
        if(this.isLeapYear(year) === true) {
          if(date > 29) {
            date = 29;
          }
        }
        else {
          if(date > 28) {
            date = 28;
          }
        }
    }

    month -= 1;
    return new Date(year, month, date);
  };

  calcForNavy = () => {

  };

  calcForAirForce = () => {

  };

  calcForReplaceNormal = () => {

  };

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

                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    select
                    label="소속"
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="소속을 선택해 주세요"
                    margin="normal"
                    fullWidth
                  >
                    {types.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    label="입대일"
                    value={this.displayDate(this.state.enrollment_date)}
                    onChange={this.handleDateChange}
                    type="date"
                    helperText="입대일을 선택해 주세요"
                    margin="normal"
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.calculateETS}
                    fullWidth
                  >
                    계산!
                  </Button>
                </form>

                <br/>
                <Divider />
                <br/>

                {this.state.ets_date !== null &&
                <Typography gutterBottom noWrap>
                  전역 일자는 {this.displayETSDate()} 입니다.
                </Typography>
                }

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
