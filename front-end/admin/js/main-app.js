const menuItems = document.querySelectorAll('.nav-item');

const links = {
    "BRANDS": "./admin-brands.html",
    "MODELS": "./admin-models.html",
    "SPECS": "./admin-specs.html",
};

const handleLinks = () => {
    const items = document.querySelectorAll('.nav-link');
    items.forEach(e => {
        e.addEventListener("click", function(event) {
            document.querySelector('#current-page').src=links[this.dataset.link];
        })
    });
}

const init = () => {
    handleLinks();
};
init();