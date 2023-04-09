let novedadesContainer = document.getElementById("novedadesContainer");
let hombresContainer = document.getElementById("hombresContainer");
let mujeresContainer = document.getElementById("mujeresContainer");
let carrito = document.getElementById("carrito");
let carBody = document.getElementById("carBody");
let carritoData = JSON.parse(localStorage.getItem("carritoData")) || [];

const guardarLocal = () =>{
    localStorage.setItem("carritoData", JSON.stringify(carritoData));
};

if(hombresContainer){
    fetch("../apis/prodHombres.json")
    .then(response => response.json())
    .then(data =>{
        data.forEach(prod => {
            let card = document.createElement("div");
            card.className ="product-man";
            card.innerHTML = `
            <img src="${prod.img}" alt="">
            <h3>${prod.name}</h3>
            <b>$${prod.precio}</b>
            <a id="boton${prod.id}">Añadir</a>
            `
            hombresContainer.appendChild(card);
            let boton = document.getElementById(`boton${prod.id}`);
            boton.classList.add ("button-hombres")
            boton.addEventListener('click', () => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto añadido',
                    showConfirmButton: false,
                    timer: 900
                })
                const repeat = carritoData.some((repeatProd) => repeatProd.id === prod.id);
                if(repeat){
                    carritoData.map((prod) =>{
                        if(prod.id === prod.id){
                            prod.cantidad++;
                        }
                    })
                }else{
                    carritoData.push({
                        img: prod.img,
                        id: prod.id,
                        precio: prod.precio,
                        name: prod.name,
                        cantidad: prod.cantidad
                    });
                };
                verCarrito();
                guardarLocal();
            });
        });
    });
};
if(mujeresContainer){
    fetch("../apis/prodMujeres.json")
    .then(response => response.json())
    .then(data =>{
        data.forEach(prod => {
            let card = document.createElement("div");
            card.className ="product-women";
            card.innerHTML = `
            <img src="${prod.img}" alt="">
            <h3>${prod.name}</h3>
            <b>$${prod.precio}</b>
            <a id="boton${prod.id}">Añadir</a>
            `
            mujeresContainer.appendChild(card);
            let boton = document.getElementById(`boton${prod.id}`);
            boton.classList.add ("button-women")
            boton.addEventListener('click', () => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto añadido',
                    showConfirmButton: false,
                    timer: 900
                })
                const repeat = carritoData.some((repeatProd) => repeatProd.id === prod.id);
                if(repeat){
                    carritoData.map((prod) =>{
                        if(prod.id ===prod.id){
                            prod.cantidad++;
                        }
                    })
                }else{
                    carritoData.push({
                        img: prod.img,
                        id: prod.id,
                        precio: prod.precio,
                        name: prod.name,
                        cantidad: prod.cantidad
                    });
                };
                verCarrito();
                guardarLocal();
            });
        });
    });
};
if(novedadesContainer){
    fetch("../apis/novedades.json")
    .then(response => response.json())
    .then(data =>{
        data.forEach(prod => {
            let card = document.createElement("div");
            card.className ="product-nv";
            card.innerHTML = `
            <img src="${prod.img}" alt="">
            <h3>${prod.name}</h3>
            <b>$${prod.precio}</b>
            <a id="boton${prod.id}">Añadir</a>
            `
            novedadesContainer.appendChild(card);
            let boton = document.getElementById(`boton${prod.id}`);
            boton.classList.add ("button-nv")
            boton.addEventListener('click', () => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto añadido',
                    showConfirmButton: false,
                    timer: 900
                })
                const repeat = carritoData.some((repeatProd) => repeatProd.id === prod.id);
                if(repeat){
                    carritoData.map((prod) =>{
                        if(prod.id ===prod.id){
                            prod.cantidad++;
                        }
                    })
                }else{
                    carritoData.push({
                        img: prod.img,
                        id: prod.id,
                        precio: prod.precio,
                        name: prod.name,
                        cantidad: prod.cantidad
                    });
                };
                carBody.innerHTML = '';
                verCarrito();
                guardarLocal();
            });
        });
    });
};

const verCarrito = () => {
    carritoData.forEach((prod) =>{
        let div = document.createElement("div");
        div.className = "prod"
        div.innerHTML = `
        <img src="${prod.img}" alt="imagen del producto">
        <h3>${prod.name}</h3>
        <span id="minus" class="minus"><i class="fa-solid fa-circle-minus"></i></span>
        <p>${prod.cantidad}</p>
        <span id="plus" class="plus"><i class="fa-solid fa-circle-plus"></i></span>
        <b>$${prod.precio * prod.cantidad}</b>
        <button class="delBtn" id="boton${prod.id}"><i class="fa-solid fa-delete-left"></i></button>
        `
        carBody.appendChild(div)
        let minusButton = div.querySelector("#minus");
        minusButton.addEventListener("click", () =>{
            carBody.innerHTML = '';
            if(prod.cantidad !== 1){
                prod.cantidad --;
            };
            verCarrito();
            guardarLocal();
        });
        let plusButton = div.querySelector("#plus");
        plusButton.addEventListener("click", () =>{
            carBody.innerHTML = '';
            prod.cantidad ++;
            verCarrito();
            guardarLocal();
        })
        let boton = document.getElementById(`boton${prod.id}`);
        boton.addEventListener('click', () => {
            const index = carritoData.findIndex(item => item.id === prod.id);
            carritoData.splice(index, 1);
            carBody.innerHTML = '';
            verCarrito();
            guardarLocal();
        });
    });
    const total = carritoData.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
    let totalContainer = document.getElementById("total");
    totalContainer.innerText = `Total a pagar: $${total}`;
};

carrito.addEventListener("click", ()=>{
    carBody.innerHTML = '';
    verCarrito();
});
let paytBtn = document.getElementById("paytBtn");
paytBtn.addEventListener("click", () => {
    Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: 'Por favor, inténtelo de nuevo más tarde o póngase en contacto con nuestro equipo de soporte para obtener ayuda.',
    })
});



