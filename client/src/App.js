import Events from './views/Events';
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CalendarMain from "./views/CalendarMain";
import Note from "./views/Notes";
import NewNote from "./views/NewNote";
import NoteList from "./views/NoteList";
import NoteCounter from "./views/NoteCount";
import EditNote from "./views/EditNote";
import Footer from "./components/Footer";
import Kanban from './components/KanBan'
import {useHistory} from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import config from './config';
import Home from './Home';
import {UserContext} from "./UserContext"

const oktaAuth = new OktaAuth(config.oidc);

function App() {
  const [userInfo, setUserInfo] = useState(null)
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/');
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
    >
      <div>
        <NavBar />
        <div className="container">
          <Switch>
            <UserContext.Provider value={{userInfo, setUserInfo}}>
              <Route path="/" exact component={Home} />
              <Route path="/login/callback" component={LoginCallback} />
              <SecureRoute exact path="/CalendarMain">
                <CalendarMain />
              </SecureRoute>
              <SecureRoute path="/NewNote">
                <NewNote />
              </SecureRoute>
              <SecureRoute path="/Notes">
                <Note />
              </SecureRoute>
              <SecureRoute path="/NoteList">
                <NoteList />
              </SecureRoute>
              <SecureRoute path="/NoteCount">
                <NoteCounter />
              </SecureRoute>
              <SecureRoute path="/EditNote">
                <EditNote />
              </SecureRoute>
              <SecureRoute path='/Events'>
                <Events />
              </SecureRoute>
              <SecureRoute path='/Kanban'>
                  <Kanban />
              </SecureRoute>
            </UserContext.Provider>
          </Switch>
        </div>
        <Footer />
      </div>
    </Security>

  );
}

export default App;

