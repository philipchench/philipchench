import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ListItem from "./listItem";
import AddItem from "./addItem";
import Pagination from "./pagination";
//8/23/11pm
const UserList = ({doesExist}) => {
    const [nameExists, setnameExists] = useState(false)
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5

    let history = useHistory();

    const name = useParams().userId;
    console.log(name)

    const getList = async (name) => {
        try{const res = await fetch(`api/${name}`);
        const data = await res.json();
        return data.items
        }
        catch(err){
          console.log("Cannot get user's list");
          return [];
        }
      }
    
    const removeItem = async (id) =>{
        const res = await fetch(`api/${name}/${id}`, {
            method: 'DELETE',
          })
          if(res.status === 200){
            setItems(items.filter((item) => item._id !== id));
          }else{
            alert('Error Deleting This Task')
          }
    }

    const addItem = async (data) =>{
        const res = await fetch(`api/${name}/posting`, {
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
          setCurrentPage(1)
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
            console.log(initList)
            setItems(initList);
        }
        doEffect();
      }, [])

      if (!nameExists){
        return(
            <div></div>
        )
    }

    let indexFirst = items.length - currentPage * postsPerPage;
    const indexLast = indexFirst + postsPerPage;
    if(indexLast <= 0 && currentPage !== 1){
        setCurrentPage(currentPage - 1);
    }
    if(indexFirst < 0){
        indexFirst = 0
    }
    const currentPosts = (items.slice(indexFirst, indexLast)).reverse();
    const paginate = (pageNumber) => {setCurrentPage(pageNumber);}
    return(
        <div>
            <p className="hello">Hello, {name}!</p>
            <AddItem onAdd = {addItem}/>
            {currentPosts.map((item1) => (<ListItem key = {item1._id} item = {item1} onDelete = {removeItem} />))}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={items.length}
                paginate={paginate}
                currPage={currentPage}
            />
        </div>
    )    
    
  }
  
  export default UserList;