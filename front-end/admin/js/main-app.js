const menuItems = document.querySelectorAll('.nav-item');

const links = {
    "BRANDS": "admin-brands.html",
    "MODELS": "admin-models.html"
};

const handleLinks = () => {
    menuItems.forEach(link => {
        link.addEventListener('click', function(event) {
            document.querySelector('#current').src = links[this.dataset.link];
        })
    });
}

const init = () => {
    handleLinks();
};
init();