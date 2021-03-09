// He trobat 2 maneres de resoldre aquest problema, amb diferent fortuna...:
//
// 1. utilitzant RadioButtons ocultats, i el seu Label serà la icona Star de Fonts Aws
//     però NO em funciona VISIBLE estrella plena i INVISIBLE estrella buida.
//
//   1.a. Amb bucle cerquem estrelles, totes aquelles que propietat NAME sigui "rating"
//
//     const changeRating = document.querySelectorAll("input[name=rating]");
//     changeRating.forEach((radio) => {
//     radio.addEventListener("change", getRating);
//     });

//   1.b. Buscar el radiobutton checked i un IF ternari, per muntar text ( 0 de 5 )
//
//     function getRating() {
//        let estrelles = document.querySelector("input[name=rating]:checked").value;
//        document.getElementById("texto").innerHTML =
//           0 < estrelles
//           ? estrelles + " estrella" + (1 < estrelles ? "s" : "")
//           : "sense nota";
//       }
// ----------------------------------------------------------------------------------------
//
// 2. utilitzant Buttons o Spans per pintar estrelles, i recollir amb addEventListener
//     però és massa complicat de fer, millor intentar amb la versió dels RadioButtons.
//
//     Finalment em FUNCIONA OK aquesta versió, però buscant molt per internet, i trobar
//     funcions noves com el dispatchEvent, que genera un Event Click totalment nou.

document.addEventListener("DOMContentLoaded", function () {

    // muntem una Llista d'estrelles amb tots elements de DOM q tinguin classe .star
    let arrEstrelles = document.querySelectorAll(".star");
    // recorrem cada element de la Llista per saber quin element ha rebut el Click
    arrEstrelles.forEach(function (item) {
      item.addEventListener("click", myRating);
    });

    // llegim i recollim el valor de l'atribut "data-rating" que conté la puntuació
    let puntuacio = parseInt(document.querySelector(".stars").getAttribute("data-rating"));

    // ja tenim la puntuació, ens falta la posició index (serà mateix valor amb -1)
    let posicio = arrEstrelles[puntuacio - 1]; 

    // generem un Event Click en la posicio de l'estrella puntuada, perquè es pinti
    posicio.dispatchEvent(new MouseEvent("click"));
});

// botó per Reset i despintar tots els estels
let boto = document.querySelector("#esborrar");
boto.addEventListener("click", esborrar);

// funció per esborrar totes les estrelles
function esborrar() {
    let arrEstrelles = document.querySelectorAll(".star");
    arrEstrelles.forEach(function (item) {
        item.classList.remove("rated");
    });
}

// marca la NOVA puntuació que li acabem de donar ARA mateix
function myRating(item) {
    let span = item.currentTarget;
    let stars = document.querySelectorAll(".star");

    // convert Nodelist to an array -- no entenc perquè hem de passar de Lista a Array
    let arrEstrelles = Array.from(stars);
    // girem l'Array perque vagi de major a menor (per coincidir amb el CSS)
    arrEstrelles = arrEstrelles.reverse();
    let coincideix = false;
    let puntuacion = 0;
    // recorrem cada element del Array per pintar cada estel segons puntuat o no
    arrEstrelles.forEach(function (item, index) {
        // if ternari... si no estava puntuat i cal, doncs el pinta
        (coincideix) ? item.classList.remove("rated") : item.classList.add("rated");
        // la estrella en la q estic li marco com 'analitzada' i augmento el comptador
        if (item === span) {
          coincideix = true;
          puntuacion = index + 1;
        }
      });
    document.querySelector(".stars").setAttribute("data-rating", puntuacion);
}
