import ModelService from "./services/modelServices.js";
import SpecService from "./services/specServices.js";
import ModalSpec from "./components/ModalSpecs.js";

const bodyContainer = document.querySelector('#body-container');
const searchInput = document.querySelector('#search-input');
const formItems =  document.querySelector('.form');
const modelOptions = document.querySelector('#model-select');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');

// Form constants
const osInput = document.querySelector('#os-input');
const cpuInput = document.querySelector('#cpu-input');
const ramInput = document.querySelector('#ram-input');
const storageInput = document.querySelector('#storage-input');
const screenInput = document.querySelector('#screen-input');
const batteryInput = document.querySelector('#battery-input');
const modelInput = document.querySelector('#model-select');

let currentSpec = null;

const newSpecForModel = () => {
    const os = osInput.value;
    const cpu = cpuInput.value;
    const ram = ramInput.value;
    const storage = storageInput.value;
    const screen = screenInput.value;
    const battery = batteryInput.value;
    const model = modelInput.value;

    const newSpec = {os, cpu, ram, storage, screen, battery, model};
    console.log(newSpec);
    
    ModalSpec.confirmedInsert();
    // --------------------------------------------------
    SpecService.insert(newSpec).then(data => {
        renderSpecs();
        formItems.reset();
    })
}

const editSpec = (id) => {
    SpecService.getItemById(id).then(data => {
        currentSpec = data;
        modelInput.value = data.model;
        osInput.value = data.os;
        cpuInput.value = data.cpu;
        ramInput.value = data.ram;
        storageInput.value = data.storage;
        screenInput.value = data.screen;
        batteryInput.value = data.battery;
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
}

const updateSpec = () => {
    const id = currentSpec.id;
    const os = osInput.value;
    const cpu = cpuInput.value;
    const ram = ramInput.value;
    const storage = storageInput.value;
    const screen = screenInput.value;
    const battery = batteryInput.value;
    const model = modelInput.value;
    const newSpec = {id, os, cpu, ram, storage, screen, battery, model};

    ModalSpec.confirmedUpdate();
    // Pasas parámetros de brand a Update
    SpecService.update(newSpec).then(data => {
        currentSpec = null;
        formItems.reset();
        renderSpecs();
    });
    btnInsert.classList.replace("d-none", "d-inline");
    btnUpdate.classList.replace("d-inline", "d-none");
}

const warningDelete = (id) => {
    ModalSpec.waringDelete(id);
}

export const deleteSpec = (id) => {
    SpecService.delete(id).then(data => {
        console.log(data);
        renderSpecs();
    })
}

const populateSpecs = (items) => {
    bodyContainer.innerHTML = "";
    items.forEach((e, i) => {
        bodyContainer.innerHTML += `
            <div class="card">
                    <h2>${e.model.name}</h2>
                    <h2>${e.model.brand.name}</h2>
                    <div class="columns">
                        <div class="column1">
                            <p>Sistema Operativo: </p>
                            <p>Procesador: </p>
                            <p>Memoria RAM: </p>
                            <p>Almacenamiento: </p>
                            <p>Pantalla: </p>
                            <p>Batería: </p>
                        </div>
                        <div class="column2">
                            <p>${e.os}</p>
                            <p>${e.cpu}</p>
                            <p>${e.ram}</p>
                            <p>${e.storage}</p>
                            <p>${e.screen}</p>
                            <p>${e.battery}</p>
                        </div>
                        <div class="column3">
                            <div><button style="margin-bottom:2rem ;" id="btn-delete-${e.id}" class="btn-delete"><i class="fa-regular fa-trash-can fa-lg"></i></button></div>
                            <div><button id="btn-edit-${e.id}" class="btn-edit"><i class="fa-solid fa-pencil fa-lg"></i></button></div>
                        </div>
                    </div>
                </div>
        `;
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
            editSpec(id);
        })
    });

}

const validateForm = (event) => {
    event.preventDefault();
    if (event.target.id === "btn-insert") {
        newSpecForModel();
    } else if (event.target.id === "btn-update") {
        updateSpec();
    }else{
        console.log("id button not found in validateForm function");
    }
}

const renderSpecs = (search) => {
    bodyContainer.innerHTML = "";
    if (search) {
        SpecService.searchItemByName(search).then(items => {
            if (items.length === 0) {
                bodyContainer.innerHTML = "No se ha encontrado ninguna marca";
            } else {
                populateSpecs(items)
            }
        })
    } else {
        SpecService.getItemsList().then(items => {
            populateSpecs(items);
        })
    }
}

const populateModelsForm = () => {
    modelOptions.innerHTML = "";
    ModelService.getItemsList().then(items => {
        items.forEach(e => {
            modelOptions.innerHTML += `
                <option value="${e.id}">${e.name}</option>
            `;
        });
    })
}

const searchSpec= (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderSpecs(nameSearch);
    } else if (input.value.length == 0) {
        renderSpecs();
    }
}

const init = () => {
    renderSpecs();
    populateModelsForm();
    searchInput.addEventListener('keyup', searchSpec);
    btnInsert.addEventListener('click', validateForm);
    btnUpdate.addEventListener('click', validateForm);
};
init();