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
    search.style.gridTemplaterows = 'auto auto';
  }
}
