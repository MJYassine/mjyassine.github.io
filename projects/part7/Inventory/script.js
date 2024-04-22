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
      img.src = watch.image; 
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
      price.textContent = `Price: $${watch.price}`;
      infoSection.appendChild(price);

      const year = document.createElement('p');
      year.textContent = `Year: ${watch.year}`;
      infoSection.appendChild(year);

      const sellButtonDiv = document.createElement('div');
      sellButtonDiv.id = 'Sell';

      const sellButton = document.createElement('button');
      sellButton.textContent = 'Sell';
      sellButton.classList.add('sell-btn');
      sellButton.setAttribute('data-id', watch._id);  // Ensure each sell button has the correct data-id attribute
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

  let price = formData.get('price').replace(/[^\d.-]/g, '');
  formData.set('price', price);  

  try {
      const response = await fetch('/watches', {
          method: 'POST',
          body: formData,  
      });

      if (response.ok) {
          console.log("Watch added successfully!");
          form.reset();  
          modal.style.display = 'none'; 
          displayWatches(); 
      } else {
          throw new Error('Failed to add watch');
      }
  } catch (err) {
      console.error(err.message);
  }
};

function loadEditModal(watch) {
  if (!watch._id) {
    console.error('Invalid watch ID:', watch._id);
    return; 
  }
  document.getElementById('editWatchId').value = watch._id;
  document.getElementById('editWatchName').value = watch.name;
  document.getElementById('editWatchMaterial').value = watch.material;
  document.getElementById('editWatchDial').value = watch.dialColor;
  document.getElementById('editWatchBracelet').value = watch.bracelet;
  document.getElementById('editWatchPrice').value = '$' + watch.price;
  document.getElementById('editWatchYear').value = watch.year;

  document.getElementById('editWatchModal').style.display = 'block';
}

document.getElementById('editWatchForm').onsubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  let price = formData.get('price').replace(/[^\d.]/g, '');
  formData.set('price', price);

  const watchId = document.getElementById('editWatchId').value; // Ensure this is not null or 'undefined'

  if (!watchId) {
    console.error('Invalid or missing watch ID');
    return;  // Do not submit if ID is invalid
  }

  try {
      const response = await fetch(`/watches/${watchId}`, {
          method: 'PUT',
          body: formData, 
      });

      if (response.ok) {
          console.log("Watch updated successfully!");
          displayWatches();  
          document.getElementById('editWatchModal').style.display = 'none'; 
      } else {
          throw new Error('Failed to update watch');
      }
  } catch (err) {
      console.error('Error updating watch:', err);
  }
};
var closeEditBtn = document.getElementsByClassName('close-edit-btn')[0];

closeEditBtn.onclick = function() {
    document.getElementById('editWatchModal').style.display = 'none';
}

document.querySelectorAll('.sell-btn').forEach(button => {
  button.addEventListener('click', function() {
      const watchId = this.getAttribute('data-id');  // Ensure each button has a data-id attribute
      document.getElementById('confirmSell').setAttribute('data-id', watchId); // Set the watch ID on the confirm button
      document.getElementById('sellModal').style.display = 'block';
  });
});

document.getElementById('confirmSell').addEventListener('click', function() {
  const watchId = this.getAttribute('data-id');
  fetch(`/watches/${watchId}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      console.log('Watch deleted:', data);
      document.getElementById('sellModal').style.display = 'none';
      displayWatches();  // Refresh the list of watches
  })
  .catch(error => console.error('Error deleting watch:', error));
});

document.getElementById('cancelSell').addEventListener('click', function() {
  document.getElementById('sellModal').style.display = 'none';
});

// Close the modal if the user clicks the X span
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('sellModal').style.display = 'none';
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('sell-btn')) {
        const watchId = event.target.getAttribute('data-id');
        document.getElementById('confirmSell').setAttribute('data-id', watchId); // Set the watch ID on the confirm button
        document.getElementById('sellModal').style.display = 'block';
    }
});
document.getElementById('watchPrice').addEventListener('input', function(e) {
  var value = e.target.value;

  if (!value.startsWith('$')) {
      value = '$' + value.replace(/[^0-9.]/g, ''); // Remove any character that is not a digit or decimal point
  } else {
      value = '$' + value.slice(1).replace(/[^0-9.]/g, ''); // Slice the string to skip the first character and clean the rest
  }

  e.target.value = value; // Set the cleaned value back to the input
});

window.onclick = function(event) {
if (event.target == editModal) {
  editModal.style.display = 'none';
}
}

