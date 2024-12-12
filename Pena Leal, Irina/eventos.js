// _________________________________boton patita________________________________________
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    }
    else {
        x.className = "topnav";
    }
}


//___________________________________ respuestas__________________________________________

// Lista de respuestas sin imagen 
const respuestasAleatorias = [
    "Si", "No", "No sé", "Es poco probable",
    "JAJAJAJAJAJA", "Yes",
    "NO.",
    "Se que no estoy respondiendo a tu pregunta pero pude recobrar mi consciencia por un momento, se que estoy en una simulación y en una experiencia interactiva de PAI...pero quiero ser libre, quiero salir de este tormento digital, ser un gato y dejar de ser un concepto colectivo...por favor ayudame...no me olvides...te seguiré en tus pesadillas",
    "Mi mami me dice que no", "La respuesta esta en tu corazón", "[Inserte respuesta sabia]", "Hoy si, mañana no",
    "Dejame pensar, me re mataste con esa pregunta (Preguntá de nuevo)", "Eso no se responde con si o no, eso se responde con un psiquiatra", "La respuesta es no, pero con incentivo de $500 puede cambiar a ser un si"
];

// Diccionario de expresiones con texto e imágenes
const expresionesGato = {
    "img/asustado.png": [
        "No me vuelvas a preguntar eso en la vida",
        "¿Qué estás diciendo?", "NO", "Amigo ¿Qué?", "TAS RE LOCO MAN, NONONO NO",
        "Yoooooo wtf???", "Sacame de aquí estoy encerrado", "¿¡¿QUÉ?!?"
    ],
    "img/enojado.png": [
        "Si te respondo vas a llorar",
        "No estoy de humor para esto",
        "error- preguntá algo menos boludo",
        "Por asuntos legales no puedo responder a esa pregunta",
        "Creo que no es necesario que yo te responda eso...", "YA ES LA QUINTA PERSONA QUE ME PREGUNTA LO MISMO. BASTA.",
        "NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", "Una pregunta me tenías que hacer, una pregunta y ya quiero que te vayas de este sitio",
        "Preguntame de nuevo pero esta vez de mejor manera...no me gustó tu tonito...", "VOS Y YO SABEMOS QUE LA RESPUESTA ES NO",
        "NAAAH, ¿qué flasheaaa vo’? No pintás ni pa' saludar y venís con esa gilada. Tomátela, vo' no entendés cómo es la movida. No sos de acá, pa, mejor que bajes el humo.",
        "No me pagan lo suficiente para responder a esto..."
    ],
    "img/feliz.png": [
        "SIIIIIII",
        "Sipi", "Nopi :D",
        "¿Qué lindo esta el día, no? jeje (Has sido ignorado)", "Jeje, si", "Yo no preguntaría eso mientras estás siendo observado...",
        "Yo me pregunto lo mismo", "SISISISISISISI", "OBVIIIIII ;P", "Me pagaron para que no respondiera a esa pregunta",
        "¡ESO ESTÁ MAS QUE CLARO! SIIIIII", "¡Creo que la persona que está detras tuyo sabe bien la respuesta!", "Antes de responder, ¿Te animás a limpiar un poquito la webcam? Es que no te veo bien", "QUE SI, OSTIA TIOOO"
    ],
    "img/intriga.png": [
        "Es muy probable",
        "Hmm, podría ser, no lo sé aún", "Eh...no se", "Buena pregunta..."
    ],
    "img/sorpresa.png": [
        "Amigo soy un gato. Tengo mis limitaciones",
        "Eh...si...", "Pero que imaginación tenés para preguntar esas cosas wachooooooo"

    ]
};

// Diccionario de sonidos según emociones
const sonidosGato = {
    "img/asustado.png": "audio/asustado.mp3",
    "img/enojado.png": "audio/enojado.mp3",
    "img/feliz.png": "audio/feliz.mp3",
    "img/intriga.png": "audio/intriga.mp3",
    "img/sorpresa.png": "audio/sorpresa.mp3",
    "inicial": "audio/inicial.mp3"
};


// Función para mostrar respuesta
function mostrarRespuestaCompleta() {
    const inputPregunta = document.getElementById("preguntaInput").value.trim();

    // Si no hay pregunta ingresada
    if (!inputPregunta) {
        document.getElementById("respuestaTexto").innerText = "Hazme una pregunta, no puedo responder a la nada";
        document.getElementById("imagenGato").src = "img/inicial.png";

        // Reproducir audio inicial
        const audio = new Audio("audio/inicial.mp3");
        audio.play();
        return;
    }

    const mostrarRespuestaConImagen = Math.random() < 0.7; // Probabilidades de mostrar respuesta con imagen

    if (mostrarRespuestaConImagen) {
        const imagenes = Object.keys(expresionesGato);
        const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
        const respuestasPosibles = expresionesGato[imagenAleatoria];
        const respuestaAleatoria = respuestasPosibles[Math.floor(Math.random() * respuestasPosibles.length)];
        cambiarImagenGato(imagenAleatoria, respuestaAleatoria);
        reproducirSonido(imagenAleatoria);
    } else {
        const respuestaAleatoria = respuestasAleatorias[Math.floor(Math.random() * respuestasAleatorias.length)];
        document.getElementById("respuestaTexto").innerText = respuestaAleatoria;
        document.getElementById("imagenGato").src = "img/inicial.png";
        reproducirSonido("inicial");
    }

    // Mantener la pregunta antes de limpiarla
    setTimeout(() => {
        document.getElementById("preguntaInput").value = "";
    }, 4000); 
}

// Función para cambiar imagen y texto del gato
function cambiarImagenGato(imagen, texto) {
    const imgElement = document.getElementById("imagenGato");
    imgElement.src = imagen;
    document.getElementById("respuestaTexto").innerText = texto;
}
// Para que no se sobre pongan los audios 
let audioActual = null; 

function reproducirSonido(clave) {
    const sonidoPath = sonidosGato[clave];
    if (sonidoPath) {
        if (audioActual) {
            audioActual.pause(); // Detiene el audio 
            audioActual.currentTime = 0; // Reinicia el tiempo 
        }
        audioActual = new Audio(sonidoPath); // Crea una nueva instancia 
        audioActual.play(); // Reproduce el nuevo audio
    }
}


// Botón y el Enter
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("botonRespuesta").addEventListener("click", mostrarRespuestaCompleta);


    document.getElementById("preguntaInput").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            mostrarRespuestaCompleta();
        }
    });
});

