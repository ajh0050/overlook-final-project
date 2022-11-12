// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

///query selectors

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
    currentCustomer = customers.customers[0]
    console.log(currentCustomer)
}

/// event listeners
window.addEventListener("load", apiCalls())
