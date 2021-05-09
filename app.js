const express = require('express');
const app = express();
const PORT = 3000;




app.use('/', require('./Router/indexRoute'));




app.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}`);
});

 
