import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import request from 'superagent';

function sendMessages(payload) {
  return request
    .post('https://nukool-server.herokuapp.com')
    .send(
      payload
    )
    .set('Accept', 'application/json')
    .then((res) => res.text);
}

function* callSendMessages(action) {
  try{
    const result = yield call(sendMessages, action);
    console.log(result);
    if (result.authorization === 'successful') {
      yield put({type: 'SEND_MESSAGES_DONE', success: 1});
    } else {
      yield put({type: 'SEND_MESSAGES_DONE', success: 0});
    }
   } catch (e) {
    yield put({type: 'SEND_MESSAGES_DONE', success: 0});
   }
}

function* sendMessagesSaga() {
  yield* takeEvery('REQUEST_SEND_MESSAGES', callSendMessages);
}

export default function* root(feathersApp) {
  yield [
    fork(sendMessagesSaga)
  ]
}
