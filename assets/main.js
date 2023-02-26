const players = document.querySelector('.players-container'); // contenedor de los jugadores
const categories = document.querySelector('.categories');// 
const categoriesList = document.querySelectorAll('.category'); // todas las categorias
const btnLoad = document.querySelector('.btn_loadmore'); // boton ver mas
const cartMenu = document.querySelector('.cart');//el carrito
const cartBtn = document.querySelector('.cart-icon');// boton del carrito
const barsMenu = document.querySelector('.list_menu');// el menu
const barsBtn = document.querySelector('.menu-icon');// boton del menu

// Seteamos el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funcion para guardar el cart en el LS
const saveLocalStorage = cartList => {
  localStorage.setItem('cart', JSON.stringify(cartList));
};


// Renderizado de los jugadores
const RenderPlayer = (player) =>{
    const {id, nombre, edad, img, rating} = player;
    return ` 
    <li class="card">
    <div class="card-info">
        <h3>${nombre}</h3>
        <p class="rating">${rating}</p>
    </div>
    <img src="${img}" alt="Foto de ${nombre}">
    <p>Edad: ${edad}</p>
    <button class="buy_button"
    data-id='${id}'
    data-name='${nombre}'
    data-img = '${img}'>Reclutar</button>
    </li>`;
};


// Funcion de renderizado de los productos divididdos para usar con el botón ver más.
const renderDividedProducts = (index = 0) => {
  players.innerHTML += productsController.dividedProducts[index].map(RenderPlayer).join('');
};

// Funcion para filtrar los jugadores por categoria seleccionada
const renderFilteredProducts = (position) => {
  const PlayersList = Players_list.filter(player => player.posicion === position);
  players.innerHTML = PlayersList.map(RenderPlayer).join('');
}


const renderPlayers = (index = 0, position = undefined) => { 
  if (!position) {
    renderDividedProducts(index); // si no hay caregoria seleccionada renderiza todos los jugadores
    return;
  }
  renderFilteredProducts(position); // Sino muestra solo los de la categoria seleccionada
};

const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  const categories = [...categoriesList]
  //Movemos el estado active entre las categorias
  categories.forEach((categoryBtn)=>{
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove('active');
      return;
        }
        categoryBtn.classList.add('active');
  })
  //Que se muestre el ver mas solo si hay una categoria seleccionada que no sea todos
  if(!selectedCategory){
    btnLoad.classList.remove ('hidden');
    return;
  }
  else{
    btnLoad.classList.add ('hidden');
  };
}


// Si se clickea uno de los filtros se aplica
const aplicarfiltros = (e) =>{
  if(!e. target.classList.contains('category')) return;
  changeFilterState(e); // Verifica la clase active y verifica si hay que poner ver mas
  if(!e.target.dataset.category) { // osea estoy en TODOS
    players.innerHTML = '';
    renderPlayers();
  } else {
    renderPlayers(0, e.target.dataset.category);
    productsController.nextProductsIndex = 1;
  }
};

const BtnVerMasJugadores = () => { //Que se muestre el ver mas solo hasta que no haya mas jugadores para mostrar
  renderPlayers (productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if(productsController.nextProductsIndex === productsController.productsLimit){
    btnLoad.classList.add('hidden');
  }
};

const OpenMenu = () =>{
  barsMenu.classList.toggle('active');
  if (cartMenu.classList.contains('active')){
    cartMenu.classList.remove('active');
    return;
  };
};

const OpenCart = () =>{
  cartMenu.classList.toggle('active');
  if (barsMenu.classList.contains('active')){
    barsMenu.classList.remove('active');
    return;
  };
};


const init = () =>{
  renderPlayers();
  categories.addEventListener('click', aplicarfiltros);
  btnLoad.addEventListener('click', BtnVerMasJugadores);
  barsBtn.addEventListener('click', OpenMenu);
  cartBtn.addEventListener('click', OpenCart);
  console.log('HOLA');
};

init();