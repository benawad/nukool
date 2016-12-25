import React, { Component } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import Title from './Title';


class Waiting extends Component {
  render() {
    return (
      <Container text>
        <Title/>
        <Loader active/>
      </Container>
    );
  }
}

export default Waiting;
