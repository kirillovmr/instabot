import React, { Component } from 'react';
import { Dots } from '@zendeskgarden/react-loaders';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import { getApi, getHeaders } from '../../func/func';

export default class AddUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiRoot: '',
      username: '',
      password: '',
      loading: false,
      collapse: this.props.collapse === undefined ? true : this.props.collapse
    }
  }

  componentWillMount() {
    this.setState({
      apiRoot: getApi()
    });
  }

  // Submit addUser form
  addAccount(e) {
    e.preventDefault();

    if (!this.state.username || !this.state.password)
      return;

    this.setState({ loading: true });
    
    const body = {
      username: this.state.username, 
      password: this.state.password
    };

    fetch(`${getApi()}/add`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Add acc:', result);
      if (!result.success) {
        return this.setState({ loading: false });
      }

      // Adding new user to state
      this.props.addUser(result.user);
      this.setState({
        username: '',
        password: '',
        loading: false,
        collapse: false
      });
    })
    .catch( alert );
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <Col xs="12" sm="12">
        <Card>
          <CardHeader onClick={() => this.toggle()} className="noselect">
            <i className={`cui-chevron-${this.state.collapse? 'bottom' : 'top'} icons font-md ml-1`}></i> Add new account
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <CardBody>
              <Form onSubmit={this.addAccount.bind(this)} method="post">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="username" name="username" 
                      placeholder="Username" value={this.state.username}
                      disabled={this.state.loading}
                      onChange={(e) => this.setState({
                        username: e.target.value
                      })}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="password" name="password" 
                      placeholder="Password" value={this.state.password}
                      disabled={this.state.loading}
                      onChange={(e) => this.setState({
                        password: e.target.value
                      })}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="form-actions" style={{margin: 0}}>
                  <Button type="submit" size="md" color="success" disabled={this.state.loading}>Submit</Button>
                  <Dots size="38px" style={{marginLeft: '20px', display: this.state.loading ? 'inline-block' : 'none'}}/>
                </FormGroup>
              </Form>
            </CardBody>
          </Collapse>
        </Card>
      </Col>
    );
  }
}