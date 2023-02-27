const players = document.querySelector('.players-container'); // contenedor de los jugadores
const categories = document.querySelector('.categories');// Todas las categorias
const categoriesList = document.querySelectorAll('.category'); // todas las categorias
const btnLoad = document.querySelector('.btn_loadmore'); // boton ver mas
const cartMenu = document.querySelector('.cart');//el carrito
const cartBtn = document.querySelector('.cart-icon');// boton del carrito
const barsMenu = document.querySelector('.list_menu');// el menu
const barsBtn = document.querySelector('.menu-icon');// boton del menu
const productsCart = document.querySelector('.cart-list'); //La lista de productos adentro del carrito
const cartTotal = document.querySelector('.cart-total'); //El total de jugadores en el carrito
const btnBuy = document.querySelector ('.btn-buy'); //El boton de contactar a todos en el carrito
const btnDeleteAll = document.querySelector ('.btn-delete-all'); // El boton de borrar todo el carrito en el carrito
const addBtns = document.querySelectorAll('.buy_button'); // Todos los botones de comprar de las cards
const addModal = document.querySelector ('.add-modal'); // El modal que muestra que se agrego algo al carrito
const topModal = document.querySelector ('.finish-msg'); //Modal de arriba del header

// Seteamos el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funcion para guardar el cart en el LS
const saveLocalStorage = cartList => {
  localStorage.setItem('cart', JSON.stringify(cartList));
};


// Renderizado de los jugadores
const RenderPlayer = (player) =>{
    const {id, nombre, edad, img, rating, posicion} = player;
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
    data-nombre='${nombre}'
    data-img = '${img}'
    data-posicion ='${posicion}' >Reclutar</button>
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

//Que jugadores renderizar
const renderPlayers = (index = 0, position = undefined) => { 
  if (!position) {
    renderDividedProducts(index); // si no hay caregoria seleccionada renderiza todos los jugadores
    return;
  }
  renderFilteredProducts(position); // Sino muestra solo los de la categoria seleccionada
};
//Funcion del filtro
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
//Que se muestre el ver mas solo hasta que no haya mas jugadores para mostrar
const BtnVerMasJugadores = () => { 
  renderPlayers (productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if(productsController.nextProductsIndex === productsController.productsLimit){
    btnLoad.classList.add('hidden');
  }
};
//Funcion para abrir el menu
const OpenMenu = () =>{
  barsMenu.classList.toggle('active');
  if (cartMenu.classList.contains('active')){
    cartMenu.classList.remove('active');
    return;
  };
};
//Funcion para abrir el carrito
const OpenCart = () =>{
  cartMenu.classList.toggle('active');
  if (barsMenu.classList.contains('active')){
    barsMenu.classList.remove('active');
    return;
  };
};
//Funcion que cambia la primera letra de un array en mayusculas
const primeraLetraMayus = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1);

const renderCartPlayer = (player) =>{
  const {id, nombre, posicion, img} = player;
  return `
  <li class="cart-player">
    <img src="${img}" alt="Foto de ${nombre}" class="cart-photo"
    <div class="cart-info">
      <h3>${nombre}</h3>
      <div class= "pos-info">
      <span> Posicion: </span>
      <p>${primeraLetraMayus(posicion)}</p>
      </div>
    </div>
    <i data-id=${id} class="fa-solid fa-trash delete-player"></i>
  </li>`
};
//Funcion que da el mensaje que no hay jugadores y sino renderiza jugadores
const renderCart = () =>{
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-cart">No hay jugadores preseleccionados</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(renderCartPlayer).join('')
};

//SUMA EL TOTAL DE ARTICULOS DEL CARRITO
const totalCart = () =>{
  const total = cart.length;
  cartTotal.innerHTML = `<p>Total de jugadores a reclutar: ${total}</p>`
};
//Funcion para desactivar los botones del carrito cuando esta vacio
const disableCartBtn = (btn) =>{
  if (!cart.length){
    btn.classList.add('disabled');
  }
  else{
    btn.classList.remove('disabled');
  }
};
//Checkea la funcionalidad del carrito
const checkCartState = () =>{
  saveLocalStorage(cart);
  renderCart(cart);
  totalCart();
  disableCartBtn(btnBuy);
  disableCartBtn(btnDeleteAll);
};

//Agregar productos al carro
const addProduct = (e) =>{
  if (!e.target.classList.contains('buy_button')){
    return;
  }
  const {id, nombre, img, posicion} = e.target.dataset;
  const player = playerData (id, nombre, img, posicion);
  if(cart.find(item => item.id === player.id)){ //SI EL PRODUCTO YA ESTA EN EL CARRITO
    return; // Que no haga nada porque solo hay un jugador de cada uno
  } else {
    cart = [...cart, {...player}];
    addNewModal();

  }
  checkCartState();
};

//Creamos un objeto con la data del producto
const playerData = (id, nombre, img, posicion) =>{
  return {id, nombre, img, posicion};
};

// Modal que se agrego algo nuevo al carrito
addNewModal = () =>{
  addModal.classList.add('active-modal');
  setTimeout (()=>{
    addModal.classList.remove('active-modal')
  }, 1500);
};

//Funcionalidad boton TACHO
const funcTrash = e => {
  if(e.target.classList.contains('delete-player')){ //Si se toca el tacho
    const existingCartProduct = cart.find(item => item.id === e.target.dataset.id); //Busca un produco con el mismo id que se le pasa a la funcion
    if(window.confirm('Desea elminar al jugador seleccionado?')){ //Pregunta si lo quiere eliminar
      cart = cart.filter(player => player.id !== existingCartProduct.id); // Lo elimina
      checkCartState();
  }
  };
};
//Funcionalidad para enviar el mensaje arriba del header y el de confirmacion
const finishCart = (clase, confirmMsg, finishMsg) => {
  if(!cart.length) return;
  if(window.confirm(confirmMsg)){
    resetCart();
    lastMsg(clase, finishMsg);
  }
};
//Funcinalidad reiniciar el carrito
const resetCart = () =>{
  cart = [];
  checkCartState();
};
//Funcionalidad comprar todo el carro
const buyFullCart = () => {
  finishCart('green', "Desea contactar a los jugadores seleccionados?",
   "Los jugadores fueron contactados. Gracias por confiar en nosotros")
};
//Funcionalidad borrar el carro entero
const deleteFullCart = () => {
  finishCart('red', "Desea limpiar su seleccion de jugadores?",
   "Su seleccion de jugadores fue descartada")
};

//Ultimo mensaje cuando que aparece arriba del header
const lastMsg = (clase, finishMsg) =>{
  topModal.innerHTML = finishMsg;
  topModal.classList.add(clase);
  topModal.classList.add('active-top-message');
  setTimeout (()=>{
    topModal.classList.remove('active-top-message')
    topModal.classList.remove(clase);
  }, 3000);
};

const init = () =>{
  renderPlayers();
  categories.addEventListener('click', aplicarfiltros);
  btnLoad.addEventListener('click', BtnVerMasJugadores);
  barsBtn.addEventListener('click', OpenMenu);
  cartBtn.addEventListener('click', OpenCart);
  document.addEventListener('DOMContentLoaded', renderCart());
  document.addEventListener('DOMContentLoaded',totalCart());
  players.addEventListener('click', addProduct);
  disableCartBtn(btnBuy);
  disableCartBtn(btnDeleteAll);
  cartMenu.addEventListener('click', funcTrash);
  btnBuy.addEventListener('click', buyFullCart);
  btnDeleteAll.addEventListener ('click', deleteFullCart);
};

init();