function changeImage() {
    var image = document.getElementById('change');
    if (image.src.match('https://place-hold.it/200')) {
      image.src = 'https://placehold.co/200';
    } else {
      image.src = 'https://place-hold.it/200';
    }
}

function createStar(event) {
    const starField = document.getElementById('section3');
  
    const star = document.createElement('div');
    star.className = 'star';
    starField.appendChild(star);
}


window.onload = () => {
    document.getElementById("change").onclick = changeImage;
    document.getElementById("section3").onclick = createStar;
    const rotationSlider = document.getElementById('rotationSlider');
    const rotatingImage = document.getElementById('rotating');

    rotationSlider.addEventListener('input', () => {
    const rotationValue = rotationSlider.value;
    rotatingImage.style.transform = `rotate(${rotationValue}deg)`;
});
}

