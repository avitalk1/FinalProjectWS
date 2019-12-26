var express = require('express');
const connection = require('./DB_connection/db_connection').connection;
const projectRouter = require('./Routes/projectRoutes/mainRoute').router;
const userRouter = require('./Routes/userRoutes/mainRoute').router;
const port = process.env.PORT || 8080
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.listen(port);


console.log(`listening on port: ${port}`);
