const express = require('express');
const main = require('./app/config/main');
const userRouter = require('./app/routes/user_routes');
const publicRouter = require('./app/routes/public_routes');
const organizationRouter = require('./app/routes/organization_routes');
const adminRouter = require('./app/routes/admin_routes');
const systemRouter = require('./app/routes/system_routes');
const availabilityRouter = require('./app/routes/availability_routes');
const app = express();
const port = 8000;

// console.log(main);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/',(req,res)=>{
  console.log(req.body);
  res.send("Welcome");
});

// user related requests
app.use('/user', userRouter);

// public specified requests
app.use('/public', publicRouter);

// organizations specified requests
app.use('/org', organizationRouter);

// admin specified requests
app.use('/admin', adminRouter);

// system specified requests
app.use('/system', systemRouter);

// availability specified requests
app.use('/availability', availabilityRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});