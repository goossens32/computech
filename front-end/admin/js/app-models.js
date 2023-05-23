import BrandService from "./services/brandServices.js";
import ModelService from "./services/modelServices.js";
import ModalModel from "./components/ModalModels.js";

const bodyContainer = document.querySelector('#tbody-container');
const searchInput = document.querySelector('#search-input');
const formItems =  document.querySelector('.form');
const brandOptions = document.querySelector('#brand-select');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');

// Form constants
const nameInput = document.querySelector('#name-input');
const priceInput = document.querySelector('#price-input');
const stockInput = document.querySelector('#stock-input');
const descInput = document.querySelector('#desc-input');
const imgInput = document.querySelector('#img-input');
const brandInput = document.querySelector('#brand-select');

let currentModel = null;

const newModel = () => {
    const name = nameInput.value;
    const price = priceInput.value;
    const stock = stockInput.value;
    const description = descInput.value;
    const img = imgInput.value; 
    const brand = brandInput.value;
    const newModel = {name, price, stock, description, img, brand};

    ModalModel.confirmedInsert();
    // --------------------------------------------------
    ModelService.insert(newModel).then(data => {
        console.log(data);
        renderModels();
        formItems.reset();
    });
}

const editModel = (id) => {
    ModelService.getItemById(id).then(data => {
        currentModel = data;
        brandInput.value = data.brand;
        nameInput.value = data.name;
        priceInput.value = data.price;
        stockInput.value = data.stock;
        imgInput.value = data.img;
        descInput.value = data.description;
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
}

const updateModel = () => {
    const id = currentModel.id;
    const name = nameInput.value;
    const price = priceInput.value;
    const stock = stockInput.value;
    const description = descInput.value;
    const img = imgInput.value;
    const brand = brandInput.value;
    const newModel = {id, name, price, stock, description, img, brand};
    console.log(newModel);

    ModalModel.confirmedUpdate();
    // Pasas parámetros de brand a Update
    ModelService.update(newModel).then(data => {
        currentModel = null;
        formItems.reset();
        renderModels();
    });
    btnInsert.classList.replace("d-none", "d-inline");
    btnUpdate.classList.replace("d-inline", "d-none");
}

const warningDelete = (id) => {
    ModalModel.waringDelete(id);
}

// Función lanzada por Modal.waringDelete sólo si se acepta el modal
export const deleteModel = (id) => {
    ModelService.delete(id).then(data => {
        console.log(data);
        renderModels();
    })
}

const populateTableModels = (items) => {
    items.forEach((e, i) => {
        bodyContainer.innerHTML += `
            <tr>
                <td style="text-align: center;">${i + 1}</td>
                <td>${e.brand.name}</td>
                <td>${e.name}</td>
                <td>${e.price} €</td>
                <td>${e.stock}</td>
                <td style="display:flex;">
                    <div><button id="btn-delete-${e.id}" class="btn-delete"><i class="fa-regular fa-trash-can fa-lg"></i></button></div>
                    <div><button id="btn-edit-${e.id}" class="btn-edit"><i class="fa-solid fa-pencil fa-lg"></i></button></div>
                </td>
            </tr>
        `
    });

    const buttonsDelete = document.querySelectorAll('.btn-delete');
    buttonsDelete.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            warningDelete(id);
        })
    });

    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            editModel(id);
        })
    });
}

const validateForm = (event) => {
    event.preventDefault();
    // Validate each field
    if(!nameInput.validity.valid) {
        nameInput.focus();
        return false;
    }
    if(!priceInput.validity.valid) {
        priceInput.focus();
        return false;
    }
    if(!stockInput.validity.valid) {
        stockInput.focus();
        return false;
    }
    //Execute insert or update depends to button name 
    if (event.target.id === "btn-insert") {
        newModel();
    } else if (event.target.id === "btn-update") {
        updateModel();
    }else{
        console.log("id button not found in validateForm function");
    }
}

const populateBrandsForm = () => {
    brandOptions.innerHTML = "";
    // Del servicio de marcas se coge lista para options en select html
    BrandService.getItemsList().then(items => {
        items.forEach(e => {
            brandOptions.innerHTML += `
                <option value="${e.id}">${e.name}</option>
            `;
        });  
    })
}

const renderModels = (search) => {
    bodyContainer.innerHTML = "";
    if (search) {
        ModelService.searchItemByName(search).then(items => {
            if (items.length === 0) {
                bodyContainer.innerHTML = "No se ha encontrado ninguna marca";
            } else {
                populateTableModels(items)
            }
        })
    } else {
        ModelService.getItemsList().then(items => {
            populateTableModels(items);
        })
    }
}

const searchModel= (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderModels(nameSearch);
    } else if (input.value.length == 0) {
        renderModels();
    }
}

const init = () => {
    renderModels();
    populateBrandsForm();
    searchInput.addEventListener('keyup', searchModel);
    btnInsert.addEventListener('click', validateForm);
    btnUpdate.addEventListener('click', validateForm);
}
init();