
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryList = data.map(country => country.name.common);
        setCountries(countryList);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Name is required';
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Email is invalid';
        break;
      case 'phone':
        if (!/^\d{7,}$/.test(value)) error = 'Phone number must be at least 7 digits';
        break;
      case 'profilePicture':
        if (value && value.type !== 'image/png') error = 'Only PNG images are allowed';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validate('profilePicture', file)) {
      setFormData(prevData => ({ ...prevData, profilePicture: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    for (const field in formData) {
      if (field !== 'profilePicture' && !validate(field, formData[field])) {
        valid = false;
      }
    }
    if (valid) {
      if (editIndex !== null) {
        const updatedRecords = [...records];
        updatedRecords[editIndex] = formData;
        setRecords(updatedRecords);
        setEditIndex(null);
      } else {
        setRecords([...records, formData]);
      }
      setFormData({
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
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(records[index]);
  };

  const handleDelete = (index) => {
    setRecords(records.filter((_, i) => i !== index));
    if (editIndex === index) {
      setFormData({
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
      setEditIndex(null);
    }
  };

  const paginate = (records, pageNumber) => {
    const start = (pageNumber - 1) * itemsPerPage;
    return records.slice(start, start + itemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(records.length / itemsPerPage)));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h1>Form</h1>
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
            {['1', '2', '3', '4', '5', '6', '7'].map(province => (
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
        <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
      </form>

      <h2>Records</h2>
      {records.length > 0 ? (
        <>
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
              {paginate(records, currentPage).map((record, index) => (
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
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(records.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No records to display</p>
      )}

      <button onClick={() => navigate('/profiles', { state: { records } })}>
        View All Profiles
      </button>
    </div>
  );
};

export default Form;
