const carrosel = document.querySelector(".carrosel");

firstImg = carrosel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".fotos i");


let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;
let firstImgWidth = firstImg.clientWidth + 14; // pegando a largura da primeira imagem e adicionando 14px no valor da margem
let scrollWidth = carrosel.scrollWidth - carrosel.clientWidth; // pega a largura do ultimo item


const showHideIcons = () => {
    // mostra e esconde os botões de ir e voltar de acordo com o valor no scroll do carrosel
    arrowIcons[0].style.display = carrosel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carrosel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
   icon.addEventListener("click", () => {
    // Se clicar no icone da esquerda, reduz a largura do carrosel a esquerda, caso contrário, adiciona.
        carrosel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        showHideIcons();
    });
});

const autoSlide = () => {
    //Se não tiver mais imagem sobrando então não retorna nada.
    if(carrosel.scrollLeft == (carrosel.scrollWidth - carrosel.clientWidth)) return;


    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if (carrosel.scrollLeft > prevScrollLeft) {
        // se usuario scrollar para a direita
        return carrosel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // se ususário scrollar para a esquerda
    return carrosel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}


const dragStart = (e) => {
    // atualiza os valores das variaveis globais quando abaixar o clique do mouse
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carrosel.scrollLeft;
}

const dragging = (e) => {
    // da scroll na imagem do carrosel de acordo com o ponteiro do mouse
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carrosel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carrosel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carrosel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}


carrosel.addEventListener("mousedown", dragStart);
carrosel.addEventListener("touchstart", dragStart);

carrosel.addEventListener("mousemove", dragging);
carrosel.addEventListener("touchmove", dragging);

carrosel.addEventListener("mouseup", dragStop);

carrosel.addEventListener("mouseleave", dragStop);
carrosel.addEventListener("touchend", dragStop);