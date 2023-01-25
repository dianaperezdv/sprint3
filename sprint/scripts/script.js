import getDataFetch from "../helpers/getData.js";
import deleteDataFetch from "../helpers/deleteData.js";
import { printProp } from "../modules/printProp.js";
import postDataFetch from "../helpers/postData.js";
import { btnFilters } from "../modules/filters.js";
const urlProperties = "https://railways-production-16ef.up.railway.app/properties";
const urlFavorites = "https://railways-production-16ef.up.railway.app/favorites";
let properties = [];

const propertiesContainer = document.querySelector(".propertiesContainer");
const searchInput = document.getElementById("searchInput");
const btnAll = document.getElementById("all");
const btnApartment = document.getElementById("apartment");
const btnHouse = document.getElementById("house");

const filterButtons = [
    btnAll,
    btnApartment,
    btnHouse,
];

document.addEventListener("DOMContentLoaded", async () => {
    sessionStorage.removeItem("propertyDetails");
    sessionStorage.removeItem("editProperty");

    try {
        properties = await getDataFetch(urlProperties);
        console.log(properties);

        printProp(propertiesContainer, properties);
        btnFilters(filterButtons, properties, propertiesContainer);
    } catch (error) {
        console.log(error);
    }
});

document.addEventListener("click", async (event) => {

    const { target } = event;

    if (target.classList.contains("property_image")) {
        sessionStorage.setItem("propertyDetails", JSON.stringify(target.id));
        window.location.href = "./pages/details.html";
    }

    if (target.classList.contains("delete")) {
    {
        Swal.fire({
        title: "Are you sure?",
        icon: "Warning",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#7d2aad",
        cancelButtonColor: "#ad2a37",
        confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const idProperyDelete = parseInt(target.name);
                const urlDelete = `${urlProperties}/${idProperyDelete}`;
                try {
                    await deleteDataFetch(urlDelete);
                    properties = await getDataFetch(urlProperties);
                    printProp(propertiesContainer, properties);
                    Swal.fire(
                    'Your property has been deleted.'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
    }

    if (target.classList.contains("favorite")) {
        const idFavorite = target.name;
        const urlFavoriteProperty = `${urlFavorites}?id=${idFavorite}`;
        const favorite = await getDataFetch(urlFavoriteProperty);
        const favoriteProperty = await getDataFetch(
        `${urlProperties}/${idFavorite}`
        );
        if (favorite.length === 0 && Object.entries(favoriteProperty).length) {
            await postDataFetch(urlFavorites, favoriteProperty);
            const data = await getDataFetch(urlFavorites);
            Swal.fire(
                'This property has been added to favorites',
            )
            console.log(data);
        }
    }

    if (target.classList.contains("edit")) {
        sessionStorage.setItem("editProperty", JSON.stringify(target.name));
        window.location.href = "./pages/form.html";
    }
});

searchInput.addEventListener("search", async () => {
    const location = searchInput.value;
    console.log("si escucho")
    try {
        if (location) {
            const propertyData = await getDataFetch(urlProperties);
            const searchResult = propertyData.filter((property) =>
                property.location.toLowerCase().includes(location.toLowerCase())
            );
            console.log(searchResult);
            printProp(propertiesContainer, searchResult);
            btnFilters(filterButtons, searchResult, propertiesContainer);
        } else {
            const propertyData = await getDataFetch(urlProperties);
            printProp(propertiesContainer, propertyData);
            btnFilters(filterButtons, propertyData, propertiesContainer);
        }
    } catch (error) {
        console.log(error);
    }
});
