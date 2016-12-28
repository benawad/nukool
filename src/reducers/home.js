export function homeUpdate(state = {
  messageSuccess: 2,
  subjectEmpty: false,
  messageEmpty: false,
  noUsers: false,
  usersOver10: false,
  subject: '',
  message: '',
  users: ''
}, action) {
  switch (action.type) {
    case 'SEND_MESSAGES_DONE':
      console.log('done');
      console.log(action.success);
      return {
        ...state,
        messageSuccess: action.success
      }
    case 'HOME_UPDATE':
      console.log(action.update);
      return {
        ...state,
        ...action.update
      }
    default:
      return state;
  }
}


export default homeUpdate;
