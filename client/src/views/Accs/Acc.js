import React, { Component } from 'react';
import { Row } from 'reactstrap';

import { renderUsers } from '../Components/UserCard';
import UserSettingsTabs from '../Components/UserSettingsTabs';
import UserBots from '../Components/UserBots';

import { fetchUser, getApi, getHeaders } from '../../func/func';

export default class Acc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    fetchUser(this.props.match.params.id)
    .then(result => {
      this.setState({
        user: result.user
      });
    })
    .catch(result => {
      this.props.history.push('/#');
    })
  }

  // activate (bot run - TRUE / stop - false)
  manageBot(bot, activate) {

    return new Promise((resolve, reject) => {
      fetch(`${getApi()}/bots`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          username: this.state.user.username,
          bot,
          activate
        })
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          this.setState({
            user: {
              ...this.state.user,
              bots: {
                ...this.state.user.bots,
                [bot]: activate ? true : null
              }
            }
          });
        }
        else {
          reject(result.msg);
        }
        resolve();
      })
      .catch(error => alert(error));
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {this.state.user.username ? renderUsers.call(this, {[this.state.user.username]: this.state.user}, false) : null}

          <UserBots 
            bots={this.state.user.bots}
            manageBot={this.manageBot.bind(this)}
          />
        </Row>

        <UserSettingsTabs />
      </div>
    )
  }
}
