import todoSagas from '../pages/todo/sagas';

export default function createSaga() {
  function* rootSaga() {
    yield [
      todoSagas()
    ]
  }
  return rootSaga;
}
