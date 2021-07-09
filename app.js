const express = require('express');
const userRouter = require('./app/routes/user_routes');
const publicRouter = require('./app/routes/public_routes');
const organizationRouter = require('./app/routes/organization_routes');
const adminRouter = require('./app/routes/admin_routes');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/',(req,res)=>{
  res.send("Welcome");
});

// user related requests
app.use('/user', userRouter);

// public specified requests
app.use('/user/public', publicRouter);

// organizations specified requests
app.use('/user/org', organizationRouter);

// admin specified requests
app.use('/user/admin', adminRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});