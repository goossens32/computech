import BrandService from "../../admin/js/services/brandServices.js";
import ModelService from "../../admin/js/services/modelServices.js";

const brandFilterContainer = document.querySelector('.brand-list');
const gridContainer = document.querySelector('.grid-container');
const searchLaptopInput = document.querySelector('#search-laptop-input');
const cartItemsContainer = document.querySelector('.cart-list');
const filterOption = document.querySelector('#order-by-select');

// Contador de carrito se inicia a 0
const cartItemCounter = document.querySelector('.cart-item-counter');
let cartCounter = 0;
// Carrito
let cartItems = [];
let cartTotal = cartItems.length;


const getLaptopList = () => {
    fetch("http://localhost:8800/api/models")
    .then(res=>res.json())
    .then(data=>{
            populateLaptops(data);
        }
    );
}

const populateLaptops = (data) => {
    gridContainer.innerHTML = "";
        data.forEach(e => {
            gridContainer.innerHTML += `
            <div class="card" data-name="${e.brand.name}">
                <div class="laptop-img"><img src="${e.img}" alt=""></div>
                <h2>${e.brand.name}</h2>
                <h3 class="brand-name">${e.name}</h3>
                <div class="card-buttons">
                    <h4>${e.price} €</h4>
                    <button class="add-to-cart" id="${e.id}"><i class="fa-solid fa-cart-shopping fa-lg"></i></button>
                </div>
            </div>
            `;
        });

        // Añado funcionalidad de añadir al carrito al botón de compra
        const btnAddToCart = document.querySelectorAll('.add-to-cart');
        btnAddToCart.forEach(btn => {
            btn.addEventListener('click', function() {
                let id = this.id;
                addItemToCart(id)      
            });
        });

        const brandCheckboxes = document.querySelectorAll('#brand-check');
        brandCheckboxes.forEach((checkbox) => {
            // Por cada checkbox aplico eventListener
            checkbox.addEventListener('change', function() {
                // Consigo el data-set de cada checkbox que contiene el nombre de marca
                const brandName = this.getAttribute('data-name');
                // Consigo el data-set de cada card que contiene el nombre de marca
                const cards = document.querySelectorAll(`.card[data-name="${brandName}"]`);
                // Cuando está marcado selecciona todas las cards que coincidan con la marca
                if (this.checked) {
                    // Si está checked el display pasará a block
                    cards.forEach((card) => {
                        card.style.display = 'block';
                    });
                } else {
                    // A medida que se van desmarcando irá pasando a display none
                    cards.forEach((card) => {
                        card.style.display = 'none';
                    });
                }
            });
        });    
}

const populateBrandsFilterList = () => {
    brandFilterContainer.innerHTML = "";
    BrandService.getItemsList().then(brands => {
        brands.forEach(e => {
            brandFilterContainer.innerHTML += `
                <label class="control control-checkbox">
                    ${e.name}
                    <input type="checkbox" checked="checked" id="brand-check" data-name="${e.name}"/>
                    <div class="control_indicator"></div>
                </label>
            `;
        });
    });
}

const searchLaptop = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        ModelService.searchItemByName(nameSearch).then(data => {
            populateLaptops(data);
        })
        
    } else if (input.value.length == 0) {
        ModelService.getItemsList().then(data => {
            populateLaptops(data);
        })
    }
    
}

const addItemToCart = (id) => {
    // Consigo el nombre de modelo por ID y lo sube al array del carrito
    ModelService.getItemById(id).then(item => {
        const name = item.name;
        const quantity = 1
        const price = item.price;
        
        const existingItem = cartItems.find((item) => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const newItem = { name, quantity, price };
            cartItems.push(newItem);
            // El contador de items de carrito se va sumando cada vez que añado un item
            cartCounter = cartItems.length;
            // LS no funciona correctamente
            // localStorage.setItem("cart", JSON.stringify(cartItems));
            renderCart();
        }

        cartTotal += price * quantity;
        console.log(cartItems);
        renderCart();
    });
}

const removeItemFromCart = (itemName) => {
    const itemIndex = cartItems.findIndex((item) => item.name === itemName);
    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        // Resta al total el precio * cantidad cuando se eliminta
        cartTotal = cartTotal - (item.price * item.quantity);
        cartItems.splice(itemIndex, 1);
        cartCounter = cartItems.length;
        renderCart();
    }
    cartItemCounter.textContent = cartCounter;
};


const renderCart = () => {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach(e => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p class="cart-col1">${e.name}</p>
                <p class="cart-col2">${e.quantity}</p>
                <p class="cart-col3">${e.price} €</p>
                <p class="cart-col4"><button class="remove-item" data-name="${e.name}"><i class="fa-solid fa-xmark" style="color: #bf2632; font-size:22px;"></i></button></p>
            <div>
        `;
    });
    // Suma al total
    const totalContainer = document.querySelector('.total');
    totalContainer.textContent = cartTotal + " €";
   
    // Botón de eliminar item de carrito
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemName = button.dataset.name;
            // El nombre de dataset se usa como parámetro en removeItemFromCart
            removeItemFromCart(itemName);
        });
    });
    cartItemCounter.textContent = cartCounter;
}

// const loadCartLS = () => {
//     if (localStorage.getItem("cart")) {
//         cartItems = JSON.parse (localStorage.getItem("cart"));
//         cartCounter = cartItems.length;
//     }
//     else {cart = [];}
//     renderCart();
// }


const handleFilter = () => {
    // Aplico filtro según el value de select>option de HTML
    if (filterOption.value == 1) {
        // ORDENA DE LA A-Z
        ModelService.getItemsList().then(data => {
            data.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                } else if (a.name < b.name) {
                  return -1;
                }
            });
            populateLaptops(data);
        });

    }else if (filterOption.value == 2) {
        // ORDENA DE LA Z-A
        ModelService.getItemsList().then(data => {
            data.sort((a, b) => {
                if (a.name < b.name) {
                  return 1;
                } else if (a.name > b.name) {
                  return -1;
                }
            });
            populateLaptops(data);
        });

    } else if (filterOption.value == 3) {
        // ORDENA POR PRECIO DESCENDENTE
        ModelService.getItemsList().then(data => {
            data.sort((a, b) => a.price - b.price);
            populateLaptops(data);
        });

    } else if (filterOption.value == 4) {
        // ORDENA POR PRECIO ASCENDENTE
        ModelService.getItemsList().then(data => {
            data.sort((a, b) => b.price - a.price);
            populateLaptops(data);
        });
      }
}

const handleBrandAccordion = () => {
    const btnAccordion = document.querySelector('#accordion');
    const brandList = document.querySelector('.brand-list');
    btnAccordion.addEventListener('click', function() {
        // Por defecto está en block
        if (brandList.style.display === "block") {
            brandList.style.display = "none";
        } else {
            brandList.style.display = "block";
        }
    })
};

const handleCartDropdown = () => {
    const cartButton = document.querySelector('#cart-button');
    const dropdownCart = document.querySelector('#dropdown-cart');
    cartButton.addEventListener('click', function() {
        dropdownCart.classList.toggle('show')
    })
}

const handleUserDropdown = () => {
    const userButton = document.querySelector('#user-button');
    const dropdownUser = document.querySelector('#dropdown-user');
    userButton.addEventListener('click', function(){
        dropdownUser.classList.toggle('show');
    })
}

const init = () => {
    getLaptopList();
    populateBrandsFilterList();
    // loadCartLS();

    // Controladores de elementos de página
    handleBrandAccordion();
    handleCartDropdown();
    handleUserDropdown();

    filterOption.addEventListener('change', handleFilter);
    searchLaptopInput.addEventListener('keyup', searchLaptop);
}
init();