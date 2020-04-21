import React from 'react';
import { Route } from 'react-router-dom';

import ArtifactList from './containers/ArtifactListView';
import ArtifactDetail from './containers/ArtifactDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import RegArtifact from "./components/RegArtifact";
import MainPage from './containers/MainPage';
import SearchPage from './containers/Search';

const BaseRouter = () => (
    <div>
        <Route exact path = '/' component={ArtifactList} />
        <Route exact path = '/artifacts/:artifactID' component={ArtifactDetail} />
        <Route exact path="/artifacts/s/register">
          <RegArtifact
            requestType="post"
            artifactID={null}
            btnText="Create"
          ></RegArtifact>
        </Route>
        <Route exact path = '/login/' component={Login} />
        <Route exact path = '/signup/' component={Signup} />
        <Route exact path = '/main/' component={MainPage} />
        <Route exact path = '/search/' component = {SearchPage} />
    </div>
);

export default BaseRouter;