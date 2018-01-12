// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from 'components/CoreLayout';
import { NotFoundRoute } from 'components/NotFound';
import Dashboard from 'bundles/Story/components/Dashboard';
import config from 'config/index';

import './Layout.scss';

export default () => (
  <CoreLayout>
    <div className="story-container">
      <Switch>
        <Route exact path={config.route.story.index} component={Dashboard} />
        <NotFoundRoute />
      </Switch>
    </div>
  </CoreLayout>
);
