class Customer {
    constructor(customer,bookings,rooms) {
        this.id = customer.id
        this.name = customer.name
        this.allBookings = bookings.bookings
        this.rooms = rooms.rooms
        this.bookedRooms = this.customerBookings()
        this.fullBookingsData = this.combineBookingAndRoomData()
    }
    customerBookings() {
        let filteredBookings = this.allBookings.filter((element) => this.id === element.userID)
        return filteredBookings
    }

    combineBookingAndRoomData () {
        let combinedInfo = [];
        this.bookedRooms.forEach((roomNumber) => {
            let foundRoom = this.rooms.find(room => {
                console.log("roomNumber",roomNumber)
                console.log("room", room)
                return roomNumber.roomNumber === room.number
            })
            console.log("Foundroom",foundRoom)
            combinedInfo.push({...foundRoom,...roomNumber})
        })
        console.log("combinedInfo",combinedInfo)
        let modifiedCombinedInfo = combinedInfo.reduce((clean,item) => {
            clean.push({bedSize: item.bedSize,
                        bidet:item.bidet,
                        costPerNight:item.costPerNight,
                        date:item.date,
                        id:item.id,
                        numBeds:item.numBeds,
                        roomNumber:item.roomNumber,
                        roomType:item.roomType,
                        userID:item.userID
                        })
            return clean
        },[])
        console.log("modifiedCombinedInfo", modifiedCombinedInfo)
        return this.fullBookingsData = modifiedCombinedInfo
    }

    totalAmountSpent() {
       let bookedRoomsNumbers = this.bookedRooms.reduce((roomNumbers, bookings) => {
            roomNumbers.push(bookings.roomNumber)
            return roomNumbers
        },[])

        let total = bookedRoomsNumbers.reduce((total,booking) => {
            total += booking.costPerNight
            return total
        },0)
    }
}

export default Customer;