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
  const response = await fetch('/api/watches');
  const watches = await response.json(); 

  const watchesContainer = document.getElementById('watchesContainer');
  watchesContainer.innerHTML = ''; // Clear existing entries

  watches.forEach(watch => {
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
      material.textContent = `Material: ${watch.material}`;
      infoSection.appendChild(material);

      const dialColor = document.createElement('p');
      dialColor.textContent = `Dial Color: ${watch.dialColor}`;
      infoSection.appendChild(dialColor);

      const bracelet = document.createElement('p');
      bracelet.textContent = `Bracelet: ${watch.bracelet}`;
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
  console.error('Failed to load watches:', error);
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

document.getElementById('addWatchForm').onsubmit = async function(e) {
e.preventDefault();
const form = e.target;
const formData = new FormData(form);

try {
    const response = await fetch('/watches', {
        method: 'POST',
        body: formData, // No need to set Content-Type header
    });

    if (response.ok) {
        console.log("Watch added successfully!");
        form.reset(); // Reset form after successful submission
        modal.style.display = 'none'; // Hide modal
    } else {
        throw new Error('Failed to add watch');
    }
} catch (err) {
    console.error(err.message);
}
};

function loadEditModal(watch) {
document.getElementById('editWatchId').value = watch._id;
document.getElementById('editWatchName').value = watch.name;
document.getElementById('editWatchMaterial').value = watch.material;
document.getElementById('editWatchDial').value = watch.dialColor;
document.getElementById('editWatchBracelet').value = watch.bracelet;
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

