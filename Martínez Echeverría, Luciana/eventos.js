document.addEventListener('DOMContentLoaded', function () {
	const btnEmpezar = document.getElementById('btn-empezar');
	const pantallaInicial = document.getElementById('pantalla-inicial');
	const contenidoPrincipal = document.getElementById('contenido-principal');
	const footer = document.querySelector('.footer');
  
	// Mostrar contenido 
	btnEmpezar.addEventListener('click', () => {
	  pantallaInicial.style.display = 'none'; 
	  contenidoPrincipal.style.display = 'grid'; 
	  footer.style.display = 'block'; 
	});
  
	// Animaciones 
	const cuadrados = document.querySelectorAll('.cuadrado');
  
	cuadrados.forEach(cuadrado => {
	  const audio = cuadrado.querySelector('audio');
	  const img = cuadrado.querySelector('img');
  
	  cuadrado.addEventListener('mouseenter', () => {
		cuadrado.classList.add('animate');
		img.classList.add('visible');
		if (audio) {
		  audio.currentTime = 0;
		  audio.play();
		}
	  });
  
	  cuadrado.addEventListener('mouseleave', () => {
		setTimeout(() => {
		  img.classList.remove('visible');
		}, 3000);
		setTimeout(() => {
		  cuadrado.classList.remove('animate');
		}, 10000);
	  });
	});
  });