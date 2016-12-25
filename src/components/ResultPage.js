import React, { Component } from 'react';
import { Container, Icon, Table } from 'semantic-ui-react'
import Title from './Title';


class ResultPage extends Component {

  tableRow(x, i) {
    const positive = x[1];
    return (
      <Table.Row positive={positive} negative={!positive} key={i}>
        <Table.Cell>{x[0]}</Table.Cell>
        <Table.Cell>
          <Icon name={positive ? 'checkmark' : 'close'} />
          {positive ? 'message sent' : 'user does not exist'}
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    return (
      <Container text>
        <Title/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.messageSuccess.map(this.tableRow)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ResultPage;
