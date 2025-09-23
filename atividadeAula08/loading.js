const loadNavBar = () => {
    fetch("./navBar.html")
     .then(response => response.text())
     .then(data => document.getElementById("navbar-mainpage").innerHTML = data);
}

const loadCarousel = () => {
    fetch("./carousel.html")
     .then(response => response.text())
     .then(data => document.getElementById("carousel-mainpage").innerHTML = data);
}

const loadMiniCards = () => {
    fetch("./minicard.html")
     .then(response => response.text())
     .then(data => {
        let allMiniCards = "";
        for(let i = 0; i < 6; i++){
            allMiniCards += data;
        }
        document.getElementById("minicards-mainpage").innerHTML = allMiniCards;
    });
}

const loadBigCards = () => {
    fetch("./bigcard.html")
     .then(response => response.text())
     .then(data => {
        let allBigCards = "";
        for(let i = 0; i < 6; i++){
            allBigCards += data;
        }
        document.getElementById("bigcards-mainpage").innerHTML = allBigCards;
    });
} 

const loadBombando = () => {
  fetch("./bigcard.html")
    .then(response => response.text())
    .then(data => {
      let allBigCards = "";
      for(let i = 0; i < 6; i++){ 
        allBigCards += data;
      }
      document.getElementById("bombando-mainpage").innerHTML = allBigCards;
    });
};

const loadFacilidades = () => {
  fetch("./facilidades.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("facilidades-mainpage").innerHTML = data;
    });
};

const loadFooter = () => {
  fetch("./footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-mainpage").innerHTML = data;
    });
};

document.addEventListener("DOMContentLoaded", loadFooter);
document.addEventListener("DOMContentLoaded", loadFacilidades);
document.addEventListener("DOMContentLoaded", loadBombando);
document.addEventListener("DOMContentLoaded", loadNavBar)
document.addEventListener("DOMContentLoaded", loadCarousel)
document.addEventListener("DOMContentLoaded", loadMiniCards)
document.addEventListener("DOMContentLoaded", loadBigCards)