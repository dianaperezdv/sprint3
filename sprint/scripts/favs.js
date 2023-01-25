import getDataFetch from "../helpers/getdata.js";
import { printFavorites } from "../modules/printFav.js";

const urlFavorites = "https://railways-production-16ef.up.railway.app/favorites";
const container = document.querySelector("#container");

document.addEventListener('DOMContentLoaded',async()=>{
    const favorites = await getDataFetch(urlFavorites);
    console.log(favorites);
    printFavorites(container, favorites);
})

document.addEventListener("click", async (event) => {
    const { target } = event;
    if (target.classList.contains("property_image")) {
        sessionStorage.setItem("propertyDetails", JSON.stringify(target.id));
        window.location.href = "./details.html";
    }
    });