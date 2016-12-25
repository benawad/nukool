import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';


class Waiting extends Component {
  render() {
    return (
       <Loader active/>
    );
  }
}

export default Waiting;
