// index.js
const express = require('express');
const bodyParser = require('body-parser');

// const adminAuthRoutes = require('./routes/admin/auth');
// const adminBusRoutes = require('./routes/admin/buses');
// const userAuthRoutes = require('./routes/user/auth');
// const userBookingRoutes = require('./routes/user/booking');
const userAuthSignin = require('./routes/authUser/signin');
const userAuthSignup = require('./routes/authUser/signup');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// app.use('/admin/auth', adminAuthRoutes);
// app.use('/admin/buses', adminBusRoutes);
app.use('/user/auth/signin', userAuthSignin);
app.use('/user/auth/signup', userAuthSignup);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
