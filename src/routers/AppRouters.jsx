import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';
import NotFoundPage from '../components/NotFoundPage';


import Navbar from '../components/Navbar';

const AppRouter = () => (
  <HashRouter>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/:topicLabel/:topicId/node/:nodeId?/:viewMode?" component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </HashRouter>
);

export default AppRouter;
