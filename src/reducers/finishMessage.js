export function messageSuccess(state = 2, action) {
  switch (action.type) {
    case 'SEND_MESSAGES_DONE':
      return action.success;
      
    default:
      return state;
  }
}


export default messageSuccess;
