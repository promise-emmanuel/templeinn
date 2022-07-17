// hamburger menu
// for the hamburger menu
function toggleMenu() {
    console.log('It worked')
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburger_btn").classList.toggle("open");
}

const x = document.getElementById("hamburger_btn")
x.onclick = toggleMenu;

// for the wayfinder in the links

function active() {
    switch (document.title) {
      case "Temple Inn - Home page":
        document.querySelector(".active").classList.add("close");
        break;
  
      case "Temple Inn - Temples":
        document.querySelector(".active2").classList.add("close");
        break;
  
      case "Temple Inn - Reservation":
        document.querySelector(".active3").classList.add("close");
        break;
  
      case "Temple Inn - Our services":
        document.querySelector(".active4").classList.add("close");
        break;
      case "Temple Inn - Contact":
        document.querySelector(".active5").classList.add("close");
        break;

    }
  }
  
  active();

// function wayFind() {
    // console.log('It is active')
    // document.getElementById("#active").classList.add("close");

// }

// const a = document.getElementById("#active");
// const b = document.getElementById("active2");
// const c = document.getElementById("active3");
// const d = document.getElementById("active4");
// const e = document.getElementById("active5");

// a.onclick = wayFind;
// b.onclick = wayFind;
// c.onclick = wayFind;
// d.onclick = wayFind;
// e.onclick = wayFind;


const datefield = document.querySelector(".date");

// derive the current date using a date object which would be used throughout the weather summary
const now = new Date();

// convert the date format to full date
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
// display today's complete date
datefield.innerHTML = `<em>${fulldate}</em>`;



// select HTML elements in the document
// today
const currentTemp = document.querySelector('.current_temp');
const currentCondition = document.querySelector('.condition');
const currentHumidity = document.querySelector('.humidity');

// tomorrow
const tomorrowTemp = document.querySelector('.temp_tom');
const tomorrowCondition = document.querySelector('.condition_tom');
const tomorrowHumidity = document.querySelector('.humidity_tom');


// for next_tomorrow: 
const nextTomorrowName = document.querySelector('.name_two_days');
const nextTomorrowTemp = document.querySelector('.temp_two_days');
const nextTomorrowCondition = document.querySelector('.condition_two_days');
const nextTomorrowHumidity = document.querySelector('.humidity_two_days');


// since next tomorrow is two days away, we could set it by getting today's date and add two to it to display a day two days ahead
// a date object called "now" has already been created above, so use it to set the future date

const future = now.setDate(now.getDate() + 2);

// here, we format the future date object to display only the day e.g "monday" and not the complete date format
const option2 = {weekday: 'long'};
const weekEndDay = new Intl.DateTimeFormat("en-us", option2).format(future);
nextTomorrowName.innerHTML = weekEndDay;

// for next_three_days: 
const threeDaysName = document.querySelector('.name_three_days');
const threeDaysTemp = document.querySelector('.temp_three_days');
const threeDaysCondition = document.querySelector('.condition_three_days');
const threeDaysHumidity = document.querySelector('.humidity_three_days');


// since the future is three days away, we could set it by getting today's date and add three to it to display a day three days ahead
// a date object called "now" has already been created above, so use it to set the future date

const threeFuture = new Date().setDate(new Date().getDate() + 3);

// here, we format the future date object to display only the day e.g "monday" and not the complete date format
const option3 = {weekday: 'long'};
const weekEndDayThree = new Intl.DateTimeFormat("en-us", option3).format(threeFuture);
threeDaysName.innerHTML = weekEndDayThree;


// this calls the weather api and displays the result
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=6.465422&lon=3.406448&units=metric&appid=6aabcca95a57d03f3a612f8f00c668e7`;

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();


  function displayResults(weatherData) {
    // today's weather report
    currentTemp.innerHTML = `<strong>${weatherData.current.temp.toFixed(0)}°C</strong>`;


    currentCondition.innerHTML = weatherData.current.weather[0].description[0].toUpperCase() + weatherData.current.weather[0].description.substring(1);
  
    currentHumidity.innerHTML = weatherData.current.humidity.toFixed(0);

    // tomorrow weather report
    tomorrowTemp.innerHTML = `<strong>${weatherData.daily[0].temp.day.toFixed(0)}°C</strong>`;
    tomorrowCondition.innerHTML = weatherData.daily[0].weather[0].description[0].toUpperCase() + weatherData.daily[0].weather[0].description.substring(1);  
    tomorrowHumidity.innerHTML = weatherData.daily[0].humidity.toFixed(0);

    // next tomorrow's weather report
    nextTomorrowTemp.innerHTML = `<strong>${weatherData.daily[1].temp.day.toFixed(0)}°C</strong>`;
    nextTomorrowCondition.innerHTML = weatherData.daily[1].weather[0].description[0].toUpperCase() + weatherData.daily[1].weather[0].description.substring(1);
    nextTomorrowHumidity.innerHTML = weatherData.daily[1].humidity.toFixed(0);

    // three days ahead weather report
    threeDaysTemp.innerHTML = `<strong>${weatherData.daily[2].temp.day.toFixed(0)}°C</strong>`;
    threeDaysCondition.innerHTML = weatherData.daily[2].weather[0].description[0].toUpperCase() + weatherData.daily[2].weather[0].description.substring(1);
    threeDaysHumidity.innerHTML = weatherData.daily[2].humidity.toFixed(0);

    

  }

