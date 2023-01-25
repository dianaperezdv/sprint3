export const printProp = (container, array) => {
    container.innerHTML = "";
    array.forEach((property) => {
    const article = document.createElement("article");
    article.classList.add("property");
        article.innerHTML = `
        <figure class="property_img">
            <img id="${property.id}" src="${property.image}" alt="Property image" class="property_image">
        </figure>
        <p class="type">${property.type}</p>
        <p class="status">${property.status}</p>
        <p class="price">$${property.price}</p>
        <div class="property_info">
                <p class="location">${property.location}</p>
                <h4 class="name">${property.name}</h4>
                <p class="owner"> <img src="${property.profilePicture}" alt="Owner profile picture">${property.ownerName}</p>
                <p class="time">${property.date}</p>
                <div class="subdiv">
                    <p class="area"><img src="./img/area.jfif" alt=""><span>${property.area}</span> Sq Ft</p>
                    <ul>
                        <li><img src="./img/car.png" alt="">${property.garage}</li>
                        <li><img src="./img/bathroom.png" alt="">${property.numberBathrooms}</li>
                        <li><img src="./images.png" alt="">${property.numberBedrooms}</li>
                    </ul>
                </div>
                <button name="${property.id}" class="delete">❌</button>
                <button name="${property.id}" class="favorite">📝</button>
                <button name="${property.id}" class="edit">❤</button>
            
            </div>
            `;

        container.appendChild(article);
    });
};