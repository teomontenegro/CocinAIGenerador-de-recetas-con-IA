async function generarReceta() {
  const ingredientes = document.getElementById("ingredientes").value;
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "Generando receta...";

  try {
    const respuesta = await fetch("/receta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredientes })
    });

    const data = await respuesta.json();

    if (data.receta) {
      resultadoDiv.innerText = data.receta;
    } else {
      resultadoDiv.innerText = "Hubo un error generando la receta. Intentá de nuevo.";
    }
  } catch (error) {
    resultadoDiv.innerText = "Error de conexión con el servidor.";
  }
}