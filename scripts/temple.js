const templeURL = "../data/temple.json"

fetch(templeURL)
  .then((response) => response.json())
  .then((jsObject) => {
    const temples = makeCard(jsObject.temples);
    document.querySelector(".temple_container").innerHTML = temples.join("");

    //call addevntlistener
    addListeners();
  });

function makeCard(tempList) {
  const templeHtml = tempList.map((temple) => {
    const favItem = window.localStorage.getItem(temple.id);
    let ifFav;

    favItem === "favo" ? (ifFav = "favo") : (ifFav = "unfav");

    //temple services
    const services = temple.services.map((service) => {
      return `<li>${service}</li>`;
    });

    //temple closure
    const closures = temple.closure.map((element) => {
      const closureDates = element.dates.map((date) => {
        return `<li>${date}</li>`;
      });

      return `<p>${element.year}</p>
                <ul>
                  ${closureDates.join("")}
                </ul>`;
    });

    //the template
    return `
        <div class="temple_card">              
            <div class="intro">
                <h3>${temple.name}</h3>
                <picture>
                    <img src="${temple.image}" alt="temple image" >
                </picture>
                <button><a href="https://reserve.html">Book Appointment</a></button>
    
            </div>
            
            <div class="temple-location">
                <input type="hidden" value=${temple.id}>
                <div>
                  <p>${temple.address}</p>
                  <p>${temple.phone}</p>
                  <p>${temple.email}</p>
                </div>
                
                  <img src="../images/icon_fb.png" alt="favourite" class="like-button ${ifFav}"/>
                
            </div>
              
            <div class="temple-services">
                <h3>Services</h3>
                <ul>
                    <li>${services.join("")}<li>
                </ul>
            </div>
            <div class="temple-history">
                <h3>History</h3>
                <p>
                  ${temple.history}
                </p>
              </div>
            <div class="temple-schedule">
                <p>Ordinance/session schedule</p>
                <p>
                    ${temple.schedule}
                </p>
            </div>
            
            <div class="temple-closure">
                ${closures.join("")}
            </div>
            
        </div>`;
  });

  //return temple list
  return templeHtml;
}

function addListeners() {
  const likeBtn = document.querySelectorAll(".like-button");
  likeBtn.forEach((element) => {
    element.addEventListener("click", (event) => {
      const tempId = event.target.parentNode.childNodes[1].value;

      if (event.target.classList.contains("unfav")) {
        event.target.src = "../images/icon_fb.png";
        event.target.classList.remove("unfav");
        event.target.classList.add("favo");
        localStorage.setItem(tempId, "favo");
      } else if (event.target.classList.contains("favo")) {
        event.target.src = "../images/icons2.png";
        event.target.classList.add("unfav");
        event.target.classList.remove("favo");
        localStorage.setItem(tempId, "unfav");
      }
    });
  });
}
