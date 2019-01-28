import React, { Component } from 'react';
import { Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';

export default class UserSettingsTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      modal: false
    }
  }

  toggle(tab) {
    this.setState({
      activeTab: tab,
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
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
                  Account
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

                <Button outline onClick={() => this.toggleModal()} color="danger" size="sm" block>Delete account</Button>
                <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleModal()}>Delete this account?</ModalHeader>
                  <ModalBody>
                    This will delete your account from this service.
                    All collected data and stats will be lost forever, 
                    all your running bots will be terminated and their settings will be deleted.
                    After you would be able to add this account to service
                    as you did this in the beginning.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={() => this.props.deleteAccount()}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                  </ModalFooter>
                </Modal>
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