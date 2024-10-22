import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [salary, setSalary] = useState('');
  const [netSalary, setNetSalary] = useState(null);
  const [error, setError] = useState('')

  const calculateNetSalary = async (e) => {
    e.preventDefault();
    if (parseFloat(salary) <= 0) {
      setError('Enter a value gretar than 0')
    }
    try {
      const response = await axios.post('http://localhost:5000/calculate', { salary });
      setNetSalary(response.data.netSalary);
    } catch (error) {
      console.error('Error calculating salary:', error);
      setError(error)
    }
  };

  return (
    <div className="app">
      <div className='form-style'>
        <h1>Quick Salary Estimator</h1>
        <form onSubmit={calculateNetSalary}>
          <label htmlFor='salary'>Enter Your Salary:</label><br />
          <input
            type="number"
            placeholder="Basic Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          /><br />
          <button type="submit" id="button">Calculate Net Salary</button>
        </form>
      </div>
      {error && (<p className='error'>{error}</p>)}
      {netSalary !== null && (
        <div className="result">
          <h2>Estimated Net Salary: {netSalary}</h2>
        </div>
      )}

    </div>
  );
};

export default App;


