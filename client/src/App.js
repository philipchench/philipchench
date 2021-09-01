import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserForm from "./userForm";
import UserList from "./userList";
import Nav from "./nav";


function App() {
  const addUser = async (name) => {
    await fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name),
    })
    alert("User added.")
  }

  const userExists = async (name) =>{
    try{const res = await fetch(`http://localhost:5000/api/${name}`);
    const data = await res.json();
    return data
  }
    catch(err){
      return false;
    }
  }

  const getUser = async (name) => {
    const exists = await userExists(name)
    if (exists){
      return true;
  }
    else{
      alert(" Please enter existing username.")
      return false;
    }
  }

  return (
    <div>
      <Nav />
      <Router>
      <div>
        <Switch>
          <Route
            exact path='/'
            render={(props) => (
              <UserForm onAdd={addUser} onGet={getUser} />
            )}
          />
          <Route
            exact path='/:userId'
            render={(props) => (
              <UserList doesExist = {getUser}/>
            )}
          />
        </Switch>
      </div>
    </Router>
    <div className='footer'>
      <span>Developed by Philip Chen (Beta)</span>
    </div>
    </div>
  );
}

export default App;
