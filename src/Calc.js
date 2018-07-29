import React  from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
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
  },
  {
    name: '산업기능요원 (보충역)',
    id: 'REPLACE_UNDERGRADUATE_GROUP_2'
  }
];

class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'NONE',
      enrollment_date: new Date(),
      ets_date: null,
      completed_rate: 0,
      remaining_fucking_date: 0,
      total_fucking_date: 0
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

      default:
        day = "?";
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

    switch(this.state.type) {
      case 'ARMY':
        this.calcForArmy();
        break;

      case 'NAVY':
        this.calcForNavy();
        break;

      case 'AIR_FORCE':
        this.calcForAirForce();
        break;

      case 'REPLACE_NORMAL':
        this.calcForReplaceNormal();
        break;

      case 'REPLACE_UNDERGRADUATE_GROUP_2':
        this.calcForReplaceUndergraduateGroup2();
        break;

      default:
        break;
    }
  };

  calcForArmy = () => {
    const shortening_start_date = new Date(2017, 0, 3); // 2017년 1월 3일

    let year = this.state.enrollment_date.getFullYear();
    let month = this.state.enrollment_date.getMonth() + 1;
    let date = this.state.enrollment_date.getDate();

    const shortening_start_unix_time = (shortening_start_date).getTime() / 1000;
    const enroll_unix_time = (this.state.enrollment_date).getTime() / 1000;

    let diff = Math.floor((enroll_unix_time - shortening_start_unix_time) / 86400);
    let decreased_date = 0;
    if(diff >= 0) {
      decreased_date = Math.floor(diff / 14) + 1;
    }

    year += 1;
    date -= 1;

    if(decreased_date > 90) {
      month += 6;
    }
    else {
      month += 9;
    }

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
        break;

      default:
        break;
    }

    month -= 1;
    let ets_date = new Date(year, month, date);

    if(decreased_date <= 90) {
      ets_date = new Date(ets_date.getTime() - 86400 * decreased_date * 1000);
    }

    const total = ets_date.getTime() - this.state.enrollment_date.getTime();
    const current = (new Date()).getTime() - this.state.enrollment_date.getTime();
    const remain = ets_date.getTime() - (new Date()).getTime();

    let rate = Math.round(current / total * 100);
    let remaining_fucking_date = Math.ceil(remain / (1000 * 86400));
    let total_fucking_date = Math.ceil(total / (1000 * 86400));

    if(remaining_fucking_date > total_fucking_date) {
      remaining_fucking_date = total_fucking_date;
    }

    if(remaining_fucking_date < 0) {
      remaining_fucking_date = 0;
    }

    if(rate > 100) {
      rate = 100;
    }

    if(rate < 0) {
      rate = 0;
    }

    this.setState({
      ets_date: ets_date,
      completed_rate: rate,
      remaining_fucking_date: remaining_fucking_date,
      total_fucking_date: total_fucking_date
    });
  };

  calcForNavy = () => {
    const shortening_start_date = new Date(2016, 10, 3); // 2017년 11월 3일

    let year = this.state.enrollment_date.getFullYear();
    let month = this.state.enrollment_date.getMonth() + 1;
    let date = this.state.enrollment_date.getDate();

    const shortening_start_unix_time = (shortening_start_date).getTime() / 1000;
    const enroll_unix_time = (this.state.enrollment_date).getTime() / 1000;

    let diff = Math.floor((enroll_unix_time - shortening_start_unix_time) / 86400);
    let decreased_date = 0;
    if(diff >= 0) {
      decreased_date = Math.floor(diff / 14) + 1;
    }

    year += 1;
    date -= 1;

    if(decreased_date > 90) {
      month += 8;
    }
    else {
      month += 11;
    }

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
        break;

      default:
        break;
    }

    month -= 1;
    let ets_date = new Date(year, month, date);

    if(decreased_date <= 90) {
      ets_date = new Date(ets_date.getTime() - 86400 * decreased_date * 1000);
    }

    const total = ets_date.getTime() - this.state.enrollment_date.getTime();
    const current = (new Date()).getTime() - this.state.enrollment_date.getTime();
    const remain = ets_date.getTime() - (new Date()).getTime();

    let rate = Math.round(current / total * 100);
    let remaining_fucking_date = Math.ceil(remain / (1000 * 86400));
    let total_fucking_date = Math.ceil(total / (1000 * 86400));

    if(remaining_fucking_date > total_fucking_date) {
      remaining_fucking_date = total_fucking_date;
    }

    if(remaining_fucking_date < 0) {
      remaining_fucking_date = 0;
    }

    if(rate > 100) {
      rate = 100;
    }

    if(rate < 0) {
      rate = 0;
    }

    this.setState({
      ets_date: ets_date,
      completed_rate: rate,
      remaining_fucking_date: remaining_fucking_date,
      total_fucking_date: total_fucking_date
    });
  };

  calcForAirForce = () => {
    const shortening_start_date = new Date(2016, 9, 3); // 2016년 10월 3일

    let year = this.state.enrollment_date.getFullYear();
    let month = this.state.enrollment_date.getMonth() + 1;
    let date = this.state.enrollment_date.getDate();

    const shortening_start_unix_time = (shortening_start_date).getTime() / 1000;
    const enroll_unix_time = (this.state.enrollment_date).getTime() / 1000;

    let diff = Math.floor((enroll_unix_time - shortening_start_unix_time) / 86400);
    let decreased_date = 0;
    if(diff >= 0) {
      decreased_date = Math.floor(diff / 14) + 1;
    }

    year += 2;
    date -= 1;

    if(decreased_date > 60) {
      year -= 1;
      month += 10;
    }

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
        break;

      default:
        break;
    }

    month -= 1;
    let ets_date = new Date(year, month, date);

    if(decreased_date <= 60) {
      ets_date = new Date(ets_date.getTime() - 86400 * decreased_date * 1000);
    }

    const total = ets_date.getTime() - this.state.enrollment_date.getTime();
    const current = (new Date()).getTime() - this.state.enrollment_date.getTime();
    const remain = ets_date.getTime() - (new Date()).getTime();

    let rate = Math.round(current / total * 100);
    let remaining_fucking_date = Math.ceil(remain / (1000 * 86400));
    let total_fucking_date = Math.ceil(total / (1000 * 86400));

    if(remaining_fucking_date > total_fucking_date) {
      remaining_fucking_date = total_fucking_date;
    }

    if(remaining_fucking_date < 0) {
      remaining_fucking_date = 0;
    }

    if(rate > 100) {
      rate = 100;
    }

    if(rate < 0) {
      rate = 0;
    }

    this.setState({
      ets_date: ets_date,
      completed_rate: rate,
      remaining_fucking_date: remaining_fucking_date,
      total_fucking_date: total_fucking_date
    });
  };

  calcForReplaceNormal = () => {
    const shortening_start_date = new Date(2016, 9, 3); // 2016년 10월 3일

    let year = this.state.enrollment_date.getFullYear();
    let month = this.state.enrollment_date.getMonth() + 1;
    let date = this.state.enrollment_date.getDate();

    const shortening_start_unix_time = (shortening_start_date).getTime() / 1000;
    const enroll_unix_time = (this.state.enrollment_date).getTime() / 1000;

    let diff = Math.floor((enroll_unix_time - shortening_start_unix_time) / 86400);
    let decreased_date = 0;
    if(diff >= 0) {
      decreased_date = Math.floor(diff / 14) + 1;
    }

    year += 2;
    date -= 1;

    if(decreased_date > 90) {
      year -= 1;
      month += 9;
    }

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
        break;

      default:
        break;
    }

    month -= 1;
    let ets_date = new Date(year, month, date);

    if(decreased_date <= 90) {
      ets_date = new Date(ets_date.getTime() - 86400 * decreased_date * 1000);
    }

    const total = ets_date.getTime() - this.state.enrollment_date.getTime();
    const current = (new Date()).getTime() - this.state.enrollment_date.getTime();
    const remain = ets_date.getTime() - (new Date()).getTime();

    let rate = Math.round(current / total * 100);
    let remaining_fucking_date = Math.ceil(remain / (1000 * 86400));
    let total_fucking_date = Math.ceil(total / (1000 * 86400));

    if(remaining_fucking_date > total_fucking_date) {
      remaining_fucking_date = total_fucking_date;
    }

    if(remaining_fucking_date < 0) {
      remaining_fucking_date = 0;
    }

    if(rate > 100) {
      rate = 100;
    }

    if(rate < 0) {
      rate = 0;
    }

    this.setState({
      ets_date: ets_date,
      completed_rate: rate,
      remaining_fucking_date: remaining_fucking_date,
      total_fucking_date: total_fucking_date
    });
  };

  calcForReplaceUndergraduateGroup2 = () => {
    const shortening_start_date = new Date(2016, 7, 3); // 2016년 8월 3일

    let year = this.state.enrollment_date.getFullYear();
    let month = this.state.enrollment_date.getMonth() + 1;
    let date = this.state.enrollment_date.getDate();

    const shortening_start_unix_time = (shortening_start_date).getTime() / 1000;
    const enroll_unix_time = (this.state.enrollment_date).getTime() / 1000;

    let diff = Math.floor((enroll_unix_time - shortening_start_unix_time) / 86400);
    let decreased_date = 0;
    if(diff >= 0) {
      decreased_date = Math.floor(diff / 14) + 1;
    }

    year += 2;
    date -= 1;

    if(decreased_date > 90) {
      month += 11;
    }
    else {
      year += 1;
      month += 2;
    }

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
        break;

      default:
        break;
    }

    month -= 1;
    let ets_date = new Date(year, month, date);

    if(decreased_date <= 90) {
      ets_date = new Date(ets_date.getTime() - 86400 * decreased_date * 1000);
    }

    const total = ets_date.getTime() - this.state.enrollment_date.getTime();
    const current = (new Date()).getTime() - this.state.enrollment_date.getTime();
    const remain = ets_date.getTime() - (new Date()).getTime();

    let rate = Math.round(current / total * 100);
    let remaining_fucking_date = Math.ceil(remain / (1000 * 86400));
    let total_fucking_date = Math.ceil(total / (1000 * 86400));

    if(remaining_fucking_date > total_fucking_date) {
      remaining_fucking_date = total_fucking_date;
    }

    if(remaining_fucking_date < 0) {
      remaining_fucking_date = 0;
    }

    if(rate > 100) {
      rate = 100;
    }

    if(rate < 0) {
      rate = 0;
    }

    this.setState({
      ets_date: ets_date,
      completed_rate: rate,
      remaining_fucking_date: remaining_fucking_date,
      total_fucking_date: total_fucking_date
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
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
        <React.Fragment>
          <Typography gutterBottom noWrap>
            전역일은 {this.displayETSDate()} 입니다.
          </Typography>

          <Typography gutterBottom noWrap>
            총 복무일 {this.state.total_fucking_date}일 중 남은 복무일은 {this.state.remaining_fucking_date}일 입니다.
          </Typography>

          <Typography gutterBottom noWrap>
            ({this.state.completed_rate}% 완료)
          </Typography>

          <br/>

          <Typography variant="caption" gutterBottom align="center">
            본 계산 결과는 정확하지 않을 수 있으며 행정효력이 없습니다.
          </Typography>
        </React.Fragment>
        }

        <Typography variant="caption" gutterBottom align="center">
          오류 제보나 기타 건의사항은 아래 댓글 창 또는 kordreamfollower@gmail.com 을 통해 문의 바랍니다.
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Calc);