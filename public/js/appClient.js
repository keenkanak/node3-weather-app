//console.log("Client side JavaScript")
//fetch is an api
//Taking input from the form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    const messageOne = document.querySelector('#messageOne')
    const messageTwo = document.querySelector('#messageTwo')
    const message = document.querySelector('#message')
    messageOne.textContent = "Loading.."
    messageTwo.textContent = ""
    message.textContent = ""
    const location = search.value
    e.preventDefault()
    //console.log(location)
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.code == 615) {
                messageOne.textContent = data.info

            }
            else {
                message.textContent = "Latitude: " + data.Latitude + " \nLongitude: " + data.Longitude
                messageOne.textContent = data.Location
                messageTwo.textContent = data.Forecast
            }
        })
    })
})
