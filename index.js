// index.js
const express = require('express');
const bodyParser = require('body-parser');
const signinRouter = require('./routes/auth/signin.js');
const signupRouter = require('./routes/auth/signup.js');
const intialiseDB = require('./models/initialiseDB.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/auth/signin', signinRouter);
app.use('/api/auth/signup', signupRouter);
app.use('/buses', require('./routes/admin/Buses/add'));


app.listen(port, async () => {
  await intialiseDB();
  console.log(`Server is running at http://localhost:${port}`);
});
