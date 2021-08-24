import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ListItem from "./listItem";
import AddItem from "./addItem";
//8/23/11pm
const UserList = ({doesExist}) => {
    const [nameExists, setnameExists] = useState(false)
    const [items, setItems] = useState([])

    let history = useHistory();

    const name = useParams().userId;

    const getList = async (name) => {
        try{const res = await fetch(`http://localhost:5000/api/${name}`);
        const data = await res.json();
        return data.items
        }
        catch(err){
          console.log("Cannot get user's list");
          return [];
        }
      }
    
    const removeItem = async (id) =>{
        const res = await fetch(`http://localhost:5000/api/${name}/${id}`, {
            method: 'DELETE',
          })
          if(res.status === 200){
            setItems(items.filter((item) => item._id !== id));
          }else{
            alert('Error Deleting This Task')
          }
    }

    const addItem = async (data) =>{
        const res = await fetch(`http://localhost:5000/api/${name}/posting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
          })
          const newItem = await res.json()
          console.log(newItem)
          console.log(items)
          setItems([...items, newItem])
    }

    useEffect(() => {
        const existence = async () =>{
            const result = await doesExist(name)
            if(result){
                setnameExists(true);
            }else{
                history.push(`/`)
            }
        }
        existence();
        const doEffect = async () =>{
            const initList = await getList(name);
            setItems(initList);
        }
        doEffect();
      }, [])

      if (!nameExists){
        return(
            <div></div>
        )
    }

    return(
        <div>
            <AddItem onAdd = {addItem}/>
            {items.map((item1) => (<ListItem key = {item1._id} item = {item1} onDelete = {removeItem} />))}
        </div>
    )    
    
  }
  
  export default UserList;