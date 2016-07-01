import todoSagas from '../modules/todo/sagas';

export default function createSaga(getState) {
  function* rootSaga() {
    yield [
      todoSagas(getState)
    ]
  }
  return rootSaga;
}
