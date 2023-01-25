import getDataFetch from "../helpers/getdata.js";
import putDataFetch from "../helpers/putdata.js";
import postDataFetch from "../helpers/postdata.js";

const form = document.querySelector(".form");
const title = document.querySelector(".title");

const urlProperties = "https://railways-production-16ef.up.railway.app/properties";

const valuesForm = Object.values(form);
const submitBtn = valuesForm[valuesForm.length - 1];
const editIdStr = sessionStorage.getItem("editProperty")
    ? JSON.parse(sessionStorage.getItem("editProperty"))
    : "";

const editId = editIdStr ? parseInt(editIdStr) : null;
submitBtn.innerHTML = editId ? "Save" : "Add Property";

document.addEventListener("DOMContentLoaded", async () => {
    let editProperty = {};
    const urlProp = editId ? `${urlProperties}/${editId}` : `${urlProperties}`;

    try {
        if (editId) {
        editProperty = await getDataFetch(urlProp);
        title.innerHTML = editId ? `Edit this property` : `Add a new property`;
        valuesForm.forEach((input) => {
            if (input.id) {
            input.value = editProperty[input.id];
            }
        });
        }
        submitForm(form, urlProp);
    } catch (error) {
        console.log(error);
    }
});

const submitForm = async (form, url) => {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const propertyInfo = {};

        valuesForm.forEach((input) => {
        if (input.id) {
            propertyInfo[input.id] = input.value;
        }
});

    const labelsNodeList = document.querySelectorAll("label");
    const labelArray = [...labelsNodeList];
    console.log(labelArray);
    const notEmpty = inputValidation(labelArray, propertyInfo);
    if (notEmpty && editId) {
        await putDataFetch(url, propertyInfo);
        Swal.fire(
            'Your property has been updated',
        ).then(()=>{
            window.location.href = "../index.html";
        })
        }

    if (notEmpty && !editId) {
        await postDataFetch(url, propertyInfo);
        Swal.fire(
            'Your property has been added',
        ).then(()=>{
            valuesForm.forEach((input) => {
            if (input.id) {
                input.value = "";
            }
            });
        })
    }
    });
};

const inputValidation = (arrayLabels, propertyInfo) => {
    const keyLabels = arrayLabels.map((key) => ({
        labelName: key.innerHTML,
        keyName: key.getAttribute("for"),
    }));

    let keyStr = "";
    for (const key in propertyInfo) {
        const property = propertyInfo[key];

        if (!property) {
        const labelFound = keyLabels.find((label) => label.keyName === key);
        keyStr += labelFound.labelName + ", ";
        }
    }
    if (keyStr) {
        keyStr = keyStr.slice(0, -2);
        let message = `Fill the ${keyStr} input(s)`;
        alert(message);
        return false;
    }
    return true;
};