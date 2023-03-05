import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { calculateAge } from "../scripts/helper";





const UserProfile = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate= useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/demo/users/${id}`)
          .then(response => response.json())
          .then(data => setUser(data))
          .catch(error => console.log(error));
      }, [id]);

      if (!user) {
        return <div>Loading...</div>;
      }

      const age= calculateAge(user.birthdate)

      const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
          fetch(`http://localhost:8080/demo/users/${id}`, { method: 'DELETE' })
            .then(response => {
              if (response.ok) {
                navigate(`/users`)
                toast.info(`Deleted User ${user.name} ${user.surname}`, {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true
                })
              } else {
                throw new Error('Something went wrong while deleting the user');
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      };

      const handleUpdate = (id) =>{navigate(`/users/edit/${id}`);}


    return ( <section className="section about-section gray-bg" id="about">
    <div className="container">
        <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
                <div className="about-text go-to">
                    <h3 className="dark-color">{user.name} {user.surname}</h3>
                    <h6 className="theme-color lead">Member</h6>
                    <div className="row about-list">
                        <div className="col-md-6">
                            <div className="media">
                                <label>Birthday</label>
                                <p>{user.birthdate}</p>
                            </div>
                            <div className="media">
                                <label>Age</label>
                                <p>{age} Yr</p>
                            </div>
                          
                        </div>
                        <div className="col-md-6">
                            <div className="media">
                                <label>E-mail</label>
                                <p>placeholder@placeholder.com</p>
                            </div>
                            <div className="media">
                                <label>Gender</label>
                                <p>{user.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="about-avatar">
                <img
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.name}+${user.surname}&size=200&rounded=true`}
            alt={`${user.name} ${user.lastname}'s avatar`}
          />
                </div>
            </div>
        </div>
    </div>
    <div className="container-fluid">
    <div className="row justify-content-center">
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
      <i className="bi bi-house-door-fill"> Home Address</i>
      </div>
      <div className="card-body">
       <p>City: {user.homeaddress ? user.homeaddress.city : "N/A"}</p>
       <p>Street: {user.homeaddress ? user.homeaddress.street : "N/A"}</p>
       <p>zipcode: {user.homeaddress ? user.homeaddress.zipcode : "N/A"}</p>
      </div>
    </div>
  </div>
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
      <i className="bi bi-pc-display-horizontal"> Work Address </i>  
      </div>
      <div className="card-body">
        <p>City: {user.workaddress ? user.workaddress.city : "N/A"}</p>
        <p>Street: {user.workaddress ? user.workaddress.street : "N/A"}</p>
        <p>zipcode: {user.workaddress ? user.workaddress.zipcode : "N/A"}</p>
      </div>
    </div>
  </div>
</div>
<button type="button" className="btn btn-primary me-3 my-3" onClick= {()=>handleUpdate(id)}><i class="bi bi-pencil-square" ></i> Edit User</button>
<button type="button" className="btn btn-danger my-3" onClick= {()=>handleDelete()}> <i className="bi bi-trash-fill me-2"></i> Delete User</button>
</div>

</section>);
}
 
export default UserProfile;