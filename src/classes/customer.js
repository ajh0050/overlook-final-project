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

                return roomNumber.roomNumber === room.number
            })
            combinedInfo.push({...foundRoom,...roomNumber})
        })
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
        return this.fullBookingsData = modifiedCombinedInfo
    }

    totalAmountSpent() {
       return this.fullBookingsData.reduce((total,booking)=> {
            total += booking.costPerNight
            return total
       },0)
    }
}

export default Customer;