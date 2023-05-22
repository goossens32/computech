import BrandService from "./services/brandServices.js";
import Modal from "./components/ModalBrands.js";

const bodyContainer = document.querySelector('#tbody-container');
const searchInput = document.querySelector('#search-input');
const formItems =  document.querySelector('.form');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const btnCancel = document.querySelector('.btn-cancel');


// Form constants
const nameInput = document.querySelector('#name-input');
const descInput = document.querySelector('#desc-input');
let currentBrand = null;


const newBrand = () => {
    const name = nameInput.value;
    const description = descInput.value;
    const newBrand = {name, description};

    Modal.confirmInsert();
    // --------------------------------------------------
    BrandService.insert(newBrand).then(data => {
        console.log(data);
        renderBrands();
        formItems.reset();
    });
}

const editBrand = (id) => {
    BrandService.getItemById(id).then(data => {
        currentBrand = data;
        nameInput.value = data.name;
        descInput.value = data.description;
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
}

const updateBrand = () => {
    const id = currentBrand.id;
    const name = nameInput.value;
    const description = descInput.value;
    const brand = {id, name, description};
    console.log(brand);

    // Pasas parámetros de brand a Update
    BrandService.update(brand).then(data => {
        currentBrand = null;
        formItems.reset();
        renderBrands();
    });
    btnInsert.classList.replace("d-none", "d-inline");
    btnUpdate.classList.replace("d-inline", "d-none");
}

const warningDelete = (id) => {
    Modal.waringDelete(id);
}

// Función lanzada por Modal.waringDelete sólo si se acepta el modal
export const deleteBrand = (id) => {
    BrandService.delete(id).then(data => {
        console.log(data);
        renderBrands();
    })
}

const validateForm = (event) => {
    event.preventDefault();
    if (event.target.id === "btn-insert") {
        newBrand();
    } else if (event.target.id === "btn-update") {
        updateBrand();
    } else {
        console.log("ID Button not found");
    }
}

const populateTableBrands = (items) => {
    items.forEach((e, i) => {
        bodyContainer.innerHTML += `
            <tr>
                <td style="text-align: center;">${i + 1}</td>
                <td>${e.name}</td>
                <td>${e.description}</td>
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
            console.log(id);
            warningDelete(id);
        })
    });

    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            editBrand(id);
        })
    });
}

const renderBrands = (search) => {
    bodyContainer.innerHTML = "";
    if (search) {
        BrandService.searchItemByName(search).then(items => {
            if (items.length === 0) {
                bodyContainer.innerHTML = "No se ha encontrado ninguna marca";
            } else {
                populateTableBrands(items)
            }
        })
    } else {
        BrandService.getItemsList().then(items => {
            populateTableBrands(items);
        })
    }
}

const searchBrand = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderBrands(nameSearch);
    } else if (input.value.length == 0) {
        renderBrands();
    }
}

const init = () => {
    renderBrands();

    // Reinicio de formulario cuando se pulsa en cancelar
    btnCancel.addEventListener('click', function() {
        formItems.reset();
    })
    searchInput.addEventListener('keyup', searchBrand);
    btnInsert.addEventListener('click', validateForm);
    btnUpdate.addEventListener('click', validateForm);
}
init();
