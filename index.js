require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.API_KEY
const port = process.env.PORT
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/weather', async (req, res) => {
    const { city } = req.query
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }
    const queryCity = city || 'London'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=metric`;

    try {
        console.log('...Fetching weather');
        const response = await axios.get(url);
        // console.log(response.data);
        // res.send(response.data)

        if(!response){
            console.log('city doesnt exist');
        }   
        console.log('data received');
        // console.log(response);

        const data = response.data
        const temp = data.main.temp
        const description = data.weather[0].description
        const country = data.sys.country
        console.log(temp , description);

        res.status(200).json({
            city:queryCity,
            temperature:temp,
            description:description,
            country:country
        })

    } catch (error) {
        if (error.response) {
            // console.log(error.response);
            
            const status = error.response.status;
            console.log(`API responded with status ${status}`);

            if (status === 404) {
                // Log the specific invalid city name to console
                console.log(`Invalid city name provided: "${queryCity}" (not found)`);
            }

            // Forward the API's error JSON to the client
            res.status(status).json(error.response.data);
        } else {
            console.log('Unexpected error (no response from API):', error.message);
            res.status(500).json({ error: 'Something went wrong while fetching weather data' });
        }
    }
})

app.listen(port, () => {
    console.log(`server listening on ${port}`);
})