// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions, handleAction } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type DashboardForm = {
  action: string,
}

export const modelPath: string = 'story.dashboard.data';
export const requestState: RequestState = { isPending: false };
export const formState: DashboardForm = {
  action: '',
};

export const init = createAction('STORY_INIT');
export const action = createAction('STORY_ACTION');
export const actionPending = createAction('STORY_ACTION_PENDING');
export const actionFulfilled = createAction('STORY_ACTION_FULFILLED');
export const actionRejected = createAction('STORY_ACTION_REJECTED');

export default combineReducers({
  request: handleActions({
    [actionPending]: () => ({ isPending: true }),
    [actionFulfilled]: () => ({ isPending: false }),
    [actionRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
  story: handleAction(actionFulfilled, (state, action) => ({
    data: [...state.data, action.payload.description]
  }), {data: []})
});
