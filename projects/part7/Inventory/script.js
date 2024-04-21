function menuFunction() {
  var menu = document.getElementById("nav");
  if (menu.style.display === "block") {
      menu.style.display = "none";
  } else {
      menu.style.display = "block";
  }
}

function searchFunction() {
  var search = document.getElementById("SearchedWatches");
  if (search.style.display === "grid") {
      search.style.display = "none";
  } else {
      search.style.display = "grid";
      search.style.gridTemplateColumns = '1fr 1fr';
      search.style.gridTemplateRows = 'auto auto';
  }
}

async function displayWatches() {
  try {
      const response = await fetch('/api/watches');
      const watches = await response.json();

      const watchesContainer = document.getElementById('watchesContainer');
      watchesContainer.innerHTML = ''; // Clear existing entries

      watches.forEach(watch => {
          const watchElement = document.createElement('div');
          watchElement.className = 'watch';
          watchElement.innerHTML = `
              <h3>${watch.name}</h3>
              <p>Material: ${watch.material}</p>
              <p>Dial Color: ${watch.dialColor}</p>
              <p>Bracelet: ${watch.bracelet}</p>
              <p>Price: ${watch.price}</p>
              <p>Year: ${watch.year}</p>
              <button onclick="deleteWatch('${watch._id}')">Delete</button>
              <button onclick="editWatch('${watch._id}')">Edit</button>
          `;
          watchesContainer.appendChild(watchElement);
      });
  } catch (error) {
      console.error('Failed to load watches:', error);
  }
}

async function addWatch(watchData) {
  try {
      const response = await fetch('/watches', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(watchData)
      });
      await displayWatches(); // Refresh the list after adding
  } catch (error) {
      console.error('Failed to add watch:', error);
  }
}

async function editWatch(id) {
  const watchData = {
      name: prompt("Enter new watch name"),
      // Add more prompts for other watch attributes here
  };

  try {
      const response = await fetch(`/watches/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(watchData)
      });
      await displayWatches(); // Refresh the list after editing
  } catch (error) {
      console.error('Failed to edit watch:', error);
  }
}

async function deleteWatch(id) {
  try {
      const response = await fetch(`/watches/${id}`, {
          method: 'DELETE'
      });
      await displayWatches(); // Refresh the list after deleting
  } catch (error) {
      console.error('Failed to delete watch:', error);
  }
}

document.addEventListener('DOMContentLoaded', displayWatches);
