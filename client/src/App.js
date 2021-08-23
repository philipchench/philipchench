import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserForm from "./userForm";

const addUser = async (name) => {
  const res = await fetch(`http://localhost:5000/api/users`, {
    method: 'POST',
    body: JSON.stringify(name),
  })
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact path='/'
            render={(props) => (
              <UserForm onAdd={addUser} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
