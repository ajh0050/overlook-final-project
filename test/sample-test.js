import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/customer';

describe('customers class tests', function() {
let bookings = {"bookings":[{"id":"5fwrgu4i7k55hl8d0","userID":15,"date":"2022/01/20","roomNumber":19},{"id":"5fwrgu4i7k55hl8d1","userID":18,"date":"2022/01/21","roomNumber":5},{"id":"5fwrgu4i7k55hl8d3","userID":21,"date":"2022/02/01","roomNumber":6},{"id":"5fwrgu4i7k55hl8dc","userID":1,"date":"2022/01/08","roomNumber":17},{"id":"5fwrgu4i7k55hl8dd","userID":23,"date":"2022/02/10","roomNumber":20},{"id":"5fwrgu4i7k55hl8df","userID":47,"date":"2022/02/06","roomNumber":22},{"id":"5fwrgu4i7k55hl8dj","userID":14,"date":"2023/12/07","roomNumber":1},{"id":"5fwrgu4i7k55hl8dq","userID":36,"date":"2022/04/22","roomNumber":23},{"id":"5fwrgu4i7k55hl8dz","userID":36,"date":"2022/04/21","roomNumber":6},{"id":"5fwrgu4i7k55hl8ea","userID":1,"date":"2021/09/23","roomNumber":6},{"id":"5fwrgu4i7k55hl8eb","userID":2,"date":"2021/10/23","roomNumber":6},{"id":"5fwrgu4i7k55hl8ec","userID":35,"date":"2021/11/23","roomNumber":6},{"id":"5fwrgu4i7k55hl8ef","userID":30,"date":"2021/11/23","roomNumber":23}]}
let rooms = {"rooms": [{"number":17,"roomType":"junior suite","bidet":false,"bedSize":"twin","numBeds":2,"costPerNight":328.15},{"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02}]}
let customer = new Customer({id: 1, name: 'Leatha Ullrich'},bookings,rooms)


  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should have a method that returns a list of bookings that match this customer', function() {
    expect(customer.customerBookings()).to.deep.equal([{"id":"5fwrgu4i7k55hl8dc","userID":1,"date":"2022/01/08","roomNumber":17},{"id":"5fwrgu4i7k55hl8ea","userID":1,"date":"2021/09/23","roomNumber":6}]);
  });

  it('should have a method that returns total amount spent by customer', function() {
    expect(customer.fullBookingsData).to.deep.equal([6537843]);
  });

});
