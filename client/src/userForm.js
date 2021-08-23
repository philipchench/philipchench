import { useState } from 'react';

const UserForm = ({ onAdd }) => {
    const [username, setUsername] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!username) {
          alert('Please fill out username')
          return
        }
    
        onAdd({ username });
        console.log({username})
    
        setUsername('')
      }

    return (
        <form onSubmit={onSubmit}>
        <div>
          <label>User</label>
          <input
            type='text'
            placeholder='Add Title'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
  
        <input type='submit'/>
      </form>
    );
  }
  
  export default UserForm;