document.addEventListener("DOMContentLoaded", function() {
    var advertisements = [
        "Crystal Clear",
        "Limited Supplies",
        "One Day Shipping",
        "Buy Two Get Two Free",
        "Sturdy Framing"
    ];

    var currentIndex = 0;

    function updateAdvertisement() {
        document.getElementById("advertisement").textContent = advertisements[currentIndex];
        currentIndex = (currentIndex + 1) % advertisements.length;
    }

    function createImageGallery(images) {
        var galleryContainer = document.getElementById("imageGallery");
        
        for (var imageName in images) {
            if (images.hasOwnProperty(imageName)) {
                var imageSrc = images[imageName].src;
                var imageAttribution = images[imageName].attribution;
                
                var imageElement = document.createElement("img");
                imageElement.src = imageSrc;

                var attributionElement = document.createElement("p");
                attributionElement.innerHTML = "<a href='" + imageAttribution.link + "' target='_blank'>" + imageAttribution.text + "</a>";

                galleryContainer.appendChild(imageElement);
                galleryContainer.appendChild(attributionElement);
            }
        }
    }

    updateAdvertisement();

    setInterval(updateAdvertisement, 2000);

    var images = {
        "image1": {
            "src": "images/garden.jpg",
            "attribution": {
                "text": "Image by vecstock on Freepik",
                "link": "https://www.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_40965130.htm#query=landscape&position=0&from_view=keyword&track=sph&uuid=8e520e53-3fb6-4e41-9da7-682c824a94f7"
            }
        },
        "image2": {
            "src": "images/golden.jpg",
            "attribution": {
                "text": "Image by wirestock on Freepik",
                "link": "https://www.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_11342065.htm#query=landscape&position=7&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4"
            }
        },
        "image3": {
            "src": "images/mountain-lake.jpg",
            "attribution": {
                "text": "Image by wirestock on Freepik",
                "link": "https://www.freepik.com/free-photo/amazing-shot-beautiful-butchart-gardens-brentwood-bay_20496783.htm#query=landscape&position=27&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4"
            }
        },
        "image4": {
            "src": "images/small-house.jpg",
            "attribution": {
                "text": "Image by wirestock on Freepik",
                "link": "https://www.freepik.com/free-photo/small-houses-green-field-with-dark-sky_7553929.htm#query=landscape&position=39&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4"
            }
        },
        "image5": {
            "src": "images/snow.jpg",
            "attribution": {
                "text": "Image by wirestock on Freepik",
                "link": "https://www.freepik.com/free-photo/beautiful-scenery-lot-leafless-trees-snow-covered-land-during-sunset_10990489.htm#query=landscape&position=38&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4"
            }
        }
    };

    createImageGallery(images);
});