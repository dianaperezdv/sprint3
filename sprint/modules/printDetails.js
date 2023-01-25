export const printPropertyDetails = (container, property) => {
    container.innerHTML = "";
    container.innerHTML = `
    <section class="details">
    <figure class="property_figure">
        <img
        src="${property.image}"
        alt=""
        />
        <figcaption>
        ${property.description}
        </figcaption>
    </figure>
    <article class="property_details">
        <div class="property_info">
            <span class="category">Bedrooms</span>
            <span>${property.numberBedrooms}</span>
        </div>
        <div class="property_info">
            <span class="category">Bathrooms</span>
            <span>${property.numberBathrooms}</span>
        </div>
        <div class="property_info">
            <span class="category">Garage</span>
            <span>${property.garage}</span>
        </div>
        <div class="property_info">
            <span class="category">Listed</span>
            <span>${property.date}</span>
        </div>
        <div class="property_info">
            <span class="category">Size (Sq Ft)</span>
            <span>${property.area}</span>
        </div>
        <div class="property_info">
            <span class="category">Location</span>
            <span>${property.location}</span>
            </div>
        <div class="property_info">
            <span class="category">Type</span>
            <span>${property.type}</span>
        </div>
        <div class="property_info">
            <span class="category">Status</span>
            <span>${property.status}</span>
        </div>
        <div class="property_info">
            <span class="category">Price</span>
            <span>${property.price}</span>
        </div>
    </article>
    </section>
    <section class="owner_details">
        <h3>Owner contact</h3>
    <div class="name">
    <img
        src="${property.profilePicture}"
        alt="Profile picture"
    />
        <p class="name">${property.ownerName}</p>
    </div>
    <div class="owner_info">
        <span class="category">Email</span><span>${property.email}</span>
    </div>
    <div class="owner_info">
        <span class="category">Phone number</span><span>${property.phoneNumber}</span>
    </div>
</section>
    `
};