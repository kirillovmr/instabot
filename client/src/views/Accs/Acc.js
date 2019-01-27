import React, { Component } from 'react';
import { Row } from 'reactstrap';

import { renderUsers } from '../Components/UserCard';
import UserSettingsTabs from '../Components/UserSettingsTabs';
import UserBots from '../Components/UserBots';

import { fetchUser } from '../../func/func';

export default class Acc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    fetchUser.call(this, this.props.match.params.id);
  }

  // activate (bot run - TRUE / stop - false)
  manageBot(bot, activate) {
    console.log('Action dispatched');

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        this.setState({
          user: {
            ...this.state.user,
            bots: {
              ...this.state.user.bots,
              [bot]: activate ? 123 : null
            }
          }
        });
        resolve();
      }, 1500);
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
