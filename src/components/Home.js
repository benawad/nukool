import React, { Component } from 'react';
import { Container, Button, Form, Message } from 'semantic-ui-react' 
import Title from './Title';


class Home extends Component {
getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  constructor(props) {
    super(props);

    const redditStateKey = 'redditState';

    if (window.location.search) {
      const state = this.getParameterByName('state');
      const code = this.getParameterByName('code');
      if (state && code) {
        if (state === localStorage.getItem(redditStateKey, "")) {
          const { subject, message, users } = localStorage;
          if (subject !== undefined && message !== undefined && users !== undefined) {
            this.props.sendMessages(subject, message, JSON.parse(users), 'yummy ramen', code);
          }
        }
      }
    }

    this.subjectKey = "subject";
    this.messageKey = "message";
    this.usersKey = "users";

    const redditState = this.createState();
    localStorage.setItem(redditStateKey, redditState);

    const redirectUri = "http://benawad.com/nukool/%23";
    const url = `https://www.reddit.com/api/v1/authorize?scope=identity,privatemessages&response_type=code&redirect_uri=${redirectUri}&client_id=-Q-lrceF3GNtHw&state=${redditState}&duration=permanent`

    this.state = {
      subject: '',
      message: '',
      users: '',
      subjectEmpty: false,
      messageEmpty: false,
      usersOver10: false,
      noUsers: false,
      messageSuccess: this.props.messageSuccess,
      url
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorContent = this.errorContent.bind(this);
    this.subjectChange = this.subjectChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.usersChange = this.usersChange.bind(this);
    this.messageSuccess = this.messageSuccess.bind(this);
  }

  createState() {
    let state = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
        state += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return state;
  }

  redirectError() {
    console.log("error");
  }

  handleSubmit(e) {
    // validate input
    const subject = this.state.subject.trim();
    const message = this.state.message.trim();

    let users = this.state.users.split('\n');
    let cleanUsers = [];
    let cleanUser = '';
    for (let i = 0; i < users.length; i++) {
      cleanUser = users[i].trim();
      if (cleanUser !== '') {
        cleanUsers.push(cleanUser) ;
      }
    }

    let uniqueUsers = new Set(cleanUsers); 
    cleanUsers = [...uniqueUsers];

    const subjectEmpty = subject === '';
    const messageEmpty = message === '';
    const usersOver10 = cleanUsers.length > 10;
    const noUsers = cleanUsers.length <= 0;

    if (subjectEmpty || messageEmpty || usersOver10 || noUsers) {
      this.setState({
        subjectEmpty,
        messageEmpty,
        usersOver10,
        noUsers,
        messageSuccess: 2
      });
    } else {
      localStorage.setItem(this.subjectKey, this.state.subject);
      localStorage.setItem(this.messageKey, this.state.message);
      localStorage.setItem(this.usersKey, JSON.stringify(cleanUsers));
      window.location = this.state.url;
    }

    e.preventDefault();
  }

  errorContent() {
    let errorMessages = [];
    if (this.state.subjectEmpty) {
      errorMessages.push('Subject cannot be empty');
    }
    if (this.state.messageEmpty) {
      errorMessages.push('Message cannot be empty');
    }
    if (this.state.usersOver10) {
      errorMessages.push('Can only message up to 10 users');
    }
    if (this.state.noUsers) {
      errorMessages.push('Users cannot be empty');
    }
    return errorMessages.join(' | ');
  }

  subjectChange(e) {
    const subjectEmpty = e.target.value.trim() === '';
    const messageSuccess = subjectEmpty ? 2 : this.state.messageSuccess; 
    this.setState({subject: e.target.value, subjectEmpty, messageSuccess})
  }

  messageChange(e) {
    const messageEmpty = e.target.value.trim() === '';
    const messageSuccess = messageEmpty ? 2 : this.state.messageSuccess; 
    this.setState({message: e.target.value, messageEmpty, messageSuccess});
  }

  usersChange(e) {
    const noUsers = e.target.value.trim() === '';
    const messageSuccess = noUsers ? 2 : this.state.messageSuccess; 
    this.setState({users: e.target.value, noUsers, messageSuccess});
  }

  messageForm() {
    return (
    <Form onSubmit={this.handleSubmit} error={this.state.subjectEmpty || this.state.messageEmpty || this.state.usersOver10 || this.state.noUsers}>
      <Message
        error
        header='Error'
        content={this.errorContent()}
      />
      <Form.Field error={this.state.subjectEmpty} >
        <label>Subject</label>
        <input 
          maxLength="99"
          name='subject' 
          onChange={this.subjectChange} 
          value={this.state.subject}/>
      </Form.Field>
      <Form.TextArea error={this.state.messageEmpty} name='message' label='Message' onChange={this.messageChange} value={this.state.message} />
      <Form.TextArea error={this.state.usersOver10 || this.state.noUsers} name='users' placeholder='Add one user per line' label='Users (up to 10)' onChange={this.usersChange} value={this.state.users} />
      <Button primary fluid type='submit'>Send</Button>
    </Form>
    )
  }

  messageSuccess() {
    const { messageSuccess } = this.state;
    if (messageSuccess === 1) {
      return (
        <Message
          success
          header='Authentication successful!'
          content='Your message will be sent shortly'
        />
      );
    } else if (messageSuccess === 0) {
      return (
        <Message
          negative
          header='Authentication failed!'
          content='Something went wrong :( try again.'
        />
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <div className="outer">
          <div className="middle">
            <div className="inner">
              <Container text>
                <Title />
                {this.messageSuccess()}
                {this.messageForm()}
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
