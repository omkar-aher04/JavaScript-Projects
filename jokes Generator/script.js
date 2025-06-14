const btn = document.querySelector(".btn-grad");
const onDOM = document.querySelector(".result-joke");
const API_KEY = "q7PknkVIzHUQGp5jnjqQAA==dpNJqwdNDWU5R5QW";

btn.addEventListener("click",displayJoke);

async function displayJoke(){
    try{
        onDOM.textContent = "Loading...";
        const response = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
        method: "GET",
        headers: {
            "X-Api-Key": API_KEY
        }
    });
    const result = await response.json();
    console.log(result);
    if (result.length > 0) {
            onDOM.textContent = result[0].joke;
        } else {
            onDOM.textContent = "No joke found. Try again!";
        }

    }
    catch(error){
        onDOM.textContent = "Failed to fetch joke. Please try again.";
    }
    
}