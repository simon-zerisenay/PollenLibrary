const express = require("express");
const cors = require("cors");

const authRoute = require("./Routes/auth")



const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

app.use('/', authRoute);

const port = process.env.PORT || 3008
app.listen (port, () => {
    console.log(`Server is running on port ${port}`)
})