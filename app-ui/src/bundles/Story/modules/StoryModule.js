import { combineReducers } from 'redux';
import dashboardReducer from 'bundles/Story/modules/DashboardModule';

export default combineReducers({
    dashboard: dashboardReducer,
});
