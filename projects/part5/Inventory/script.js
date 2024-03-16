function menuFunction() {
    var menu = document.getElementById("nav");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
}
const displayWatches = async () => {
  try {
      const response = await fetch('Inventory/watches.json'); 
      const data = await response.json();

      const watchesContainer = document.getElementById('watchesContainer');
      data.watches.forEach((watch) => {
          const watchEl = document.createElement('section');
          watchEl.classList.add('inventoryWatch');

          const img = document.createElement('img');
          img.src = watch.img_name; 
          img.alt = `Image of ${watch.name}`;
          watchEl.appendChild(img);

          const infoSection = document.createElement('section');
          infoSection.id = 'Info';

          const name = document.createElement('h3');
          name.textContent = watch.name;
          infoSection.appendChild(name);

          const material = document.createElement('p');
          material.textContent = `Material: ${watch.Material}`;
          infoSection.appendChild(material);

          const dialColor = document.createElement('p');
          dialColor.textContent = `Dial Color: ${watch['Dial Color']}`;
          infoSection.appendChild(dialColor);

          const bracelet = document.createElement('p');
          bracelet.textContent = `Bracelet: ${watch.Bracelet}`;
          infoSection.appendChild(bracelet);

          const price = document.createElement('p');
          price.textContent = `Price: ${watch.price}`;
          infoSection.appendChild(price);

          const year = document.createElement('p');
          year.textContent = `Year: ${watch.year}`;
          infoSection.appendChild(year);

          const sellButtonDiv = document.createElement('div');
          sellButtonDiv.id = 'Sell';

          const sellButton = document.createElement('button');
          sellButton.textContent = 'Sell';
          sellButtonDiv.appendChild(sellButton);

          watchEl.appendChild(infoSection);
          watchEl.appendChild(sellButtonDiv);

          watchesContainer.appendChild(watchEl);
      });
  } catch (error) {
      console.error('Failed to load watches :', error);
  }
};

window.onload = () => displayWatches();



