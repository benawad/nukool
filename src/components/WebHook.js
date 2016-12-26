import React, { Component } from 'react';
import { browserHistory } from 'react-router';


class WebHook extends Component {

  constructor(props) {
    super(props);

    const redditStateKey = 'redditState';

    let success = false;
    const { state, code } = this.props.location.query;
    if (state !== undefined && code !== undefined) {
      if (state === localStorage.getItem(redditStateKey, "")) {
        const { subject, message, users } = localStorage;
        if (subject !== undefined && message !== undefined && users !== undefined) {
          success = true;
          this.props.sendMessages(subject, message, JSON.parse(users), 'yummy ramen', code);
        }
      }
    } 
    
    if (!success) {
      browserHistory.push('/');
    }

  }

  render() {
    return (
      <p>hi!</p>
    );
  }
}

export default WebHook;
