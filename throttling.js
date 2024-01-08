const api = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const search = document.getElementById("search");
const display = document.getElementById("display");
let throttle = true;
let count = 0



function displayData({meals}) {
    console.log(meals);
  meals.forEach(meal => {
    let detailsDiv = document.createElement("div");
    detailsDiv.classList.add("item");

    detailsDiv.innerHTML = `
            <img src= "${meal.strMealThumb}"/>
            <h2>Name: ${meal.strMeal}</h2>
            <h3>Category: ${meal.strCategory}</h3>
            <p>#${meal.strTags}</p>`;

    display.append(detailsDiv);
  });
}

async function fetchData(sValue) {
    try {
      console.log(`${api}${sValue}`);
    let responce = await fetch(`${api}${sValue}`);
    let data = await responce.json();
    displayData(data);
  } catch (err) {
    console.error(err);
  }
}

window.onload = () => {
    search.addEventListener("keyup", (e) => {
        display.style.display = "grid";
      let sValue = e.target.value;
      if (throttle) {
          console.log(sValue)
          if (display.innerHTML !== "") {
              display.innerHTML = ""
          }
          fetchData(sValue)
      throttle = false;
      setTimeout(() => {
        throttle = true;
      }, 500);
    }
  });
};

