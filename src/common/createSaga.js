import { watchIncrementAsync } from '../pages/todo/sagas';

export default function createSaga() {
  function* rootSaga() {
    yield [
      watchIncrementAsync()
    ]
  }
  return rootSaga;
}
