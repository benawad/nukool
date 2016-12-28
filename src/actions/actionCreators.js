export function sendMessages(subject, message, users, key, code) {
  return {
    type: 'REQUEST_SEND_MESSAGES',
    subject,
    message,
    users,
    key,
    code
  }
}

export function updateHome(update) {
  return {
    type: 'HOME_UPDATE',
    update
  }
}
