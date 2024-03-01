function showTreeInfo(index) {
    var trees = [
        {
            title: "Bald Cypress",
            image: "images/bald_cypress.jpeg",
            description: "The Bald Cypress is a large coniferous tree native to North America. It is known for its distinctive trunk that tapers at the base and its ability to thrive in wetland environments.",
            height: "130 feet",
            age: "500 years",
            species: "Taxodium distichum",
            location: "Swamps and floodplains"
        },
        {
            title: "Eastern Redbud",
            image: "images/eastern_redbud.jpeg",
            description: "The Eastern Redbud is a small deciduous tree native to eastern North America. It is prized for its ornamental value, producing pink or purple flowers in early spring before the leaves emerge.",
            height: "30 feet",
            age: "25 years",
            species: "Cercis canadensis",
            location: "Woodlands and gardens"
        },
        {
            title: "Loblolly Pine",
            image: "images/loblolly_pine.jpeg",
            description: "The Loblolly Pine is a large evergreen tree native to the southeastern United States. It is one of the most commercially important species of pine, valued for its timber and resin production.",
            height: "115 feet",
            age: "150 years",
            species: "Pinus taeda",
            location: "Forests and plantations"
        },
        {
            title: "Southern Magnolia",
            image: "images/southern_magnolia.jpeg",
            description: "The Southern Magnolia is a majestic evergreen tree native to the southeastern United States. It is renowned for its large, fragrant white flowers and glossy green leaves.",
            height: "80 feet",
            age: "75 years",
            species: "Magnolia grandiflora",
            location: "Gardens and parks"
        }
    ];
    
    
    var tree = trees[index];
    var modalContent = document.getElementById("treeInfo");
    var modalImage = document.getElementById("treeImage");
    
    // Set tree information on the left side
    modalContent.innerHTML = `
        <h2>${tree.title}</h2>
        <p>${tree.description}</p>
        <p><strong>Height:</strong> ${tree.height}</p>
        <p><strong>Age:</strong> ${tree.age}</p>
        <p><strong>Species:</strong> ${tree.species}</p>
        <p><strong>Location:</strong> ${tree.location}</p>
    `;
    
    // Set tree image on the right side
    modalImage.src = tree.image;

    // Display the modal
    document.getElementById("treeModal").style.display = "block";
}

function closeTreeModal() {
    document.getElementById("treeModal").style.display = "none";
}