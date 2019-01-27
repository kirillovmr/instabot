import React, { Component } from 'react';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';

export default class UserSettingsTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    }
  }

  toggle(tab) {
    this.setState({
      activeTab: tab,
    });
  }

  render() {
    return (
        <Row>
          <Col className="ml-2">
            <h3>Settings</h3>
            <hr className="mt-0"/>
          </Col>
          <Col xs="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab === '1'}
                  onClick={() => { this.toggle('1'); }}
                >
                  Tab 1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab === '2'}
                  onClick={() => { this.toggle('2'); }}
                >
                  Tab 2
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab === '3'}
                  onClick={() => { this.toggle('3'); }}
                >
                  Tab 3
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <p>1. Hey</p>
              </TabPane>
              <TabPane tabId="2">
                <p>2. Hey</p> 
              </TabPane>
              <TabPane tabId="3">
                <p>3. Hey</p>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
    );
  }
}