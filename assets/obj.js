const Players_list = [
    {
        id: 1,
        nombre: "Emiliano Martinez",
        posicion: "arquero",
        img: "./assets/imgs/EmilianoMartinez.png",
        edad: 30,
        rating: 84,
    },
    {
        id: 2,
        nombre: "Jan Oblak",
        posicion: "arquero",
        img: "./assets/imgs/JanOblak.png",
        edad: 29,
        rating: 91,
    },
    {
        id: 3,
        nombre: "Thibaut Courtois",
        posicion: "arquero",
        img: "./assets/imgs/ThibautCourtois.png",
        edad: 30,
        rating: 89,
    },
    {
        id: 4,
        nombre: "Ederson Moraes",
        posicion: "arquero",
        img: "./assets/imgs/EdersonMoraes.png",
        edad: 29,
        rating: 89,
    },
    {
        id: 5,
        nombre: "Keylor Navas",
        posicion: "arquero",
        img: "./assets/imgs/KeylorNavas.webp",
        edad: 35,
        rating: 88,
    },
    {
        id: 6,
        nombre: "Sergio Ramos",
        posicion: "defensor",
        img: "./assets/imgs/SergioRamos.png",
        edad: 36,
        rating: 84,
    },
    {
        id: 7,
        nombre: "Van Dijk",
        posicion: "defensor",
        img: "./assets/imgs/VanDijk.png",
        edad: 31,
        rating: 90,
    },
    {
        id: 8,
        nombre: "Cristian Romero",
        posicion: "defensor",
        img: "./assets/imgs/CristianRomero.png",
        edad: 24,
        rating: 83,
    },
    {
        id: 9,
        nombre: "Giovani Lo Celso",
        posicion: "mediocampista",
        img: "./assets/imgs/GiovaniLoCelso.png",
        edad: 26,
        rating: 81,
    },
    {
        id: 10,
        nombre: "Kevin De Bruyne",
        posicion: "mediocampista",
        img: "./assets/imgs/KevinDeBruyne.png",
        edad: 31,
        rating: 91,
    },
    {
        id: 11,
        nombre: "Sergio Busquets",
        posicion: "mediocampista",
        img: "./assets/imgs/SergioBusquets.webp",
        edad: 34,
        rating: 85,
    },
    {
        id: 12,
        nombre: "Paul Pogba",
        posicion: "mediocampista",
        img: "./assets/imgs/PaulPogba.webp",
        edad: 29,
        rating: 85,
    },
    {
        id: 13,
        nombre: "Joshua Kimmich",
        posicion: "mediocampista",
        img: "./assets/imgs/JoshuaKimmich.png",
        edad: 27,
        rating: 89,
    },
    {
        id: 14,
        nombre: "Erling Haaland",
        posicion: "delantero",
        img: "./assets/imgs/ErlingHaaland.webp",
        edad: 22,
        rating: 88,
    },
    {
        id: 15,
        nombre: "Kylian Mbappé",
        posicion: "delantero",
        img: "./assets/imgs/KylianMbappe.png",
        edad: 23,
        rating: 91,
    },
    {
        id: 16,
        nombre: "Lionel Messi",
        posicion: "delantero",
        img: "./assets/imgs/LionelMessi.webp",
        edad: 35,
        rating: 91,
    },
    {
        id: 17,
        nombre: "Cristiano Ronaldo",
        posicion: "delantero",
        img: "./assets/imgs/CristianoRonaldo.png",
        edad: 37,
        rating: 90,
    },
    {
        id: 18,
        nombre: "Karim Benzema",
        posicion: "delantero",
        img: "./assets/imgs/KarimBenzema.png",
        edad: 34,
        rating: 91,
    },
]

const splitProducts = (size) => {
    let dividedProducts = [];
    for (let i = 0; i < Players_list.length; i += size)
      dividedProducts.push(Players_list.slice(i, i + size));
    return dividedProducts;
  };

  //Dividimos los productos en arrays de 6 objetos para mostrarlos de a 6
const productsController = {
    dividedProducts: splitProducts(6),
    nextProductsIndex: 1,
    productsLimit: splitProducts(6).length,
  };
  