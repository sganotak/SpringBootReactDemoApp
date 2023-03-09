import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { validateZipcode } from "../scripts/helper";


const UserRegisterForm = () => {

    const [showHomeAddress, setShowHomeAddress] = useState(false);
    const [showWorkAddress, setShowWorkAddress] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [homeZipcodeError, setHomeZipcodeError] = useState('');
    const [workZipcodeError, setWorkZipcodeError] = useState('');
    const navigate= useNavigate();
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const form = event.target;
    
    const formData = {
      name: form.elements.name.value,
      surname: form.elements.surname.value,
      gender: form.elements.gender.value,
      birthdate: formatter.format(selectedDate)
    };

    if (form.elements.homeAddressChecked.checked) {
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

    
    
    //if (!validateZipcode(formData.homeaddress.zipcode)) {
     // alert('Please enter a valid ZIP code');
     // return;
   // }
    if (form.elements.workAddressChecked.checked) {
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
  

    function handleZipcodeChange(event) {
      const zipcode = event.target.value;
      if (!validateZipcode(zipcode)) {
        event.target.setCustomValidity('Please enter a valid ZIP code');
      } else {
        event.target.setCustomValidity('');
      }
    }
  
    

    
    
    
    console.log(formData);
    fetch('/demo/register', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response =>  response.text())
    .then(data => {
      navigate("/");
      toast.success('User registered successfully!', {
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



  const handleToggleHomeAddress = () => {
    setShowHomeAddress(!showHomeAddress);
  };



  const handleToggleWorkAddress = () => {
    setShowWorkAddress(!showWorkAddress);
  };



    return (  <div class="container mt-5 ">
    <div class="row justify-content-center ">
      <div class="col-lg-6">
        <div class="border p-4 bg-light">
        <form onSubmit={handleSubmit}>
        <fieldset>
            <legend>User Registration</legend>
           
          
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="inputSurname" className="form-label">Surname</label>
            <input type="text" className="form-control" name="surname" placeholder="Enter surname" required />
          </div>
          <div className="mb-3">
            <label htmlFor="inputGender" className="form-label">Gender</label>
            <select className="form-select" name="gender" required>
              <option disabled selected>Choose...</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="inputBirthdate" className="form-label">Birthdate</label>
           <p></p> <DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  format="dd/MM/yyyy"
  required
  //showMonthYearDropdown
/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="homeAddressChecked" value="homeAddress" checked={showHomeAddress} onChange={handleToggleHomeAddress} />
            <label className="form-check-label" htmlFor="showHomeAddress">Add Home Address</label>
          </div>
          {showHomeAddress &&
            <div>
              <div className="mb-3">
                <label htmlFor="inputHomeCity" className="form-label">City</label>
                <input type="text" className="form-control" name="homeCity" placeholder="Enter city" required={showHomeAddress}  />
              </div>
              <div className="mb-3">
                <label htmlFor="inputHomeStreet" className="form-label">Street</label>
                <input type="text" className="form-control" name="homeStreet" placeholder="Enter street" required={showHomeAddress}  />
              </div>
              <div className="mb-3">
                <label htmlFor="inputHomeZipcode" className="form-label">Zipcode</label>
                <input type="text" className="form-control" name="homeZipcode" placeholder="Enter zipcode" required={showHomeAddress}  />
              </div>
              {homeZipcodeError && <div className="alert alert-warning" role="alert">{homeZipcodeError}</div>}
            </div>
          }
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="workAddressChecked" value="workAddress" checked={showWorkAddress} onChange={handleToggleWorkAddress} />
            <label className="form-check-label" htmlFor="showWorkAddress">Add Work Address</label>
          </div>
          {showWorkAddress&&
            <div>
              <div className="mb-3">
                <label htmlFor="inputWorkCity" className="form-label">City</label>
                <input type="text" className="form-control" name="workCity"  placeholder="Enter city" required={showWorkAddress} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputWorkStreet" className="form-label">Street</label>
              <input type="text" className="form-control" name="workStreet" placeholder="Enter street"  required={showWorkAddress}/>
            </div>
            <div className="mb-3">
              <label htmlFor="inputWorkZipcode" className="form-label">Zipcode</label>
              <input type="text" className="form-control" id="workZipcode" placeholder="Enter zipcode" required={showWorkAddress}/>
              {workZipcodeError && <div className="alert alert-warning" role="alert">{workZipcodeError}</div>}
            </div>
          </div>
        }
        <button type="submit" className="btn btn-primary" >Submit</button>
        </fieldset>
      </form>
    </div>
  </div>
</div>
</div>
  
  );
}

 
export default UserRegisterForm;