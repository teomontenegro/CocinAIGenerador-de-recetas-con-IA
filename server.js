const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/receta', async (req, res) => {
  const { ingredientes } = req.body;
  const prompt = `Tengo estos ingredientes: ${ingredientes}. ¿Qué receta puedo hacer? Respondé con una receta paso a paso.`;

  try {
    const respuesta = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer TU_API_KEY'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await respuesta.json();
    const receta = data.choices?.[0]?.message?.content;
    res.json({ receta });
  } catch (error) {
    console.error('Error al generar receta:', error);
    res.status(500).json({ receta: null });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});