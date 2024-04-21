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
          const editButton = document.createElement('button');

          editButton.textContent = 'Edit';
          editButton.classList.add('edit-btn');  
          editButton.addEventListener('click', () => loadEditModal(watch));
          sellButtonDiv.appendChild(editButton);  


          watchEl.appendChild(infoSection);
          watchEl.appendChild(sellButtonDiv);

          watchesContainer.appendChild(watchEl);
      });
  } catch (error) {
      console.error('Failed to load watches :', error);
  }
};

window.onload = () => displayWatches();

var modal = document.getElementById('watchModal');

var btn = document.getElementById('addWatchBtn');

var closeBtn = document.getElementsByClassName('close-btn')[0];

btn.onclick = function() {
  modal.style.display = 'block';
}

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

document.getElementById('addWatchForm').onsubmit = function(e) {
  e.preventDefault();

  var successMessage = document.createElement('div');
  successMessage.textContent = "Watch added successfully!";
  successMessage.style.color = "green";
  successMessage.style.textAlign = "center";
  successMessage.style.padding = "10px 0";
  successMessage.style.fontSize = "16px";
this.appendChild(successMessage);

setTimeout(() => {
  modal.style.display = 'none';
  successMessage.remove();
  this.reset();
}, 2000);

}
function loadEditModal(watch) {
  document.getElementById('editWatchId').value = watch._id;
  document.getElementById('editWatchName').value = watch.name;
  document.getElementById('editWatchMaterial').value = watch.Material;
  document.getElementById('editWatchDial').value = watch['Dial Color'];
  document.getElementById('editWatchBracelet').value = watch.Bracelet;
  document.getElementById('editWatchPrice').value = watch.price;
  document.getElementById('editWatchYear').value = watch.year;

  document.getElementById('editWatchModal').style.display = 'block';
}
var editModal = document.getElementById('editWatchModal');
var closeEditBtn = document.getElementsByClassName('close-edit-btn')[0];

closeEditBtn.onclick = function() {
  editModal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == editModal) {
    editModal.style.display = 'none';
  }
}


