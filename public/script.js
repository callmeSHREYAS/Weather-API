

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim()
    if (!city) {
        return alert('Enter a City!')
    }
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`/weather?city=${encodeURIComponent(city)}`)
        console.log('Fetch done-status: ', response.status);

        if (!response.ok) {
            const errData = await response.json()
            if (errData.cod === '404') {
                resultDiv.innerHTML = `<p style="color:red;">Sorry , City ${city} does not exist</p>`
            }
            else {
                resultDiv.innerHTML = `Network Error , please check ur network</p>`
            }
        }
        else {
            const data = await response.json()
            resultDiv.innerHTML = `
            <h2>${data.city}</h2>
            <p>Temp: ${data.temperature}°C</p>
            <p>${data.description}</p>
            `;
        }

    } catch (error) {
        console.log(error.message);  // NEW: Confirms catch fires
        resultDiv.innerHTML = `<p style="color:red;">Oops!, ${error.message}</p>`
        // console.error(error)
        // if (error.response) {
        //     console.log(error.message);  // NEW: Confirms catch fires
        //     resultDiv.innerHTML = `<p style="color:red;">Sorry , City ${city} does not exist</p>`
        // }
        // else {
        //     console.log(error.message);  // NEW: Confirms catch fires
        //     resultDiv.innerHTML = `<p style="color:red;">Oops!, ${error.message}</p>`
        // }
        console.log(error.message);


    }
}