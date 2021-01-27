import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch
} from 'react-router-dom';

import FiveDay from './pages/Five';
import History from './pages/History';
import Main from './pages/Main';
import NaviLinks from './pages/NaviLinks';


const App = () => {
    return (
      
      <Router >     
      <NaviLinks className="App" />
      <main>
      <Switch>
      <Route path="/" exact>
        <Main />
      </Route>  
      <Route path="/five/" exact>
        <FiveDay />
     </Route>
     <Route path="/history/" exact>
        <History />
     </Route>   
     <Redirect to="/" />
     </Switch>
     </main>
      </Router>

    );
    
  }

export default App;
