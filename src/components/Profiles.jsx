
import React from 'react';
import { useLocation } from 'react-router-dom';

const Profiles = () => {
  const location = useLocation();
  const records = location.state?.records || [];

  return (
    <div>
      <h1>Profiles</h1>
      {records.length > 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.dob}</td>
                <td>{record.city}</td>
                <td>{record.district}</td>
                <td>{record.province}</td>
                <td>{record.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No profiles to display</p>
      )}
    </div>
  );
};

export default Profiles;
