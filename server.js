const express = require("express");
const helmet = require('helmet');
const path = require('path');



const app = express();

const dbconfig = require('./db')
const userRoute = require('./routes/usersRoute')
const placeRoute = require('./routes/placesRoute')
const reviewRoute = require('./routes/reviewsRoute')
const tripRoute = require('./routes/tripsRoute')

app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            'cross-origin-opener-policy': ['same-origin', 'allow-popups', 'strict-origin',],
            'cross-origin-embedder-policy': ['require-corp'],
        },
    })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json())

app.use('/api/users', userRoute)
app.use('/api/places', placeRoute)
app.use('/api/reviews', reviewRoute)
app.use('/api/trips', tripRoute)

const port = process.env.PORT || 5000;


if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'))
}

app.listen(port, () => console.log('Node Server Started using Nodemon!'));