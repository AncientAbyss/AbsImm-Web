import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, action } from 'bundles/Story/modules/DashboardModule';
import Dashboard from 'bundles/Story/components/Dashboard';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state    The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state, ownProps) => ({
  ...state.story.dashboard.form,
  ...state.story.dashboard.request,
  ...state.story.dashboard.story,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @param {Object} ownProps   The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmitAction: (data) => dispatch(action({ data })),
//  componentWillMount: () => dispatch(TODO: validate?),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Dashboard));
