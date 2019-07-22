import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout-pre/Navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn/SignIn';
import SignUp from './components/auth/SignUp/SignUp';
import CreateProject from './components/projects/CreateProject/CreateProject';
import ProgramDetails from './components/programs/ProgramDetails';
import CreateProgram from './components/programs/CreateProgram';
import Home from './components/layout-pre/Home/Home';

import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 90px;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/program/:id" component={ProgramDetails} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/create" component={CreateProject} />
          <Route path="/create-program" component={CreateProgram} />
        </Switch>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
