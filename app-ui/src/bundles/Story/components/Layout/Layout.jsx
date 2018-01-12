// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from 'components/CoreLayout';
import { NotFoundRoute } from 'components/NotFound';
import DashboardContainer from 'bundles/Story/containers/DashboardContainer';
import config from 'config/index';

import './Layout.scss';

export default () => (
  <CoreLayout>
    <div className="story-container">
      <Switch>
        <Route exact path={config.route.story.index} component={DashboardContainer} />
        <NotFoundRoute />
      </Switch>
    </div>
  </CoreLayout>
);
