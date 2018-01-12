import { injectReducer } from 'store/reducers';
import { injectSaga } from 'store/sagas';
import Layout from './components/Layout';
import reducer from './modules/StoryModule';
import saga from './sagas/StorySaga';

export default (store) => {
  injectReducer(store, { key: 'story', reducer });
  injectSaga(store, { key: 'story', saga });
  return Layout;
};
