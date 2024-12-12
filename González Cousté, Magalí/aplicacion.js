const fortunas=[
    "Vas a aprobar PAI II !!!!!", "Cuando te vayas vas a perder el bondi", "Todo es posible, incluso que te vuelva a hablar tu ex", "Algún día todo tendrá sentido… pero hoy no es ese día", "Si tenés un problema, no te preocupes ¡siempre puede ser peor!", "Podés hacerlo. No sabemos qué, pero algo vas a hacer", "Tu creatividad no tiene límites… aunque tu cuenta bancaria sí", "Lo importante no es ganar, es llegar a fin de mes", "La creatividad es tu fuerte, la organización no tanto", "Siempre mirá el lado positivo, pero no te pongas muy intenso", "No existe problema sin solución, solo momentos de baja inspiración", "La vida tiene sus vueltas, y a veces uno se marea", "La paciencia es clave, o eso dicen para que no te quejes", "Hoy es un buen día para hacer un shot de vodka", "Hoy no tenes fortuna", "Si algo puede salir mal, probablemente lo haga", "Hoy es un día perfecto para hacer nada", "La felicidad está en los pequeños detalles, como esa siesta que estás planeando", "Sonreí, podría ser peor… podría ser lunes", "Lo bueno de tocar fondo es que no podés caer más bajo… en teoría", "No te preocupes, a todos nos está yendo mal", "Lo bueno de no tener expectativas es que nunca te decepcionás", "No importa si ganás o perdés… total, nadie está mirando", "Tus problemas tienen solución… pero vos no tenés ganas de buscarlas", "No importa cuántas puertas se cierren, siempre podés quedarte afuera", "Si te esforzás, podrías lograr todo lo que no querés hacer", "No es mala suerte, simplemente sos vos tomando decisiones", "Sos joven, tenés energía… o al menos eso dicen, porque no se nota", "Mirá para los dos lados cuando cruces la calle...", "El sueño que tengas esta noche se va a hacer realidad", "Mandá el mensaje", "La proxima persona que entre a la habitaciòn va a ser el amor de tu vida", "Este año ya conociste a tu alma gemela", "Si lo intentás lo suficiente, puede que igual no pase nada", "La vida no es difícil… vos la complicás", "Si nadie te odia, entonces no estás intentando lo suficiente", "Si seguís esperando el momento perfecto, te vas a jubilar esperando", "Dejá de escuchar música mala... sí, vos", "A veces solo tenés que decir ya fue y seguir", "Date contra la pared mil veces...capaz a la mil y una te das cuenta que por ahí no es", "Bajá un poco tu screen time", "Hoy probá algo nuevo, lo que sea", "Podrías cambiarte el look ¿no?", "Si todos a tu alrededor son el problema...capaz sos vos el problema", "Relajate, nada más", "El que quiere hace, pero vos querés y no hacés", "El que no arriesga no gana"
]
var audio = new Audio('glitter.mp3');
function mostrarMensaje(){
    let mensajeContenedor=document.getElementById("contenedorMensaje");
    let estaOculto=mensajeContenedor.classList.contains("show");
    let mensaje=document.getElementById("mensaje");
    if(!estaOculto){
        let indice=Math.floor(Math.random() * fortunas.length );
        mensaje.innerHTML=fortunas[indice];
        audio.play();
        mensaje.classList.remove("hidden"); 
    }
    else{
        mensaje.classList.add("hidden");
    }
    mensajeContenedor.classList.toggle("show");
}
