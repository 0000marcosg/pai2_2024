 /*Selecciona todos los elementos que pueden ser arrastrados*/
 const draggables = document.querySelectorAll('.draggable');
 const mochila = document.querySelector('.container-mochila');
 const contadorDisplay = document.getElementById('contador'); /*Elemento para mostrar el contador*/
 let contador = 0; 
 const cartel = document.getElementById('cartel');
 const mensaje = document.getElementById('mensaje');
 let objetosEnMochila = []; 

 /*Permite que los elementos sean arrastrables*/
 draggables.forEach(draggable => {
     draggable.setAttribute('draggable', true);


     
     draggable.addEventListener('dragstart', (e) => {
         e.dataTransfer.setData('text/plain', e.target.id);
     });
 });

 /*Permite que la mochila reciba el objeto*/
 mochila.addEventListener('dragover', (e) => {
     e.preventDefault();
 });


 mochila.addEventListener('drop', (e) => {
     e.preventDefault();
     if (contador === 6) {
     mostrarCartel();
     return; /*Evita añadir más objetos*/
 }
     const id = e.dataTransfer.getData('text');
     const elemento = document.getElementById(id);
     
     if (elemento && !objetosEnMochila.includes(id)) {

         elemento.style.display = 'none'; /*Oculta el elemento cuando se suelta en la mochila*/
         objetosEnMochila.push(id); 
         contador++; /*Incrementa el contador*/
         contadorDisplay.textContent = `${contador}/6`;
       
     }
     if (contador === 6) {
         mostrarCartel()
     }
 });

 function mostrarCartel() {
 
/*CONDICIONES*/

  if (contador === 6 && objetosEnMochila.includes("camarita") && objetosEnMochila.includes("vape") && objetosEnMochila.includes("nivea")) {
     mensaje.textContent = "SOS UNA IT GIRL/BOY!"; descripcion.textContent = "Siempre listx para capturar el momento perfecto, cuidas cada detalle. Tu personalidad es vibrante y a la moda, marcás tendencia de manera natural, convirtiendo lo cotidiano en algo chic.";
     cartel.style.display = 'flex'; 

} else if (contador === 6 && objetosEnMochila.includes("vaso") && objetosEnMochila.includes("vape") && objetosEnMochila.includes("nivea")) {
    mensaje.textContent = "SOS UNA IT GIRL/BOY!"; descripcion.textContent = "Siempre listx para capturar el momento perfecto, cuidas cada detalle. Tu personalidad es vibrante y a la moda, marcás tendencia de manera natural, convirtiendo lo cotidiano en algo chic.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("camarita") && objetosEnMochila.includes("tabaco") &&             objetosEnMochila.includes("lentes")) {
    mensaje.textContent = "SOS UNA IT GIRL/BOY!"; descripcion.textContent = "Siempre listx para capturar el momento perfecto, cuidas cada detalle. Tu personalidad es vibrante y a la moda, marcás tendencia de manera natural, convirtiendo lo cotidiano en algo chic.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("desodorante") && objetosEnMochila.includes("nivea") && objetosEnMochila.includes("perifar")) {
    mensaje.textContent = "SOS COQUETX"; descripcion.textContent = "Llevas contigo tus escenciales, sos una persona práctica y detallista, que le gusta estar preparada para cualquier circunstancia. Sea lo que sea que alguien necesite, sabe que puede contar con vos! ";
    cartel.style.display = 'flex'; 

} else if (contador === 6 && objetosEnMochila.includes("desodorante") && objetosEnMochila.includes("chicles") && objetosEnMochila.includes("perifar")) {
    mensaje.textContent = "SOS COQUETX"; descripcion.textContent = "Llevas contigo tus escenciales, sos una persona práctica y detallista, que le gusta estar preparada para cualquier circunstancia. Sea lo que sea que alguien necesite, sabe que puede contar con vos! ";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("desodorante") && objetosEnMochila.includes("nivea") && objetosEnMochila.includes("espejo")) {
    mensaje.textContent = "SOS COQUETX"; descripcion.textContent = "Llevas contigo tus escenciales, sos una persona práctica y detallista, que le gusta estar preparada para cualquier circunstancia. Sea lo que sea que alguien necesite, sabe que puede contar con vos! ";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("desodorante") && objetosEnMochila.includes("nivea") && objetosEnMochila.includes("chicles")) {
    mensaje.textContent = "SOS COQUETX"; descripcion.textContent = "Llevas contigo tus escenciales, sos una persona práctica y detallista, que le gusta estar preparada para cualquier circunstancia. Sea lo que sea que alguien necesite, sabe que puede contar con vos! ";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("tabaco") && objetosEnMochila.includes("encendedor")&& objetosEnMochila.includes("boletera") && objetosEnMochila.includes("galletitas")) {
    mensaje.textContent = "EL/LA AVENTURERX"; descripcion.textContent = "Sos patriota de disfrutar el momento, llevás lo esencial para pasar largas horas en buena compañía. Sos una persona relajada pero divertida, todxs necesitan un amigx como vos!";
    cartel.style.display = 'flex'; 

} else if (contador === 6 && objetosEnMochila.includes("cuadernola") && objetosEnMochila.includes("lapicera")&& objetosEnMochila.includes("marley")) {
     mensaje.textContent = "SOS ORGANIZADX"; descripcion.textContent = "Sos una persona apasionada y organizada, siempre preparadx para plasmar tus ideas. Tenés el café siempre en mano para mantenerte concentradx, sabés equilibrar energía y claridad en tu día a día." ;
     cartel.style.display = 'flex'; 
 
} else if (contador === 6 && objetosEnMochila.includes("cuadernola") && objetosEnMochila.includes("lapicera")&& objetosEnMochila.includes("agua")) {
     mensaje.textContent = "SOS ORGANIZADX"; descripcion.textContent = "Sos una persona apasionada y organizada, siempre preparadx para plasmar tus ideas. Tenés el café siempre en mano para mantenerte concentradx, sabés equilibrar energía y claridad en tu día a día." ;
     cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("mate") && objetosEnMochila.includes("tabaco")&& objetosEnMochila.includes("compu") && objetosEnMochila.includes("chicles")) {
     mensaje.textContent = "SOS EL AMIGX DEL MATE"; descripcion.textContent = "Tenés el mate pegado al brazo, pero tus compañeros te quieren porque siempre compartís. Sos una persona proactiva, siempre necesitás estar haciendo algo, seguro sos el/la que encarás en los trabajos grupales, gracias! " ;
     cartel.style.display = 'flex';

 } else if (contador === 6 && objetosEnMochila.includes("mate") && objetosEnMochila.includes("agua")&& objetosEnMochila.includes("compu")) {
    mensaje.textContent = "SOS EL AMIGX DEL MATE"; descripcion.textContent = "Tenés el mate pegado al brazo, pero tus compañeros te quieren porque siempre compartís. Sos una persona proactiva, siempre necesitás estar haciendo algo, seguro sos el/la que encarás en los trabajos grupales, gracias! " ;
    cartel.style.display = 'flex'; 

} else if (contador === 6 && objetosEnMochila.includes("mate") && objetosEnMochila.includes("cuadernola")&& objetosEnMochila.includes("lapicera")) {
    mensaje.textContent = "SOS EL AMIGX DEL MATE"; descripcion.textContent = "Tenés el mate pegado al brazo, pero tus compañeros te quieren porque siempre compartís. Sos una persona proactiva, siempre necesitás estar haciendo algo, seguro sos el/la que encarás en los trabajos grupales, gracias! " ;
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("compu") && objetosEnMochila.includes("marley")&& objetosEnMochila.includes("auriculares") && objetosEnMochila.includes("agua")) {
     mensaje.textContent = "EL/LA RACIONAL"; descripcion.textContent = "Sos de esas personas sencillas pero centradas, que valoran la eficiencia y la claridad. Tu computadora es tu herramienta principal, con la que creás. Sos tranquilx, prácticx y con los pies en la tierra, tenés tus metas claras." ;  
     cartel.style.display = 'flex'; 

} else if (contador === 6 && objetosEnMochila.includes("compu") && objetosEnMochila.includes("libro")&& objetosEnMochila.includes("auriculares") && objetosEnMochila.includes("agua")) {
     mensaje.textContent = "EL/LA RACIONAL"; descripcion.textContent = "Sos de esas personas sencillas pero centradas, que valoran la eficiencia y la claridad. Tu computadora es tu herramienta principal, con la que creás. Sos tranquilx, prácticx y con los pies en la tierra, tenés tus metas claras." ;  
     cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("compu") && objetosEnMochila.includes("monster")&& objetosEnMochila.includes("auriculares") && objetosEnMochila.includes("sketchbook")) {
     mensaje.textContent = "SOS EL/LA CREATIVX"; descripcion.textContent = "Sos un apasionadx por la creatividad, en tu mochila tenés lo necesario para cualquier circunstancia. Te gusta estar al día con las novedades y seguro sos de esos que saben un montón de los temas más rotundos, siempre tenés un dato interesante! " ;  
     cartel.style.display = 'flex'; 

} else if (contador === 6 && objetosEnMochila.includes("lapicera") && objetosEnMochila.includes("auriculares") && objetosEnMochila.includes("sketchbook")) {
    mensaje.textContent = "SOS EL/LA CREATIVX"; descripcion.textContent = "Sos un apasionadx por la creatividad, en tu mochila tenés lo necesario para cualquier circunstancia. Te gusta estar al día con las novedades y seguro sos de esos que saben un montón de los temas más rotundos, siempre tenés un dato interesante! " ;  
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("piedras") && objetosEnMochila.includes("tabaco") && objetosEnMochila.includes("libro")) {
    mensaje.textContent = "SOS HIPPIE"; descripcion.textContent = "Sos una persona conectada con las energías de su entorno, siempre en busca de equilibrio y paz interior. Sos de esas personas calladas y reflexivas, pero seguro das los mejores consejos. En tu mochila tenés todo lo necesario para pasar el rato." ;  
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("piedras") && objetosEnMochila.includes("auriculares") && objetosEnMochila.includes("libro")) {
    mensaje.textContent = "SOS HIPPIE"; descripcion.textContent = "Sos una persona conectada con las energías de su entorno, siempre en busca de equilibrio y paz interior. Sos de esas personas calladas y reflexivas, pero seguro das los mejores consejos. En tu mochila tenés todo lo necesario para pasar el rato." ;  
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("piedras") && objetosEnMochila.includes("libro") && objetosEnMochila.includes("sketchbook")) {
    mensaje.textContent = "SOS HIPPIE"; descripcion.textContent = "Sos una persona conectada con las energías de su entorno, siempre en busca de equilibrio y paz interior. Sos de esas personas calladas y reflexivas, pero seguro das los mejores consejos. En tu mochila tenés todo lo necesario para pasar el rato." ;  
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("piedras") && objetosEnMochila.includes("tabaco") && objetosEnMochila.includes("libro")) {
    mensaje.textContent = "SOS HIPPIE"; descripcion.textContent = "Sos una persona conectada con las energías de su entorno, siempre en busca de equilibrio y paz interior. Sos de esas personas calladas y reflexivas, pero seguro das los mejores consejos. En tu mochila tenés todo lo necesario para pasar el rato." ;  
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("vape") && objetosEnMochila.includes("lentes") && objetosEnMochila.includes("auriculares")) {
     mensaje.textContent = "SOS COOL"; descripcion.textContent = "Sos el amigx manija, te sumas a todas, salís todos los findes y vivís en VSCO editando para tu próximo dump de instagram" ;  
     cartel.style.display = 'flex'; 

} else if (contador === 6 && objetosEnMochila.includes("vape") && objetosEnMochila.includes("lentes") && objetosEnMochila.includes("camarita")) {
    mensaje.textContent = "SOS COOL"; descripcion.textContent = "Sos el amigx manija, te sumas a todas, salís todos los findes y vivís en VSCO editando para tu próximo dump de instagram" ;  
    cartel.style.display = 'flex';  

} else if (contador === 6 && objetosEnMochila.includes("manzana") && objetosEnMochila.includes("agua") && objetosEnMochila.includes("barrita")) {
     mensaje.textContent = "SOS UN GYMRAT"; descripcion.textContent = "De la facu directo al gym, simepre con una playlist bien arriba y algo para comer en tu mochila. Estas cansadx de que la gente te pregunte por tu rutina." ;  
     cartel.style.display = 'flex';  

} else if (contador === 6 && objetosEnMochila.includes("manzana") && objetosEnMochila.includes("galletitas")&& objetosEnMochila.includes("colet")) {
     mensaje.textContent = "LA/EL DE LOS SNACKS"; descripcion.textContent = "Tu mochila parece un kiosco pero tus amigxs te adoran porque siempre sacas algo para compartir en la facu." ;  
     cartel.style.display = 'flex';  

} else if (contador === 6 && objetosEnMochila.includes("manzana") && objetosEnMochila.includes("agua")&& objetosEnMochila.includes("compu")) {
     mensaje.textContent = "LA/EL SANX"; descripcion.textContent = "Sos la definición de constancia, todos aspiramos a llevar tu vida y tener tu organización." ;  
     cartel.style.display = 'flex';
     
} else if (contador === 6 && objetosEnMochila.includes("barrita") && objetosEnMochila.includes("agua")&& objetosEnMochila.includes("compu")) {
    mensaje.textContent = "LA/EL SANX"; descripcion.textContent = "Sos la definición de constancia, todos aspiramos a llevar tu vida y tener tu organización." ;  
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("boletera") && objetosEnMochila.includes("galletitas")&& objetosEnMochila.includes("auriculares")) {
     mensaje.textContent = "SOS UN TIPAZO/A"; descripcion.textContent = "En bondi te movés a todos lados, pero siempre vas. En tu mochila no puede faltar algo para picotear, sos esx amigx que siempre tiene algo para compartir y está dispuestx a sacarte un par de risas y por eso todxs te quieren!" ;  
     cartel.style.display = 'flex'; 
     
 } else if (contador === 6 && objetosEnMochila.includes("libro") && objetosEnMochila.includes("lapicera") && objetosEnMochila.includes("piedras") && objetosEnMochila.includes("sketchbook")) {
    mensaje.textContent = "SOS SOLITARIO/A y REFLEXIVO/A";
    descripcion.textContent = "Disfrutás de tus propios momentos de calma, escribiendo, leyendo o creando algo nuevo. Siempre encontrás paz en lo que hacés, y eso está buenísimo";
    cartel.style.display = 'flex';
    
}else if (contador === 6 && objetosEnMochila.includes("sketchbook") && objetosEnMochila.includes("monster") && objetosEnMochila.includes("auriculares")) {
    mensaje.textContent = "SOS EL/LA ARTISTA";
     descripcion.textContent = "Tu mochila lleva la esencia de tus creaciones. Inspiradx por el caos de la ciudad, encontrás arte en cada rincón";
    cartel.style.display = 'flex';

}else if (contador === 6 && objetosEnMochila.includes("vaso") && objetosEnMochila.includes("desodorante") && objetosEnMochila.includes("perifar") && objetosEnMochila.includes("chicles")) {
    mensaje.textContent = "SOS DETALLISTA";
    descripcion.textContent = "En tu mochila llevás lo escencial para pasar un rato largo afuera, cuidás cada detalle y te gusta sentirte bien. Además sos ese/a amigx que siempre tiene una pastillita para el dolor de cabeza, gracias por tanto y perdón por tan poco!";
    cartel.style.display = 'flex';

}else if (contador === 6 && objetosEnMochila.includes("vaso") && objetosEnMochila.includes("desodorante") && objetosEnMochila.includes("perifar") && objetosEnMochila.includes("barrita")) {
    mensaje.textContent = "DETALLISTA";
    descripcion.textContent = "En tu mochila llevás lo escencial para pasar un rato largo afuera, cuidás cada detalle y te gusta sentirte bien. Además sos ese/a amigx que siempre tiene una pastillita para el dolor de cabeza, gracias por tanto y perdón por tan poco!";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("compu") && objetosEnMochila.includes("monster") && objetosEnMochila.includes("auriculares") && objetosEnMochila.includes("cuadernola")) {
    mensaje.textContent = "SOS EL/LA ADICTO/A A LA PRODUCTIVIDAD";
    descripcion.textContent = "Estás siempre trabajando o creando algo. Tu energía parece no agotarse nunca, y tu mochila es tu oficina móvil.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("compu") && objetosEnMochila.includes("marley") && objetosEnMochila.includes("auriculares") && objetosEnMochila.includes("cuadernola")) {
    mensaje.textContent = "SOS EL/LA ADICTO/A A LA PRODUCTIVIDAD";
    descripcion.textContent = "Estás siempre trabajando o creando algo. Tu energía parece no agotarse nunca, y tu mochila es tu oficina móvil.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("auris") && objetosEnMochila.includes("galletitas") && objetosEnMochila.includes("agua") && objetosEnMochila.includes("tabaco")) {
    mensaje.textContent = "EL/LA TRANKI";
    descripcion.textContent = "Probablemente seas de lxs mas tranquilxs de tus amigos, disfrutás de los momentos simples de la vida. Siempre encontrás tiempo para relajarte comiendo algo rico. Tu calma inspira a quienes te rodean.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("auris") && objetosEnMochila.includes("galletitas") && objetosEnMochila.includes("agua") && objetosEnMochila.includes("mate")) {
    mensaje.textContent = "EL/LA TRANKI";
    descripcion.textContent = "Probablemente seas de lxs mas tranquilxs de tus amigos, disfrutás de los momentos simples de la vida. Siempre encontrás tiempo para relajarte comiendo algo rico. Tu calma inspira a quienes te rodean.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("libro") && objetosEnMochila.includes("cuadernola") && objetosEnMochila.includes("lapicera") && objetosEnMochila.includes("agua")) {
    mensaje.textContent = "SOS EL/LA INTELECTUAL";
    descripcion.textContent = "Aprovechás cada momento para aprender y reflexionar. Tu mochila es un espacio para el conocimiento y la introspección, sos una persona centrada e inteligente en sus acciones.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("agua") && objetosEnMochila.includes("lapicera") && objetosEnMochila.includes("cuadernola") && objetosEnMochila.includes("galletitas")) {
    mensaje.textContent = "SOS EL/LA CLÁSICO/A";
    descripcion.textContent = "Práctico/a y sin complicaciones, llevás lo que cualquiera podría necesitar. Sos de esos que siempre tienen algo útil a mano, y tu mochila refleja tu equilibrio entre lo simple y lo funcional.";
    cartel.style.display = 'flex';

 }else if (contador === 6 && objetosEnMochila.includes("agua") && objetosEnMochila.includes("compu") && objetosEnMochila.includes("marley") && objetosEnMochila.includes("boletera")) {
    mensaje.textContent = "SOS EL/LA CLÁSICO/A";
    descripcion.textContent = "Práctico/a y sin complicaciones, llevás lo que cualquiera podría necesitar. Sos de esos que siempre tienen algo útil a mano, y tu mochila refleja tu equilibrio entre lo simple y lo funcional.";
    cartel.style.display = 'flex';

} else if (contador === 6 && objetosEnMochila.includes("agua") && objetosEnMochila.includes("compu") && objetosEnMochila.includes("manzana") && objetosEnMochila.includes("lapicera")) {
    mensaje.textContent = "SOS EL/LA CLÁSICO/A";
    descripcion.textContent = "Práctico/a y sin complicaciones, llevás lo que cualquiera podría necesitar. Sos de esos que siempre tienen algo útil a mano, y tu mochila refleja tu equilibrio entre lo simple y lo funcional.";
    cartel.style.display = 'flex';
}
 
 /*Si ninguna combinación coincide*/
 else if (contador === 6) { 
     mensaje.textContent = "SOS ÚNICX" ; descripcion.textContent ="¡Perdón, tu personalidad todavía no la hemos cargado!";
     cartel.style.display = 'flex';
 }
 }

/*Para cerrar el cartel*/
 function cerrarCartel() {
 cartel.style.display = 'none';
 location.reload();
 } 