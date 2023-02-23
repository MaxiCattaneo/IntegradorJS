const players = document.querySelector('.players-container');
const categories = document.querySelector('.categories');
const categoriesList = document.querySelectorAll('.category');

// Seteamos el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funcion para guardar el cart en el LS
const saveLocalStorage = cartList => {
  localStorage.setItem('cart', JSON.stringify(cartList));
};


// Renderizado de los jugadores
const RenderPlayer = (player) =>{
    const {nombre, edad, img, rating} = player;
    return ` 
    <li class="card">
    <div class="card-info">
        <h3>${nombre}</h3>
        <p class="rating">${rating}</p>
    </div>
    <img src="${img}" alt="Foto de ${nombre}">
    <p>Edad: ${edad}</p>
    <button class="buy_button">Reclutar</button>
    </li>`;
};
