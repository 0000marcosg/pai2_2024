let rotacionAcumulada = 0; 

document.getElementById('btnGirar').onclick = function() {
    const imagen = document.getElementById('ruleta');
    const boton = document.getElementById('btnGirar');
    const fraseContenedor = document.getElementById('mensaje');
    const frases = [
        "QUE TENGAS UN LINDO DÍA :)",
        "HOY ES TU DÍA DE SUERTE",
        "DECILE QUE SI A ESA PROPUESTA",
        "ESCUCHATE A VOS",
        "NO TE ENOJES TANTO, TE VA A HACER MAL",
        "TODO PASA POR ALGO",
        "ALGUIEN CERCANO TE ESTÁ MINTIENDO",
        "HACÉ LO QUE TE HAGA FELÍZ",
        "HOY ES UN BUEN DÍA PARA UNA JUNTADA CON AMIGOS",
        "NO TE PONGAS MÁS EXCUSAS Y ARRANCÁ CON ESO QUE QUERÉS",
        "TRABAJÁ DURO, LA RECOMPENSA VENDRÁ PROTNO",
        "ALEJATE DE LAS MALAS ENERGIAS",

    ];
    
    
    boton.style.display = "none";

    
    const vueltasCompletas = 5; 
    const anguloFinal = Math.floor(Math.random() * 360); 
    const rotacionTotal = vueltasCompletas * 360 + anguloFinal; 

   
    rotacionAcumulada += rotacionTotal;

    
    imagen.style.transform = `rotate(${rotacionAcumulada}deg)`;

   
    imagen.addEventListener('transitionend', function mostrarMensaje() {
        
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        fraseContenedor.textContent = fraseAleatoria;

        
        fraseContenedor.classList.add('mostrar-frase');

        
        setTimeout(() => {
            fraseContenedor.classList.remove('mostrar-frase');
            boton.style.display = "block";
        }, 3000);

        
        imagen.removeEventListener('transitionend', mostrarMensaje);
    });
};
