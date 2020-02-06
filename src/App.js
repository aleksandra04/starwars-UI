import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import FilmsPage from './components/filmsPage';
import ObjectComponent from './components/objectComponent'
import './App.scss';

function App() {
  return (
    <Switch>
      <Redirect exact from="/" to='/films'>Start</Redirect>
      <Route path='/films' exact component={FilmsPage} />
      <Route path='/:objname/:id?' component={ObjectComponent} />
    </Switch>
  );
}

export default App;
