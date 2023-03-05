import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";




const UserList = () => {


const navigate= useNavigate();

  function handleClick(id) {
  navigate(`/users/${id}`);
}

  const [users, setusers] = useState([]);
    

  useEffect(() => {
    fetch('http://localhost:8080/demo/users')
      .then(response => response.json())
      .then(data => setusers(data))
      .catch(error => console.log(error));
  }, []);
  
  
    return ( 
      <div className="container">
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        
      </tr>
    </thead>
    <tbody>
      {users.map((user)=>(<tr key={user.id} onClick={()=>handleClick(user.id)}>
        <td>{user.name}</td>
        <td>{user.surname}</td>
      </tr>))}
    </tbody>
  </table>
</div>
  );
}
 
export default UserList;