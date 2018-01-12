import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import dashboardSagaBinding from 'bundles/Story/sagas/DashboardSaga';

export default function* storySaga() {
  yield all(combineSagas([
    dashboardSagaBinding
  ]));
}
