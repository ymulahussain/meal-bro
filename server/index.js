require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

// Endpoint to generate meal plan
app.post('/api/generate-meal-plan', async (req, res) => {
  const { weight, height, age, gender, targetWeight, dietaryRestrictions = [], protein } = req.body;

  const prompt = `
    Create a 7-day meal plan with 3 meals a day based on the following:
    - Current weight: ${weight} kg
    - Target weight: ${targetWeight} kg
    - Height: ${height} cm
    - Age: ${age} years
    - Gender: ${gender}
    - Dietary restrictions: ${dietaryRestrictions.join(', ') || 'none'}
    - Daily protein needs: ${protein.min.toFixed(2)} - ${protein.max.toFixed(2)} grams

    Each meal should include ingredients and basic preparation instructions. Also, generate a grocery list for the week.
  `;
  
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "gpt-4",
      prompt,
      max_tokens: 1500,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const mealPlan = response.data.choices[0].text;
    res.json({ mealPlan });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({ error: "Error generating meal plan" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
