const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

// parses incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parses incoming json data
app.use(express.json());


app.use('/', htmlRoutes);

app.use('/api', apiRoutes);

app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}`);
});