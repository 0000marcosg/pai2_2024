// Rutas de las imágenes para cada disfraz
const imagenes = [
    ["gato1_disfraz1.png", "gato1_disfraz2.png"],
    ["gato2_disfraz1.png", "gato2_disfraz2.png"],
    ["gato3_disfraz1.png", "gato3_disfraz2.png"],
    ["gato4_disfraz1.png", "gato4_disfraz2.png"],
    ["gato5_disfraz1.png", "gato5_disfraz2.png"]
  ];

  

 
  
  document.querySelectorAll(".gato").forEach((gato, index) => {
    let contador = 0;
  
    // Asignar la primera imagen de cada gato al fondo
    gato.style.backgroundImage = `url(gatitos/${imagenes[index][contador]})`;
  
    let X =  numeroAleatorioEntre(20,80)
    let Y =  numeroAleatorioEntre(20,80)
    let selector = `#gato${index+1}`;
document.querySelector(selector).style.left = X + "%";
    document.querySelector(selector).style.top = Y + "%";


    // Mostrar imagen al pasar el mouse
    gato.addEventListener("mouseover", () => {
      gato.style.opacity = 1;
    });

    
  
    // Cambiar imagen al hacer clic
    gato.addEventListener("click", () => {
      contador = (contador + 1) % imagenes[index].length; 
      gato.style.backgroundImage = `url(gatitos/${imagenes[index][contador]})`;
      let sonido = new Audio ("gatitos/"+(1+index)+".m4a")
      sonido.currentTime = 0; // Reinicia el sonido si ya está en reproducción
      sonido.volume = 0.1;


      sonido.play();

     
    });

    gato.addEventListener("mouseleave", () => {
        setTimeout(() => {
            gato.style.opacity = "0"; // Hace que el elemento se desvanezca
            
          }, 500); // Tiempo antes de que comience a desaparecer (2000 ms = 2 segundos)
    });

  });
  

  function numeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  