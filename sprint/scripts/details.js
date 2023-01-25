import  getDataFetch  from "../helpers/getData.js";
import { printPropertyDetails } from "../modules/printDetails.js";


const idPropertyStr = sessionStorage.getItem("propertyDetails")?JSON.parse(sessionStorage.getItem("propertyDetails")):null;

const idProperty = idPropertyStr?parseInt(idPropertyStr):null;

console.log(idProperty);

const urlProperty = `https://railways-production-16ef.up.railway.app/properties/${idProperty}`;

const title = document.querySelector(".title");

const container = document.querySelector("main");

document.addEventListener('DOMContentLoaded',async()=>{
    try{
        const property = await getDataFetch(urlProperty);
        title.innerHTML = `${property.name}`;
        printPropertyDetails(container,property);

    }catch(error){
        console.log(error);
    }
})