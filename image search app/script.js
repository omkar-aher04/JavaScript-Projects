const query = document.querySelector("input");
const searchBtn = document.querySelector(".btn");
const form = document.querySelector("form");
const resultDiv = document.querySelector(".resultdiv");
const loadMore = document.querySelector(".loadMore");
const loader = document.querySelector(".loader");
const YOUR_ACCESS_KEY = "vBlpEnyq2bVxODWhZok3fPbx9sJfj1R4yAIUgzbZcuQ";

let page = 1;
let lastSearchTerm = "";
loader.style.display = "none";
form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // reset to first page
    resultDiv.innerHTML = ""; // clear previous results
    lastSearchTerm = query.value.trim();
    if (lastSearchTerm === "") return;
    loader.style.display = "block";
    displaydata(lastSearchTerm);
    
});

loadMore.addEventListener("click", () => {
    loader.style.display = "block";
    displaydata(lastSearchTerm);
});

async function displaydata(searchTerm) {
    try {
        loadMore.style.display = "none";
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=10`, {
            headers: {
                Authorization: `Client-ID ${YOUR_ACCESS_KEY}`
            }
        });
        const result = await response.json();
        
        showOnDisplay(result.results);
        
        loadMore.style.display = "block"; 
        page++; 
        query.value = ""; 

    } catch (error) {
        console.log("Try again later", error);
    } finally {
        loader.style.display = "none";
    }
}

function showOnDisplay(obj) {
    const fragment = document.createDocumentFragment();
    obj.forEach(element => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("imgContainer");

        const img = document.createElement("img");
        img.classList.add("img");
        img.src = element.urls.small;

        const desc = document.createElement("p");
        desc.classList.add("desc");
        desc.innerText = element.alt_description || "No description";

        imgContainer.append(img, desc);
        fragment.append(imgContainer);
    });
    
    resultDiv.append(fragment);
}