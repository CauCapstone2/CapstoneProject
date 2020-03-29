import React from 'react';
import { Route } from 'react-router-dom';

import ArtifactList from './containers/ArtifactListView';
import ArtifactDetail from './containers/ArtifactDetailView';

const BaseRouter = () => (
    <div>
        <Route exact path = '/' component={ArtifactList} />
        <Route exact path = '/:artifactID' component={ArtifactDetail} />
    </div>
);

export default BaseRouter;