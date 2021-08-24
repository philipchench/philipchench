import { useState } from 'react';

const AddItem = ({ onAdd }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!title || !content) {
          alert('Please fill in the boxes.')
          return;
        }
    
        onAdd({title, content});
    
        setTitle('')
        setContent('')
      }

    return (
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <input
              type='text'
              placeholder='Enter title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Content</label>
            <input
              type='text'
              placeholder='Enter text'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <input type='submit' value='Add' />
        </form>
      </div>
      
    );
  }
  
  export default AddItem;