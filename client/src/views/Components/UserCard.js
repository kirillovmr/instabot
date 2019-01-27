import React, { Component, Suspense } from 'react';
import uuidv1 from 'uuid/v1';
import { Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

function smile(value) {
  return <span key={uuidv1()} role="img" aria-label="">{value}</span>
}

function textToSmile(text) {
  switch(text) {
    case 'like':
      return '❤️';
    case 'follow':
      return '👤';
    case 'comment':
      return '💬'
    default:
      return '🙄'
  }
}

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// Returns array of blocks with accounts
export function renderUsers(users) {
  return Object.keys(users).map(username => {
    const user = users[username];
    return (
      <Col xs="12" sm="4" lg="3" key={uuidv1()}>
        <Suspense fallback={this.loading()}>
          <UserCard
            onClick={() => this.props.history.push(`/accs/${username}`)}
            username = {username}
            avatar = {user.avatar}
            initialStats = {user.initialStats}
            currentStats = {user.currentStats}
            bots = {user.bots}
          >
            <div className="chart-wrapper">
              <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
            </div>
          </UserCard>
        </Suspense>
      </Col>
    );
  })
}

export default class UserCard extends Component {

  renderBots(bots) {
    let added = 0;
    const html = Object.keys(bots).map(bot => {
      if (bots[bot] !== null) {
        added += 1;
        return smile(textToSmile(bot));
      }
      return '';
    });
    if(added === 0)
      return "none";
    
    return html;
  }

  render() {
    return (
      <div className="brand-card" onClick={this.props.onClick || null}>
        <div className="brand-card-header" style={{backgroundImage: `url(${this.props.avatar})`}}>
          <p className="widget-username">@{this.props.username}</p>
          {this.props.children}
        </div>
        <div className="brand-card-body">
          <div>
            <div className="text-value">{this.props.currentStats.followers}</div>
            <div className="text-uppercase text-muted small">Followers</div>
            <hr/>
            <div className="text-uppercase text-muted small">Running: {this.renderBots(this.props.bots)}</div>
          </div>
        </div>
      </div>
    );
  }
}
