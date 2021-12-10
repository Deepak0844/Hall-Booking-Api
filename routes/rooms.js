import express from "express";
const router = express.Router();

const rooms = [];
let roomNo = 1;
let id = 100000;
let bookingId = 5000;
let bookingIdString = "xyz";
const bookings = [];

router.route("/").get((request, respond) => {
  respond.json("Hall Booking API");
});

router.route("/all-rooms").get((request, respond) => {
  respond.json(rooms);
});

router.route("/all-customers").get((request, respond) => {
  respond.json(bookings);
});

router.route("/create-room").post((request, respond) => {
  let room = {};
  room.id = id;
  room.roomNo = bookingIdString + "-" + roomNo;
  room.bookings = [];
  const { noseats, amenities, price } = request.body;
  //check whether noseats is given
  if (noseats) {
    room.noseats = noseats;
  } else {
    respond.status(400).send({ message: "please specify no of seats" });
    return;
  }
  //check whether amenities is given
  if (amenities) {
    room.amenities = amenities;
  } else {
    respond.status(400).send({ message: "please specify amenities" });
    return;
  }
  //check whether price is given
  if (price) {
    room.price = price;
  } else {
    respond.status(400).send({ message: "please specify price for 1 hour" });
    return;
  }

  id++; // for every booking add id + 1
  roomNo++; // for every booking add roomNo + 1

  rooms.push(room);
  respond.send({ message: "room created successfully" });
});

//

router.route("/booking").post((request, respond) => {
  let booking = {};
  booking.id = bookingId;

  const { customername, starttime, endtime, date } = request.body;
  //check whether customername is given
  if (customername) {
    bookings.customername = customername;
  } else {
    respond.status(400).send({ message: "please specify customername" });
    return;
  }
  //check whether date is given
  if (date) {
    bookings.date = date;
  } else {
    respond.status(400).send({ message: "please specify date" });
    return;
  }
  //check whether starttime is given
  if (starttime) {
    bookings.starttime = starttime;
  } else {
    respond.status(400).send({ message: "please specify starttime" });
    return;
  }
  //check whether endtime is given
  if (endtime) {
    bookings.endtime = endtime;
  } else {
    respond.status(400).send({ message: "please specify endstart" });
    return;
  }
  //if room lenght is zero shows no room available
  const availableRooms = rooms.filter((room) => {
    if (room.bookings.length == 0) {
      return true;
    }
  });
  if (availableRooms.length == 0) {
    respond.status(400).json({ output: "No Rooms Available" });
  } else {
    let roomRec = availableRooms[0];
    let count = 0;

    //should not allow booking an already booked room on same date and time
    if (
      bookings.find(
        (rm) => parseInt(rm.endtime) > parseInt(starttime) && rm.date === date
      )
    ) {
      return respond
        .status(400)
        .json({ output: "No Rooms Available On Selected Date and Time" });
    }
    //allow booking a room in different time or data
    else {
      rooms.forEach((element) => {
        if (element.roomNo === roomRec.roomNo) {
          rooms[count].bookings.push({
            customername: customername,
            starttime: starttime,
            endtime: endtime,
            date: date,
          });
        }
        count++;
      });
    }

    let bookingRec = request.body;
    bookingRec.roomNo = roomRec.roomNo;
    bookings.push(bookingRec);

    respond.status(200).json({ output: "Room Booking Successfully" });
  }
});

export const roomsRouter = router;
