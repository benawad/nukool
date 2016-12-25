export function addResults(state = [], action) {
  switch (action.type) {
    case 'SEND_MESSAGES_DONE':
      return JSON.parse(action.result);
      
    default:
      return state;
  }
}


export default addResults;
