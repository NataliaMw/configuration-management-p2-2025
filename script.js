document.getElementById("estudianteForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se recargue

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const expectativas = document.getElementById("expectativas").value;

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `
    <strong>¡Formulario enviado con éxito!</strong><br>
    Nombre completo: ${nombre} ${apellido}<br>
    Edad: ${edad}<br>
    Expectativas: ${expectativas}
  `;
  resultadoDiv.style.display = "block";

  // Opcional: limpiar formulario
  this.reset();
});
