



const CreateTask = (player) =>{
    const {nombre, edad, img, rating} = player;
    return
    `
    <li class="card">
        <div class="card-info">
            <h3>${nombre}</h3>
            <p class="rating">${rating}</p>
        </div>
        <img src="${img}" alt="Foto de ${nombre}">
        <p>Edad: ${edad}</p>
        <button class="buy_button">Reclutar</button>
    </li>
`
}