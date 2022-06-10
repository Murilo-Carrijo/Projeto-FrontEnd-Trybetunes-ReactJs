import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Login from './page/Login';
import Search from './page/Search';
import Album from './page/Album';
import Favorites from './page/Favorites';
import Profile from './page/Profile';
import ProfileEdit from './page/ProfileEdit';
import NotFound from './page/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search" render={ (props) => <Search { ...props } /> } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" render={ (props) => <Favorites { ...props } /> } />
          <Route
            path="/profile/edit"
            render={ (props) => <ProfileEdit { ...props } /> }
          />
          <Route path="/profile" render={ (props) => <Profile { ...props } /> } />
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route path="*" render={ (props) => <NotFound { ...props } /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
