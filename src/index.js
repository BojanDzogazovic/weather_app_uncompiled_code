//vars
let cityName = document.getElementById("city");
let result = document.getElementById("result");
//get cards
   //get cards
let card0 = document.getElementById("0"),
card1 = document.getElementById("1"),
card2 = document.getElementById("2"),
card3 = document.getElementById("3"),
card4 = document.getElementById("4"),
card5 = document.getElementById("5"),
card6 = document.getElementById("6");

let cards = [card1, card2, card3, card4, card5, card6]; 

//listeners
document.querySelector("form").addEventListener("submit", displayData);

function displayData(e){
    let failed;
    //fetch 6-days data
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName.value}&days=7&key=65b5d56aedbd4e16ae6fcd9db9627a41`)
    .then(response => {
        if(response.status > 200){
            failed = true;
            cards.forEach(card => {
                card.innerHTML = "";
            });
            result.innerHTML = `
            <div class="center-align error">
                <p>Please enter valid city name.</p>
            </div>`;
            setTimeout(() => {
                result.innerHTML = "";
            }, 1200);
        }
        else if(response.status === 200){
            failed = false;
            return response.json();
        }
    })
    .then(data =>{
        console.log(data);
        if(!failed){
            //empty if new search
            cards.forEach(card => {
                card.innerHTML = "";
            });

            //init carousel
            let carousel = document.querySelector('.carousel');
            let instances = M.Carousel.init(carousel);  
        
            //display result
            result.innerHTML = `
            <div>
                <h2>${data.city_name}, ${data.country_code}</h2>
                <p>Timezone: ${data.timezone}</p>
                <p>Lattitude: ${data.lat}<br>
                Longtitude: ${data.lon}</p>      
            </div>
            `;  
             
            //fill cards
            function displayCard(card){
                card.innerHTML += `
                <div class="cards">
                    <img src="icons/${(data.data[card.id].weather.icon)}.png">
                    <h5 class="bold">${data.data[card.id].weather.description}</h5>
                    <p><span class="bold">Date: </span>${data.data[card.id].datetime}</p>
                    <p><span class="bold">Sunrise: </span>${Math.floor((data.data[card.id].sunrise_ts - data.data[card.id].ts) / 3600)}:${Math.round(((data.data[card.id].sunrise_ts - data.data[card.id].ts) % 3600) / 60)} am<br>
                       <span class="bold">Sunset: </span>${Math.floor((data.data[card.id].sunset_ts - data.data[card.id].ts) / 3600)}:${Math.round(((data.data[card.id].sunset_ts - data.data[card.id].ts) % 3600) / 60)} pm</p>
                    <p><span class="bold">Average temp: </span>${Math.floor(((data.data[card.id].max_temp)+(data.data[card.id].min_temp))/2)} C°<br>
                       <span class="bold">Max temp: </span>${data.data[card.id].max_temp} C°<br>
                       <span class="bold">Min temp: </span>${data.data[card.id].min_temp} C°</p>
                    <p><span class="bold">Wind: </span>${data.data[card.id].wind_cdir}, ${Math.round(data.data[card.id].wind_spd)} km/h</p>
                </div>
            `;
            }
            //display cards
            cards.forEach(card => {
                displayCard(card);
            });
        
        }
    })

    //fetch today's forecast
    fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName.value}&days=7&key=65b5d56aedbd4e16ae6fcd9db9627a41`)
        .then(response => {
            if(response.status > 200){
                failed = true;
                card0.innerHTML = "";
                result.innerHTML = `
                <div class="center-align error">
                    <p>Please enter valid city name.</p>
                </div>`;
                setTimeout(() => {
                    result.innerHTML = "";
                }, 1200);
            }
            else if(response.status === 200){
                failed = false;
                return response.json();
            }
        })
        .then(data =>{
            console.log(data.data);
            if(!failed){
            
                //empty if new search
                card0.innerHTML = "";
                
                //todays date
                let today = new Date();
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                
                //fill card
                function displayCard(card){
                    card.innerHTML += `
                        <div class="cards">
                            <img src="icons/${(data.data[card.id].weather.icon)}.png">
                            <h5 class="bold">${data.data[card.id].weather.description}</h5>
                            <p><span class="bold">Date: </span>${days[today.getDay()]}, ${months[today.getMonth()]}. ${today.getDate()}. ${today.getFullYear()}</p>
                            <p><span class="bold">Sunrise: </span>${data.data[card.id].sunrise} am<br>
                            <span class="bold">Sunset: </span>${data.data[card.id].sunset} pm</p>
                            <p><span class="bold">Temp: </span>${data.data[card.id].temp} C°<br>
                            <span class="bold">Sub feeling: </span>${data.data[card.id].app_temp} C°</p>
                            <p><span class="bold">Wind: </span>${data.data[card.id].wind_cdir_full}, ${Math.round(data.data[card.id].wind_spd)} km/h<br>
                            <span class="bold">Air pressure: </span>${data.data[card.id].pres}mb<br>
                            <span class="bold">Humidity: </span>${data.data[card.id].rh}%<br>
                            <span class="bold">UV index: </span>${data.data[card.id].uv}%</p>
                        </div>
                    `;
                } 
                
                //display card
                displayCard(card0);
            }
            
        });

        e.preventDefault();
}


