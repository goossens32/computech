import BrandService from "../../admin/js/services/brandServices.js";
import ModelService from "../../admin/js/services/modelServices.js";
import SpecService from "../../admin/js/services/specServices.js";

const brandFilterContainer = document.querySelector('.brand-list');
const gridContainer = document.querySelector('.grid-container');
const moreInfoContainer = document.querySelector('.more-info-title');
const moreInfoSpecsContainer = document.querySelector('.more-info-specs');
const cartItemsContainer = document.querySelector('.cart-items');

// Contador de carrito se inicia a 0
const cartItemCounter = document.querySelector('.cart-item-counter');
cartItemCounter.textContent = 0;
let cartItems = [];
console.log(cartItems);
console.log(cartItems.name);

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
            <div class="card">
                <div class="laptop-img"><img src="${e.img}" alt=""></div>
                <h2>${e.brand.name}</h2>
                <h3 class="brand-name">${e.name}</h3>
                <h4>${e.price} €</h4>
                <div class="card-buttons">
                    <button class="btn-more-info id=${e.id}">Ver más...</button>
                    <button class="add-to-cart" id="${e.id}"><i class="fa-solid fa-cart-shopping fa-lg"></i></button>
                </div>
            </div>
            `;
        });

        const btnAddToCart = document.querySelectorAll('.add-to-cart');
        btnAddToCart.forEach(btn => {
            btn.addEventListener('click', function() {
                let id = this.id;
                // Consigo el nombre de modelo por ID y lo sube al array del carrito
                ModelService.getItemById(id).then(item => {
                    const name = item.name;
                    const quantity = 1
                    const price = item.price;
                    const newItem = {name, quantity, price};
                    cartItems.push(newItem);
                });
                // El contador de items de carrito se va sumando cada vez que añado un item
                cartItemCounter.textContent = cartItems.length + 1;
            });
        });

        const btnMoreInfo = document.querySelectorAll('.btn-more-info');
        btnMoreInfo.forEach(btn => {
            btn.addEventListener('click', function(){
                let id = this.id
                showMoreInfo(id);
            })
        });
}

const showMoreInfo = (id) => {
    moreInfoContainer.innerHTML = "";
    ModelService.getItemById(id).then(data => {
        data.forEach(e => {
            moreInfoContainer.innerHTML = `
                <div>${e.brand.name}</div>
                <div>${e.name}</div>
            `
        });
    })
    moreInfoSpecsContainer.innerHTML = "";
    SpecService.searchItemByName().then(data => {
        data.forEach(e => {
            moreInfoSpecsContainer.innerHTML = `
                <div>${e.os}</div>
            `;
        });
    })
}

const populateBrandsFilterList = () => {
    brandFilterContainer.innerHTML = "";
    BrandService.getItemsList().then(brands => {
        brands.forEach(e => {
            brandFilterContainer.innerHTML += `
                <label class="control control-checkbox">
                    ${e.name}
                    <input type="checkbox" checked="checked"/>
                    <div class="control_indicator"></div>
                </label>
            `;
        });
    })
}

const renderCart = () => {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach(e => {
        cartItemsContainer.innerHTML += `
            <p>${e.name}</p>
        `;
    });
}


const handleAccordion = () => {
    const btnAccordion = document.querySelector('#accordion');
    const brandList = document.querySelector('.brand-list');
    btnAccordion.addEventListener('click', function() {
        if (brandList.style.display === "block") {
            brandList.style.display = "none";
        } else {
            brandList.style.display = "block";
        }
    })
};

const handleCartDropdown = () => {
    const cartButton = document.getElementById('cart-button');
    const dropdownContent = document.getElementById('dropdown-content');
    cartButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    })
}

const init = () => {
    getLaptopList();
    populateBrandsFilterList();
    renderCart();

    handleAccordion();
    handleCartDropdown();
}
init();