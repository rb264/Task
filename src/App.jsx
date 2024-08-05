
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Profiles from './components/Profiles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </Router>
  );
}

export default App;
