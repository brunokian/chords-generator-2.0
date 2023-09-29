import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import RandomGenerator from './components/RandomGenerator';
import HarmonicFieldGenerator from './components/HarmonicFieldGenerator';

function App() {
  
  return (
    <Switch>
      <Redirect exact from="/" to="/random-generator" />
      <Route exact path='/random-generator' component={ RandomGenerator } />
      <Route exact path='/harmonicField-generator' component={ HarmonicFieldGenerator }/>
    </Switch>
  )
}

export default App;
