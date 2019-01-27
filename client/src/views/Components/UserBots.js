import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';

export default class UserBots extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <Col xs="12" sm="8" lg="9">
        <Card>
          <CardHeader>
            Manage your bots
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </CardBody>
        </Card>
      </Col>
    );
  }
}