import todoSagas from '../modules/todo/sagas';

export default function createSaga() {
  function* rootSaga() {
    yield [
      todoSagas()
    ]
  }
  return rootSaga;
}
