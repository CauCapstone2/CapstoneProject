import React from "react";
import { Route } from "react-router-dom";

import ArtifactList from "./containers/ArtifactListView";
import ArtifactDetail from "./containers/ArtifactDetailView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import RegArtifact from "./components/RegArtifact";
import MainPage from "./containers/MainPage";
import SearchPage from "./containers/Search";
import Mypage from "./containers/Mypage";
import Creditsuccess from "./components/Creditsuccess";
import Creditcancel from "./components/Creditcancel";
import Creditfail from "./components/Creditfail";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/artifactlist" component={ArtifactList} />
    <Route exact path="/artifacts/:artifactID" component={ArtifactDetail} />
    <Route exact path="/artifacts/s/register" component={RegArtifact} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/search/" component={SearchPage} />
    <Route exact path="/mypage/" component={Mypage} />
    <Route exact path="/recreate/:recreationID" render={(props) => <ArtifactDetail {...props} category="recreation"/>}/>
    <Route exact path="/purchase/success" component={Creditsuccess} />
    <Route exact path="/purchase/cancel" component={Creditcancel} />
    <Route exact path="/purchase/fail" component={Creditfail} />
  </div>
);

export default BaseRouter;