import React, { Component } from 'react';
import { Card, CardBody, Col, Table, Badge } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import uuidv1 from 'uuid/v1';

import { smile, textToSmile } from '../../func/func';

export default class UserBots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {
        follow: 'Disabled',
        like: 'Disabled',
        comment: 'Disabled',
        direct: 'Disabled'
      }
    }
  }

  switchPressed(key) {
    // TRUE - switch on || FALSE - off
    const activate = this.props.bots[key] === null ? true : false;
    console.log('Activate', activate);

    // Displaying Pending status
    this.setState({
      status: {
        ...this.state.status,
        [key]: 'Pending'
      }
    });

    this.props.manageBot(key, activate)
    .then(() => {
      this.setState({
        status: {
          ...this.state.status,
          [key]: activate ? 'Running' : 'Disabled'
        }
      })
    })

  }

  renderRows(bots) {
    function keyToText(key) {
      switch(key) {
        case 'follow': return 'Follows';
        case 'like': return 'Likes';
        case 'comment': return 'Comments';
        case 'direct': return 'Direct';
        default: return 'Undef bot';
      }
    }

    function statusToColor(status) {
      switch(status) {
        case 'Disabled': return 'secondary';
        case 'Pending': return 'warning';
        case 'Running': return 'success';
        default: return 'secondary';
      }
    }

    // function status(key, value) {
    //   console.log(this);
    // }

    return Object.keys(bots).map((key, i) => {
      // status.call(this, key, bots[key]);
      const status = this.state.status[key];
      return (
        <tr key={uuidv1()}>
          <td style={i === 0 ? {borderTop: 0} : null}>
            {smile(textToSmile(key))}{keyToText(key)}
          </td>
          <td style={i === 0 ? {borderTop: 0} : null}>
            <Badge color={statusToColor(status)}>{status}</Badge>
          </td>
          <td className="text-center" style={i === 0 ? {borderTop: 0} : null}>
            <AppSwitch 
              className={'mx-1'} variant={'pill'} 
              color={'success'} 
              checked={this.props.bots[key] !== null ? true : false}
              onChange={() => this.switchPressed(key)}
              disabled={this.state.status[key] === 'Pending' ? true : false}
            />
          </td>
        </tr>
      );
    });
  }

  render() {
    const { bots } = this.props;
    return (
      <Col xs="12" sm="8" lg="9">
        <Card>
          <CardBody className="pt-2 pb-0">
            <Table responsive size="sm">
              <tbody>
                {bots !== undefined ? this.renderRows(bots) : null}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}