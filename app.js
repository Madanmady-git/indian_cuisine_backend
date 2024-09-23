const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./router/router');
const port = 3000;
app.use(cors());
app.use('/dishes', router);
app.listen(port, () => {
    console.log('Listening to port', port);
})