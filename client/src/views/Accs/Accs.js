import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import { getApi, initialFetch } from '../../func/func';

class Accs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      initialDone: false
    }
  }

  componentWillMount() {
    initialFetch.call(this, getApi());
  }

  render() {
    console.log(this.state);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <p>Text: {this.props.test}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Accs;
