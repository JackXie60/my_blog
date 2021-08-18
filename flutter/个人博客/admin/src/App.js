import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AdminIndex from './pages/AdminIndex'
import Login from './pages/Login'

function App() {
  return (
    <div>
      <Router>
       <div> 
          <div>
         <Switch>
            <Route path="/login/" exact  component={Login} />
            <Route path="*" exact  component={AdminIndex} ></Route>
         </Switch>
          </div>
        </div>
    </Router>
    </div>
    
  );
}

export default App;
