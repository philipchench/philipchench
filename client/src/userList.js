import { useState } from 'react';
import { useParams } from "react-router-dom";

const UserList = ({doesExist}) => {
    const [nameExists, setnameExists] = useState(false)

    const name = useParams().userId;
    const existence = async () =>{
        const result = await doesExist(name)
        console.log(result)
        if(result){
            setnameExists(true);
        }
    }
    existence();
    if (!nameExists){
        return(
            <h1>fail</h1>
        )
    }
    return(
        <h1>success</h1>
    )    
    
  }
  
  export default UserList;