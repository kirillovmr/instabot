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

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    console.log(this.state);
    return (
      <div className="animated fadeIn">
        <Row>
          {/* Todo - fetch and display only specified user*/}
          {this.state.user.username ? renderUsers.call(this, {[this.state.user.username]: this.state.user}, false) : null}

          <UserBots />
        </Row>

        <UserSettingsTabs />
      </div>
    )
  }
}
