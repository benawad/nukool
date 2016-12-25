import React from 'react';

import { Link } from 'react-router';
import { Header, Container } from 'semantic-ui-react'

const Main = React.createClass({
  render() {
    return (
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <Container text>
              <Header size="huge" textAlign="center">
                Nukool
                <Header.Subheader>
                  Private message up to 10 Reddit users at once
                </Header.Subheader>
              </Header>
              {React.cloneElement(this.props.children, this.props)}
            </Container>
          </div>
        </div>
      </div>
    )
  }
});

export default Main;

