const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index')
const PORT = 3000;
const app = express();


app.use(bodyParser.json());
app.use(app.router);
routes.initialize(app);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})