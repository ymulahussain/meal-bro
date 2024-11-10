import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // Default to "male"
  const [targetWeight, setTargetWeight] = useState('');
  const [bmr, setBmr] = useState(null);
  const [protein, setProtein] = useState(null);

  // Function to calculate BMR
  const calculateBmr = (weight, height, age, gender) => {
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Function to calculate daily protein requirement
  const calculateProtein = (targetWeight) => {
    // Using 1.6 to 2.2 grams of protein per kg of target weight
    const minProtein = 1.6 * targetWeight;
    const maxProtein = 2.2 * targetWeight;
    return { min: minProtein, max: maxProtein };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedBmr = calculateBmr(weight, height, age, gender);
    const calculatedProtein = calculateProtein(targetWeight);
    setBmr(calculatedBmr);
    setProtein(calculatedProtein);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Meal Prep Bot</h1>
        
        {/* BMR and Protein Calculation Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <label>
            Enter your weight (in kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
              required
              style={{
                marginLeft: '10px',
                padding: '5px',
                fontSize: '16px',
                textAlign: 'center',
              }}
            />
          </label>

          <label style={{ marginTop: '10px' }}>
            Enter your target weight (in kg):
            <input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="e.g., 65"
              required
              style={{
                marginLeft: '10px',
                padding: '5px',
                fontSize: '16px',
                textAlign: 'center',
              }}
            />
          </label>

          <label style={{ marginTop: '10px' }}>
            Enter your height (in cm):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 170"
              required
              style={{
                marginLeft: '10px',
                padding: '5px',
                fontSize: '16px',
                textAlign: 'center',
              }}
            />
          </label>

          <label style={{ marginTop: '10px' }}>
            Enter your age (in years):
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 25"
              required
              style={{
                marginLeft: '10px',
                padding: '5px',
                fontSize: '16px',
                textAlign: 'center',
              }}
            />
          </label>

          <label style={{ marginTop: '10px' }}>
            Select your gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{
                marginLeft: '10px',
                padding: '5px',
                fontSize: '16px',
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <button
            type="submit"
            style={{
              display: 'block',
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Calculate BMR & Protein
          </button>
        </form>

        {/* Display BMR and Protein Results */}
        {bmr && (
          <p style={{ marginTop: '20px', fontSize: '18px' }}>
            Your estimated BMR is: {bmr.toFixed(2)} calories/day
          </p>
        )}
        {protein && (
          <p style={{ fontSize: '18px' }}>
            To maintain muscle mass, aim for {protein.min.toFixed(2)} - {protein.max.toFixed(2)} grams of protein per day.
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
