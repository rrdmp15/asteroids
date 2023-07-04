fetch('http://localhost:5510/asteroids')
.then(response => response.json())
.then(data => {
  const asteroides = data;

  let asteroidListHTML = '<ul>';
  asteroides.forEach(asteroide => {
    asteroidListHTML += `
      <li>
        <strong>Nombre:</strong> ${asteroide.nombre}<br>
        <strong>Tamaño:</strong> ${asteroide.tamaño.toFixed(2)} metros<br>
        <strong>Velocidad:</strong> ${asteroide.velocidad} km/h<br>
        <strong>Fecha de Aproximación:</strong> ${asteroide.fechaAproximacion}<br>
      </li>
    `;
  });
  asteroidListHTML += '</ul>';

  const asteroidListElement = document.getElementById('asteroid-list');
  asteroidListElement.innerHTML = asteroidListHTML;
})
.catch(error => {
  console.error('Ocurrió un error al obtener los asteroides:', error);
});