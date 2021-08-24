import { useState } from 'react';
import { useHistory } from "react-router-dom";

const UserForm = ({ onAdd, onGet }) => {
    const [username, setUsername] = useState('')
    const [oldusername, setOldusername] = useState('')

    let history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!username) {
          alert('Please fill out username.')
          return;
        }
    
        onAdd({ username });
        console.log({username})
    
        setUsername('')
      }

      const onSubmit2 = async (e) => {
        e.preventDefault()
        if (!oldusername) {
          alert('Please fill out username.')
          return
        }
        const canGet = await onGet(oldusername);
        if (canGet){
          console.log(canGet, "cosjdocaisjc")
          history.push(`/${oldusername}`)
        }
      }

    return (
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>Create User</label>
            <input
              type='text'
              placeholder='Enter new username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <input type='submit' value='Create' />
        </form>
        <form onSubmit={onSubmit2}>
          <div>
            <label>Existing User</label>
            <input
              type='text'
              placeholder='Enter existing username'
              value={oldusername}
              onChange={(e) => setOldusername(e.target.value)}
            />
          </div>
          <input type='submit' value='Log in' />
        </form>
      </div>
      
    );
  }
  
  export default UserForm;