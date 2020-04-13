import React from "react";
import { Route } from "react-router-dom";

import ArtifactList from "./containers/ArtifactListView";
import ArtifactDetail from "./containers/ArtifactDetailView";
import RegArtifact from "./components/RegArtifact";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={ArtifactList} />
    <Route exact path="/artifacts/:artifactID" component={ArtifactDetail} />
    <Route exact path="/artifacts/s/register">
      <RegArtifact
        requestType="post"
        artifactID={null}
        btnText="Create"
      ></RegArtifact>
    </Route>
  </div>
);

export default BaseRouter;
