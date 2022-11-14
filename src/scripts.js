// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import Customer from './classes/customer'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

///query selectors
let customerView = document.querySelector('.customer-view')
let newBookingView = document.querySelector('.new-booking-view')

let customerTitle = document.querySelector('.customer-title')
let allCustomerBookings = document.querySelector('.all-customer-bookings')

let newBookingViewButton = document.querySelector('.new-booking-view-button')
let newBookingSubmitButton = document.querySelector('.book-new-room-button')

let newBookingUserIdInput = document.querySelector('#userID')
let newBookingDateInput = document.querySelector('#date')
let newBookingRoomNumberInput = document.querySelector('#roomNumber')


/// global variables
let customers
let rooms
let bookings
let currentCustomer

/// functions
function apiCalls () {
    let customersFetch = fetch('http://localhost:3001/api/v1/customers').then((response) => response.json()).then((data) => customers=data)
    let roomsFetch = fetch('http://localhost:3001/api/v1/rooms').then((response) => response.json()).then((data) => rooms=data)
    let bookingsFetch = fetch('http://localhost:3001/api/v1/bookings').then((response) => response.json()).then((data) => bookings=data)

    return Promise.all([customersFetch,roomsFetch,bookingsFetch]).then((data)=> {
        customers = data[0]
        rooms = data[1]
        bookings = data[2]
        loadHandler()
    })
}


function loadHandler() {
    console.log("customers",customers)
    console.log("rooms",rooms)
    console.log("bookings",bookings)
    currentCustomer = new Customer(customers.customers[0],bookings,rooms )
    console.log(currentCustomer)
    displayCustomerDashBoard()
}

function displayCustomerDashBoard () {
    customerTitle.innerText = '';
    console.log("current-cx",currentCustomer)
    customerTitle.innerText = `Welcome ${currentCustomer.name}`
    currentCustomer.fullBookingsData.forEach(item => {
        allCustomerBookings.innerHTML += `
        <section class="customer-booking-card">
            <title class="booking-card-date">${item.date}</title>
            <div class="booking-details-card">
                Room type -${item.roomtype} <br>
                Bed size -${item.bedSize} <br>
                Number of beds - ${item.numBeds}
                Cost/night - ${item.costPerNight} <br>
                Bidet - ${item.bidet}
            </div>
        </section>
        ` 
    })
}

function displayNewBookingView () {
    showElement(newBookingView)
    hideElement(customerView)
}

function hideElement (element) {
    element.classList.add("hidden")
}

function showElement (element) {
    element.classList.remove("hidden")
}

function postNewBooking() {
    let postTemplate = {
        "userID": Number(newBookingUserIdInput.value),
        "date": newBookingDateInput.value,
        "roomNumber": Number(newBookingRoomNumberInput.value)
    }
    fetch('http://localhost:3001/api/v1/bookings', {
        method: "POST",
        body: JSON.stringify(postTemplate),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("Post Response", response)
            return response.json()
        }
        throw new Error (response.status)
    })
    .then(data => console.log("POST DATA",data))
    .catch(error => console.log("ERROR", error))

}
/// event listeners
window.addEventListener("load", apiCalls())

newBookingViewButton.addEventListener("click", function(event){
    event.preventDefault();
    displayNewBookingView();
})

newBookingSubmitButton.addEventListener("click", function (event) {
    event.preventDefault()
    postNewBooking()
})