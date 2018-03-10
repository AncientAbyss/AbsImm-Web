// @flow
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { call, put, take, all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  action,
  init,
  actionPending,
  actionFulfilled,
  actionRejected,
} from 'bundles/Story/modules/DashboardModule';
import StoryAPI from 'bundles/Story/apis/StoryAPI';

export function* dashboardWorker(api: StoryAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { data } } = yield take(action().type);
    try {
      yield put(actionPending());
      const response = yield call([api, api.action], data);
      yield put(actionFulfilled(response));
      yield put(actions.reset(modelPath));
      // yield call(Alert.success, response.description); // no alert needed on success
    } catch (e) {
      yield put(actionRejected(e));
      switch (e.response.code) {
        case 'story.dashboard.action.form.invalid': {
          const details = e.response.details || [];
          yield all(details.map(detail => put(actions.setErrors(`${modelPath}.${detail.key}`, detail.message))));
          break;
        }
        default:
          yield call(Alert.error, e.response.description);
      }
    }
  }
}

export function* initWorker(api: StoryAPI): Generator<*, *, *> {
    while (true) {
        yield take(init().type);
        try {
            const response = yield call([api, api.init]);
            yield put(actionFulfilled(response));
        } catch (e) {
            yield put(actionRejected(e));
            switch (e.response.code) {
                default:
                    yield call(Alert.error, e.response.description);
            }
        }
    }
}

export function* dashboardSaga(api: StoryAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [dashboardWorker, api],
    [initWorker, api],
  ]));
}

const api = new StoryAPI();
export default [dashboardSaga, api];
