const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
