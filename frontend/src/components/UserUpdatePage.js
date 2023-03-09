import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { convertDateFormat } from "../scripts/helper";
import { validateZipcode } from "../scripts/helper";
import { toast } from "react-toastify";


const UserUpdatePage = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate= useNavigate();
  const [homeAddress,setHomeAddress]= useState(null);
    const [workAddress,setWorkAddress]= useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [homeZipcodeError, setHomeZipcodeError] = useState('');
    const [workZipcodeError, setWorkZipcodeError] = useState('');
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    
 
    
    useEffect(() => {
        fetch(`/demo/users/${id}`)
          .then(response => response.json())
          .then(data => {setUser(data);
            setHomeAddress(data.homeaddress || null);
            setWorkAddress(data.workaddress || null);
            setSelectedDate(convertDateFormat(data.birthdate))} )
          .catch(error => console.log(error));
      }, [id]);

      if (!user) {
        return <div>Loading...</div>;
      }

      const handleCancel = () => {
        if (window.confirm("Cancel changes and return to User Profile page?")) {
          fetch(`http://localhost:8080/demo/users/${id}`, { method: 'GET' })
            .then(response => {
              if (response.ok) {
                navigate(`/users/${id}`)
                
              } else {
                throw new Error('Something went wrong while processing the request');
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      };

      const handleAddressToggle = (address,setAddress) =>
      
      {

        if (address && (window.confirm("Delete Address data?")))
        {
          setAddress(null)
        }
        else
        {
          setAddress({ city: '', street: '', zipcode: '' })
        }

      }

      const handleSubmit = (event) => {
        event.preventDefault();
        
        const form = event.target;
        
        const formData = {
          name: form.elements.name.value,
          surname: form.elements.surname.value,
          gender: form.elements.gender.value,
          birthdate: formatter.format(selectedDate)
        };
    
        if (homeAddress) {
          formData.homeaddress = {
            city: form.elements.homeCity.value,
            street: form.elements.homeStreet.value,
            zipcode: form.elements.homeZipcode.value
            
          };
          if (!validateZipcode(formData.homeaddress.zipcode)) {
            setHomeZipcodeError('Please enter a valid zipcode.');
            return;
          }
  
          else { setHomeZipcodeError(null);}
          
        }

        else {formData.homeaddress=null}

        
       

        if (workAddress) {
          formData.workaddress = {
            city: form.elements.workCity.value,
            street: form.elements.workStreet.value,
            zipcode: form.elements.workZipcode.value
          }

          if (!validateZipcode(formData.workaddress.zipcode)) {
            setWorkZipcodeError('Please enter a valid zipcode.');
            return;
          }
  
          else { setWorkZipcodeError(null);}
          
        }
        else {formData.workaddress=null}

       

        console.log(formData);
    fetch(`http://localhost:8080/demo/users/${id}`, {
      method: 'PUT',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response =>  response.json())
    .then(data => {
      navigate(`/users/${id}`);
      toast.success('User profile updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
   
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
      }

     


     

    return (  <section className="section about-section gray-bg" id="about">
      <form onSubmit={handleSubmit}>
    <div className="container">
        <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
            
                <div className="about-text go-to">
                    <h3 className="dark color">Edit User</h3>
                    <div className="row mt-2">
                    <div className="col-md-6"><label className="labels">Name</label><input type="text" name="name" className="form-control" defaultValue={user.name}/></div>
                    <div className="col-md-6"><label className="labels">Surname</label><input type="text" name= "surname" className="form-control" defaultValue={user.surname}/></div>
                </div>
                <div className="row mt-2">
                <div className="col-md-6"><label className="labels">Gender</label><select className="form-select" name="gender" required defaultValue={user.gender}>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select></div>
            <div className="col-md-6"><label className="labels">Email</label><input type="text" className="form-control" defaultValue="placeholder@placeholder.com"/></div>
                </div>
                    <div className="row about-list">
                        <div className="col-md-6">
                            <div className="media">
                                <label>Birthday</label>
                                <p><DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  format="dd/MM/yyyy"
  required
  //showMonthYearDropdown
/></p>
                            </div>
                          
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="col-lg-6">
                <div className="about-avatar">
                <img
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.name}+${user.surname}&size=200&rounded=true`}
            alt={`${user.name} ${user.surname}'s avatar`}
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
      <button className="btn btn-link float-end" type="button" data-bs-toggle="collapse" data-bs-target="#homeAddress" aria-expanded="false" aria-controls="homeAddress" onClick={()=>handleAddressToggle(homeAddress,setHomeAddress)}>
     <i className={`bi ${homeAddress? 'bi-dash-circle' : 'bi-plus-circle'}`}></i>
          </button>
      </div>
      {homeAddress?
      <div className="card-body" id="homeAddress">
       <p>City: <input type="text" className="form-control" name="homeCity"required defaultValue={homeAddress.city}/></p>
       <p>Street: <input type="text" className="form-control" name="homeStreet" required defaultValue={homeAddress.street}/></p>
       <p>zipcode: <input type="text" className="form-control" name="homeZipcode" required defaultValue={homeAddress.zipcode}/></p>
       {homeZipcodeError && <div className="alert alert-warning" role="alert">{homeZipcodeError}</div>}
      </div> : null}
    </div>
  </div>
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
      <i className="bi bi-pc-display-horizontal"> Work Address </i> 
      <button className="btn btn-link float-end" type="button" data-bs-toggle="collapse" data-bs-target="#workAddress" aria-expanded="false" aria-controls="workAddress" onClick={()=>handleAddressToggle(workAddress,setWorkAddress)}>
     <i className={`bi ${workAddress? 'bi-dash-circle' : 'bi-plus-circle'}`}></i>
          </button> 
      </div>
      {workAddress?
      <div className="card-body" id="workAddress">
        <p>City: <input type="text" name="workCity" className="form-control" required defaultValue={workAddress.city}/></p>
        <p>Street: <input type="text" name="workStreet" className="form-control" required defaultValue={workAddress.street}/></p>
        <p>zipcode: <input type="text" name="workZipcode" className="form-control" required defaultValue={workAddress.zipcode}/></p>
        {workZipcodeError && <div className="alert alert-warning" role="alert">{workZipcodeError}</div>}
      </div> : null}
    </div>
  </div>
</div>

<button type="submit" className="btn btn-success me-3 my-3"><i class="bi bi-check2"></i> Submit Changes</button>
<button type="button" className="btn btn-danger my-3" onClick={()=>handleCancel()} > <i class="bi bi-x-lg"></i> Cancel Changes</button>
</div>
</form>
</section>); 
}
 
export default UserUpdatePage;