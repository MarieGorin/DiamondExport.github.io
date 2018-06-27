const express = require('express');
const app = express();
app.use(express.static('client'));
app.listen(2179, () => console.log('Example app listening on port 2179!'));
