const express = require("express");
const cors = require("cors");

const authRoute = require("./Routes/auth")
const contentRoute = require("./Routes/contentRoute")
const app = express();

app.use(express.json());

app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

app.use('/auth', authRoute);
app.use('/content', contentRoute);

const port = process.env.PORT || 3012
app.listen (port, () => {
    console.log(`Server is running on port ${port}`)
})