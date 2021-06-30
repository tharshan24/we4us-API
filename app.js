const express = require('express')
const userRouter = require('./app/routes/user_routes');
const app = express()
const port = 3000

app.use('/user', userRouter);

app.get('/',(req,res)=>{
    res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})