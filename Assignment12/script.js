const getHouses = async () => {
    const url = "https://portiaportia.github.io/json/house-plans.json";
        
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const showHouses = async () => {
    let houses = await getHouses();
    let housesSection = document.getElementById("houses-section");
    const baseUrl = "https://portiaportia.github.io/json/images/house-plans/";

    houses.forEach((house) => {
        let houseDiv = document.createElement("div");
        houseDiv.classList.add("house");

        let descriptionDiv = document.createElement("div");
        let nameH2 = document.createElement("h2");
        nameH2.textContent = house.name;
        descriptionDiv.appendChild(nameH2);

        let mainImage = document.createElement("img");
        mainImage.src = baseUrl + house.main_image;
        mainImage.alt = `Main image of ${house.name}`;
        houseDiv.appendChild(mainImage);


        let sizeP = document.createElement("p");
        sizeP.textContent = `Size: ${house.size} sqft`;
        descriptionDiv.appendChild(sizeP);

        let bedroomsP = document.createElement("p");
        bedroomsP.textContent = `Bedrooms: ${house.bedrooms}`;
        descriptionDiv.appendChild(bedroomsP);

        let bathroomsP = document.createElement("p");
        bathroomsP.textContent = `Bathrooms: ${house.bathrooms}`;
        descriptionDiv.appendChild(bathroomsP);

        let featureTitle = document.createElement("p");
        featureTitle.textContent = `Features:`;
        descriptionDiv.appendChild(featureTitle);

        let featuresP = document.createElement("p");
        house.features.forEach(feature => {
            let featureLi = document.createElement("p");
            featureLi.textContent = feature;
            descriptionDiv.appendChild(featureLi);
        });
        descriptionDiv.appendChild(featuresP);

        houseDiv.appendChild(descriptionDiv);

        let floorPlansDiv = document.createElement("div");
        floorPlansDiv.classList.add("floor-plans");

        house.floor_plans.forEach((plan) => {

            let planDiv = document.createElement("div");
            planDiv.classList.add("floor-plan");

            let planNameP = document.createElement("p");
            planNameP.textContent = plan.name;
            planDiv.appendChild(planNameP);
            let planImage = document.createElement("img");
            planImage.src = baseUrl + plan.image;
            planImage.alt = `${plan.name} of ${house.name}`;
            planDiv.appendChild(planImage);

            

            floorPlansDiv.appendChild(planDiv);
        });

        houseDiv.appendChild(floorPlansDiv);
        housesSection.appendChild(houseDiv);
    });
};

window.onload = () => showHouses();
