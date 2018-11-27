import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import MainPage from '../components/MainPage';
import Favr from '../components/Favr';
import Feed from '../components/Feed';


import Navbar from '../components/Navbar';

const AppRouter = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route path="/" component={MainPage} exact />
        {/*<Route path="/:topicLabel/:topicId/node/:nodeId?/:viewMode?" component={MainPage} />*/}
        {/*<Route component={NotFoundPage} />*/}
      </Switch>
    </div>
  </HashRouter>
);

export default AppRouter;
