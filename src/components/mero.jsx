import { useState } from "react"
import './Form.css'


const Form = () => {
  const [formData,setFormData] = useState({
    Name: "",
    Email: "",
    Phone_Number: "",
    DOB: "",
    City: "",
    Province: "",
    Country: "Nepal",
    Profile_picture: ""
  });

  const [errors, setErrors] = useState();

  const validateForm = ()=>{
    let newErrors = {};

    if (!formData.Name){
      newErrors.Name= 'Name is required';
    }

    if (!formData.Email){
      newErrors.Email= 'Email is required';
    }else if (!isValidEmail(formData.Email)){
      newErrors.Email= "Invalid email format";
    }

    if (!formData.Phone_Number){
      newErrors.Phone_Number= 'Phone number is required';
    }else if (!isValidPhone(formData.Phone_Number)){
      newErrors.Phone_Number = "Phone number must be 7 digits"
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const isValidEmail = (Email) =>{
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(Email);
  }

const isValidPhone = (Phone_Number) =>{
    const phoneRegex = /^\d{7}$/;
    return phoneRegex.test(Phone_Number);
  };

const handleSubmit =(e) => {
    e.preventDeafult();
  };

const handleChange = (e) =>{
    const {name,value} = e.target;

    setFormData({
      formData,
      [name]: value,
    })
  };
  return (
   <form className="form" onSubmit={handleSubmit}>
   <div>
    <label>Name </label>
    <input type="text" name="Name" value={formData.Name} placeholder="Enter your Name" onChange={handleChange}></input>
    {errors.Name && <div className="error">{errors.Name}</div>}
   </div>

   <div>
    <label>Email </label>
    <input type="email" name="Email" value={formData.Email} placeholder="Enter your Email" onChange={handleChange}></input>
    {errors.Email && <div className="error">{errors.Email}</div>}
   </div>

   <div>
    <label>Phone </label>
    <input type="text" name="phone" value={formData.Phone_Number} placeholder="Enter your phone number" onChange={handleChange}></input>
    {errors.Phone_Number && <div className="error">{errors.Phon}</div>}
   </div>

   <div>
    <label>DOB </label>
    <input type="date" name="DOb" value={formData.DOB} onChange={handleChange}></input>
   </div>

    <label>Address: </label>
   <div>
    <label>City </label>
    <input type="text" name="city" value={formData.City} onChange={handleChange}></input>
   </div>
   
   <div>
    <label>Province </label>
    <select name="province" value={formData.Province} onChange={handleChange}>
      <option value="">Select Province</option>
      <option value="">Province 1</option>
      <option value="">Province 2</option>
      <option value="">Province 3</option>
      <option value="">Province 4</option>
      <option value="">Province 5</option>
      <option value="">Province 6</option>
      <option value="">Province 7</option>
    </select>
   </div>

   <div>
    <label>Country </label>
    <input type="text" name="country" value={formData.Country} onChange={handleChange}></input>
   </div>

   <div>
    <label>Profie Picture </label>
    <input type="text" name="country" value={formData.Profile_picture} onChange={handleChange}></input>
   </div>
   
   <button>Submit</button>
   
   </form>
  )
}



import React, { useState, useEffect } from 'react';
import './Form.css'; 

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    district: '',
    province: '',
    country: 'Nepal',
    profilePicture: null,
  });

  
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryList = data.map(country => country.name.common);
        setCountries(countryList);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const [errors, setErrors] = useState({});
  const validate = (name, value) => {
    let error;
    switch (name) {
      case 'name':
        error = value ? '' : 'Name is required';
        break;
      case 'email':
        error = /^\S+@\S+\.\S+$/.test(value) ? '' : 'Email is invalid';
        break;
      case 'phone':
        error = /^\d{7,}$/.test(value) ? '' : 'Phone number must be at least 7 digits';
        break;
      case 'profilePicture':
        error = value && value.type === 'image/png' ? '' : 'Only PNG images are allowed';
        break;
      default:
        error = '';
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validate('profilePicture', file);
    setFormData(prevData => ({
      ...prevData,
      profilePicture: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validate(key, formData[key]);
      if (!formData[key] && key !== 'profilePicture') {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    setErrors(newErrors);

    
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
    }
  };

  return (
   <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div>
        <label htmlFor="dob">DOB:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="district">District:</label>
        <input
          type="text"
          id="district"
          name="district"
          value={formData.district}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="province">Province:</label>
        <select
          id="province"
          name="province"
          value={formData.province}
          onChange={handleChange}
        >
          <option value="">Select a province</option>
          {[1, 2, 3, 4, 5, 6, 7].map(province => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleFileChange}
        />
        {errors.profilePicture && <span>{errors.profilePicture}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>

    <h2>Table</h2>
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.dob}</td>
                <td>{record.city}</td>
                <td>{record.district}</td>
                <td>{record.province}</td>
                <td>{record.country}</td>
                <td>
                  <button onClick={() => handleEdit(startIndex + index)}>Edit</button>
                  <button onClick={() => handleDelete(startIndex + index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
    </table>

   
    
   </>

  
  );
};

export default orm;

export default Form