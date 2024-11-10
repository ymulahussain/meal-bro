import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [targetWeight, setTargetWeight] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [bmr, setBmr] = useState(null);
  const [protein, setProtein] = useState(null);
  const [mealPlan, setMealPlan] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  // Calculate daily protein requirement
  const calculateProtein = (targetWeight) => {
    const minProtein = 1.6 * targetWeight;
    const maxProtein = 2.2 * targetWeight;
    return { min: minProtein, max: maxProtein };
  };

  const generateCustomPrompt = () => {
    const proteinRequirements = calculateProtein(targetWeight);
    const dietaryRestrictionsText = dietaryRestrictions.length
      ? dietaryRestrictions.join(', ')
      : 'none';

    const prompt = `
      Create a 7-day meal plan with 3 meals a day based on the following:
      - Current weight: ${weight} kg
      - Target weight: ${targetWeight} kg
      - Height: ${height} cm
      - Age: ${age} years
      - Gender: ${gender}
      - Dietary restrictions: ${dietaryRestrictionsText}
      - Daily protein needs: ${proteinRequirements.min.toFixed(2)} - ${proteinRequirements.max.toFixed(2)} grams

      Each meal should include ingredients and basic preparation instructions. Also, generate a grocery list for the week.
    `;

    setCustomPrompt(prompt);
  };

  // Handle form submission to get a meal plan from the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const proteinRequirements = calculateProtein(targetWeight);

    try {
      const response = await fetch('/api/generate-meal-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight,
          height,
          age,
          gender,
          targetWeight,
          dietaryRestrictions,
          protein: proteinRequirements,
        }),
      });

      const data = await response.json();
      setMealPlan(data.mealPlan);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };

  // Handle dietary restrictions change
  const handleDietaryChange = (restriction) => {
    setDietaryRestrictions((prev) => {
      if (prev.includes(restriction)) {
        return prev.filter((item) => item !== restriction);
      } else {
        return [...prev, restriction];
      }
    });
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

          <fieldset style={{ marginTop: '20px' }}>
            <legend>Dietary Restrictions:</legend>
            <label>
              <input
                type="checkbox"
                value="vegetarian"
                checked={dietaryRestrictions.includes('vegetarian')}
                onChange={() => handleDietaryChange('vegetarian')}
              />
              Vegetarian
            </label>
            <label style={{ marginLeft: '10px' }}>
              <input
                type="checkbox"
                value="vegan"
                checked={dietaryRestrictions.includes('vegan')}
                onChange={() => handleDietaryChange('vegan')}
              />
              Vegan
            </label>
            <label style={{ marginLeft: '10px' }}>
              <input
                type="checkbox"
                value="gluten-free"
                checked={dietaryRestrictions.includes('gluten-free')}
                onChange={() => handleDietaryChange('gluten-free')}
              />
              Gluten-Free
            </label>
            <label style={{ marginLeft: '10px' }}>
              <input
                type="checkbox"
                value="dairy-free"
                checked={dietaryRestrictions.includes('dairy-free')}
                onChange={() => handleDietaryChange('dairy-free')}
              />
              Dairy-Free
            </label>
          </fieldset>

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
            Generate Meal Plan
          </button>
        </form>

        {/* Button to Generate Custom Prompt */}
        <button
          onClick={generateCustomPrompt}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Generate Prompt for ChatGPT
        </button>

        {/* Display Custom Prompt for Copying */}
        {customPrompt && (
          <div style={{ marginTop: '20px', width: '80%', textAlign: 'left' }}>
            <h3>Generated Prompt for ChatGPT:</h3>
            <textarea 
              readOnly 
              value={customPrompt} 
              rows="10" 
              style={{
                width: '100%', 
                padding: '10px', 
                fontSize: '16px', 
                resize: 'none', 
                borderRadius: '5px', 
                border: '1px solid #ccc',
              }}
            />
            <p>
              Copy the prompt above, then click 
              <a 
                href="https://chat.openai.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ marginLeft: '5px', color: '#61dafb' }}
              >
                here to paste it into ChatGPT
              </a>.
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
