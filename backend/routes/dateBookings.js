var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    //sql query for the data
    sql = "select dStart.airport as startAirport, dStart.code as startCode, dEnd.airport as endAirport, dEnd.code as endCode\
    from routes\
    join destinations as dStart on dStart.code = routes.start\
    join destinations as dEnd on dEnd.code = routes.end\
    \
    "
    sqlDeets = []
    if ((req.body.startLoc!="%" || req.body.endloc!="%" ) ){
        sql = sql + " where "
        if(req.body.endloc!="%"){
            sql = sql + " dEnd.code like ?"
            sqlDeets.push(req.body.endloc)
        } else   if(req.body.startLoc!="%"){
            sql = sql + " dStart.code like ?"
            sqlDeets.push(req.body.startLoc)
            if(req.body.endloc!="%"){
                sql = sql + " and dEnd.code like ?"
                sqlDeets.push(req.body.endloc)
            }
        }  
    }
    console.log("StartLoc: ", req.body.startLoc!="%")
    con.query(sql,sqlDeets, function (err, result) {
          if (err) throw err;
          res.send(result)
      });
    
  });
  router.post('/getAvailableFlights', function(req, res, next) {
    //sql query for the data\
    var sql = "Select startD.airport as 'start', endD.airport as 'end', times.time, aircraft.capacity as 'capacity', COUNT(booking.user_id) as 'used',routes.cost as cost,\
    times.flight_ID as flight_id \
    FROM routes \
    join destinations as startD on startD.code = routes.start\
    join destinations as endD on endD.code = routes.end\
    join times on times.route_id = routes.routeID\
    left outer join  booking on booking.flight_id = times.flight_ID\
    left outer join (select * from booking where booking.user_id = ?) as bookedByUser on bookedByUser.flight_id = times.flight_ID\
    join aircraft on aircraft.craftID = routes.plane_id\
    where times.time BETWEEN  ?  and DATE_ADD(?,INTERVAL 4 WEEK)\
    AND startD.code like ?\
    and endD.code like ?\
    AND times.time > CURRENT_TIMESTAMP()\
    group by times.flight_ID\
    having (COUNT(booking.user_id)  < capacity) AND (COUNT(bookedByUser.user_id) <= 0)"
    sqlDeets = [
        req.body.user_id,
        req.body.Date,
        req.body.Date,
        req.body.start,
        req.body.end
    ]
    
    con.query(sql,sqlDeets, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result)
      });
    
  });
  router.post('/getUpcomingFlights', function(req, res, next) {
    //sql query for the data\
    var sql = "Select startD.airport as 'start', \
    endD.airport as 'end', \
     times.time, \
     times.flight_ID as flight_id, \
     booking.booking_ref as booking_id,\
     routes.cost as cost\
     FROM routes \
     join destinations as startD on startD.code = routes.start\
     join destinations as endD on endD.code = routes.end\
     join times on times.route_id = routes.routeID\
     join  booking on booking.flight_id = times.flight_ID\
     where booking.user_id = ? AND times.time > CURRENT_TIMESTAMP()"
    sqlDeets = [
        req.body.user_id
    ]
    
    con.query(sql,sqlDeets, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result)
      });
    
  });
  router.post('/getHistoricFlights', function(req, res, next) {
    //sql query for the data\
    var sql = "Select startD.airport as 'start', \
    endD.airport as 'end', \
     times.time, times.flight_ID as flight_id, \
     booking.booking_ref as booking_id,\
     routes.cost as cost\
     FROM routes \
     join destinations as startD on startD.code = routes.start\
     join destinations as endD on endD.code = routes.end\
     join times on times.route_id = routes.routeID\
     join  booking on booking.flight_id = times.flight_ID\
     where booking.user_id = ? AND times.time <= CURRENT_TIMESTAMP()"
    sqlDeets = [
        req.body.user_id
    ]
    
    con.query(sql,sqlDeets, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result)
      });
    
  });
  router.post('/insertBooking', function(req, res, next) {
    //sql query for the data\
    var sql = "INSERT INTO `booking` (`user_id`, `flight_id`, `booking_ref`) VALUES (?, ?, NULL)"
    sqlDeets = [
        req.body.user_id,
        req.body.flight_id
    ]
    
    con.query(sql,sqlDeets, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.sendStatus(200)
      });
    
  });
  router.post('/removeBooking', function(req, res, next) {
    //sql query for the data\
    var sql = "DELETE FROM `booking` WHERE `booking`.`booking_ref` = ?;"
    sqlDeets = [
        req.body.booking_id
    ]
    
    con.query(sql,sqlDeets, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.sendStatus(200)
      });
    
  });

  


module.exports = router;
