let search = document.getElementById("search");
let display = document.getElementById("display");
let debounceTimer;

const api = "https://www.omdbapi.com/?apikey=f6ec743a&t=";

function displayData(data) {
  let detailsDiv = document.createElement("div");
  let imageDiv = document.createElement("div");

  detailsDiv.classList.add("details");
  imageDiv.classList.add("image");
  imageDiv.innerHTML = `<img src= "${data.Poster}"/>`;

  detailsDiv.innerHTML = `
            <h1>${data.Title}</h1>
            <h3>${data.Released}</h3>
            <p><b>Actors: </b> ${data.Actors}</p>
            <p><b>Genre: </b>${data.Genre}</p>
            <p><b>About Movie: </b>${data.Plot}</p>
            <p><b>Ratings: </b><li>${data.Ratings[0].Value} by ${data.Ratings[0].Source}</li></p>
            <p><b>Country: </b>${data.Country}</p>
            <p><b>Awards: </b>${data.Awards}</p>`;

  display.append(imageDiv, detailsDiv);
}

async function fetchData(searchValue) {
  try {
    let data = await fetch(`${api}${searchValue}`);
    data = await data.json();
    displayData(data);
  } catch (err) {
    console.error(err);
  }
}

window.onload = () => {
  search.addEventListener("keyup", (e) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      let sValue = e.target.value.trim();

      if (display.innerHTML !== "") {
        display.innerHTML = "";
      }
      fetchData(sValue);
    }, 3000);
  });
};

// fetch(`${api}${sValue}`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);

//     if (display.innerHTML !== "") {
//       display.innerHTML = "";
//     }
//     displayData(data);
//   });
