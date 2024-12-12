var wawa = new Audio("audio/sonido1.mp3");
var bajo = new Audio("audio/sonido2.mp3");
var psh = new Audio("audio/sonido3.mp3");
var tatara = new Audio("audio/sonido4.mp3");
var waka = new Audio("audio/sonido5.mp3");
var punchi = new Audio("audio/sonido6.mp3");
var tunts = new Audio("audio/sonido7.mp3");
var taka = new Audio("audio/sonido8.mp3");
var raro = new Audio("audio/sonido9.mp3");
var khe = new Audio("audio/sonido10.mp3");
var skere = new Audio("audio/sonido11.mp3");
var letro = new Audio("audio/sonido12.mp3");

let lists = document.getElementsByClassName("pepe");
let containers = document.getElementsByClassName("container");

function arrancarDragon(containers) {
    for (let i = 0; i < containers.length; i++) {
        let container = containers[i];
        
        container.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        container.addEventListener("drop", function (e) {
            e.preventDefault();

            let selected = document.querySelector(".dragging");
            if (selected) {
                container.appendChild(selected);
                selected.classList.remove("dragging");
            }
        });
    }
}

arrancarDragon(containers);

for (let i = 0; i < lists.length; i++) {
    let list = lists[i];
    
    list.addEventListener("dragstart", function (e) {
        e.target.classList.add("dragging");
    });

    list.addEventListener("dragend", function (e) {
        e.target.classList.remove("dragging");
    });
}

for (let i = 0; i < lists.length; i++) {
    let list = lists[i];

    list.addEventListener("touchstart", function (e) {
        let touch = e.touches[0];
        list.classList.add('dragging');

        list.style.position = 'absolute';
        list.style.zIndex = 1000;

        let offsetX = touch.clientX;
        let offsetY = touch.clientY;

        function moveAt(touch) {
            list.style.left = touch.clientX - offsetX + 'px';
            list.style.top = touch.clientY - offsetY + 'px';
        }

        function onTouchMove(e) {
            moveAt(e.touches[0]);
        }

        function onTouchEnd(e) {
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
            let container = dropTouch(e.changedTouches[0]);
            if (container) {
                container.appendChild(list);
            }
            list.classList.remove("dragging");
            list.style.position = 'relative';
            list.style.left = '';
            list.style.top = '';
        }

        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    });
}

function dropTouch(posicion) {
    for (let i = 0; i < containers.length; i++) {
        let container = containers[i];
        let containerRect = container.getBoundingClientRect();

        if (posicion.clientX >= containerRect.left && posicion.clientX <= containerRect.right &&
            posicion.clientY >= containerRect.top && posicion.clientY <= containerRect.bottom) {
            return container;
        }
    }
    return;
}

function ete(audio) {
    audio.loop = true;
    if (audio.paused) {
        audio.play(); 
    } else {
        audio.pause();
        audio.currentTime = 0;
    }  
}

function klik(imagen, elemento) {
    let box = elemento.parentElement;
    if (box.classList.contains("chumuske")) {
        if (imagen == 'uno') {
            ete(wawa);
        }
        if (imagen == 'dos') {
            ete(bajo);
        }
        if (imagen == 'tre') {
            ete(psh);
        }
        if (imagen == 'cua') {
            ete(tatara);
        }
        if (imagen == 'cin') {
            ete(waka);
        }
        if (imagen == 'sei') {
            ete(punchi);
        }
        if (imagen == 'siet') {
            ete(tunts);
        }
        if (imagen == 'och') {
            ete(taka);
        }
        if (imagen == 'nue') {
            ete(raro);
        }
        if (imagen == 'dieh') {
            ete(khe);
        }
        if (imagen == 'once') {
            ete(skere);
        }
        if (imagen == 'doce') {
            ete(letro);
        }
    }
}
