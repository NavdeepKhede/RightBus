// index.js
const express = require('express');
const bodyParser = require('body-parser');
const signinRouter = require('./routes/auth/signin.js');
const signupRouter = require('./routes/auth/signup.js');
const intialiseDB = require('./models/initialiseDB.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// User/Admin Auth
app.use('/api/auth/signin', signinRouter);
app.use('/api/auth/signup', signupRouter);
app.use('/api/auth/user', require('./routes/user/getUser.js'));
// Extracting data
app.use('/buses/add', require('./routes/admin/Buses/add'));
app.use('/getallbuses', require('./routes/admin/Buses/getallbuses'));
app.use('/buses/delete', require('./routes/admin/Buses/delete'));
app.use('/getbus', require('./routes/admin/Buses/getbus'));
app.use('/buses/update', require('./routes/admin/Buses/update'));

// Booking 
app.use('/book', require('./routes/booking/bookbus.js'));
app.use('/availability', require('./routes/booking/availability.js'));
app.use('/booking_details', require('./routes/booking/details.js'));

app.listen(port, async () => {
  // await intialiseDB();
  console.log(`Server is running at http://localhost:${port}`);
});
