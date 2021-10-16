
//Guardamos las variables del DOM como la section, el botón de envío, y la tarjeta que se creará

const d = document,
  $mainSection = d.getElementById("mainSection"),
  $section = d.getElementById("section"),
  $submit = d.getElementById("enviar"),
  $card = d.querySelector(".card");
let offset = 20;
//Guardamos en una variable el loader del DOM que es una imagen que aparecerá mientras se carga la info y luego la ocultaremos
$loader = d.getElementById("loader");
$loader.style.display = "none";

//LE añadimos el evento click al botón de envío para que cuando se envíe el nombre del pokemon que nos devuelva a través de una función asíncrona los datos del Pokemon

const pokemonList = async () => {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=100`;
  try {
    let res = await fetch(url);
    // console.log(res);

    let json = await res.json();

    // console.log(json);
    for (let i = 1; i <= 100; i++) {
      let res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      if (!res2.ok) throw { status: res2.status };

      let json2 = await res2.json();
      //console.log(json2);
      $mainSection.innerHTML += `
      <div class="individualCard"
        <h2>${json2.name.toUpperCase()}</h2>
        
        <img src=${json2.sprites.front_default} alt="${json2.name}">
       
        <ul>

        <li>Peso: ${json2.weight} g</li>
        <li>Altura: ${json2.height}cm</li>
        <li>Habilidad: ${json2.abilities[0].ability.name}</li>
        </ul>
        </div>
        
            


       
   
   
   
   
   `;
    }
  } catch (err) {
    let message = err.statusText || "Ha habido un error.";

    $mainSection.innerHTML = `<p class="error">Error ${err.status} <b>${message}</<b></p>`;
  }
};

pokemonList();

$submit.addEventListener("click", async (e) => {
  try {
    $loader.style.display = "block";
    let $search = d.getElementById("search").value.toLowerCase();

    //Usamos fetch y async await
    //HAcemos la petición a través de la url de la api más el valor que introduzcamos en el input
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${$search}`),
      //Convertimos la respuesta a json
      json = await res.json();

    console.log(json);
    //Si no se devuelve la info correctamente saltará al catch y mostrará el mensaje de error

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    //Añadimos a la etiqueta section una template string con los datos recopilados de la api de Pokemon
    $section.innerHTML = `
        <div class="individualCard">
        <h2>${json.name.toUpperCase()}</h2>
        
        <img src=${json.sprites.front_default} alt="${json.name}">
       
        <ul>

        <li>Peso: ${json.weight} g</li>
        <li>Altura: ${json.height}cm</li>
        <li>Habilidad: ${json.abilities[0].ability.name}</li>
        </ul>
        <button id="cerrar" onclick="cerrar()">Cerrar</button>
            


       </div>
   
   
   
   
   `;

    $loader.style.display = "none";
    $section.style.display = "flex";
    $mainSection.style.display = "none";

    //Capturamos el error para que si se produce avise al usuario de lo ocurrido
  } catch (err) {
    let message = err.statusText || "No existe el pokemon que estás buscando.";
    $section.innerHTML = `<p class="error">Error ${err.status} <b>${message}</<b></p>`;
    $loader.style.display = "none";
  }
});
//Creamos una función para que una vez se cree la tarjeta con la info del Pokemon la podamos cerrar a través de un botón

function cerrar() {
  $section.style.display = "none";
  $mainSection.style.display = "flex";
}
