module.exports = {
    // "DATABASE_URI": process.env.MONGOLAB_URI,
    // "SESSION_SECRET": process.env.SESSION_SECRET,
    // "TWITTER": {
    //     "consumerKey": process.env.TWITTER_CONSUMER_KEY,
    //     "consumerSecret": process.env.TWITTER_CONSUMER_SECRET,
    //     "callbackUrl": process.env.TWITTER_CALLBACK
    // },
    // "FACEBOOK": {
    //     "clientID": process.env.FACEBOOK_APP_ID,
    //     "clientSecret": process.env.FACEBOOK_CLIENT_SECRET,
    //     "callbackURL": process.env.FACEBOOK_CALLBACK_URL
    // },
    // "GOOGLE": {
    //     "clientID": process.env.GOOGLE_CLIENT_ID,
    //     "clientSecret": process.env.GOOGLE_CLIENT_SECRET,
    //     "callbackURL": process.env.CALLBACK_URL
    // }
    "DATABASE_URI": "mongodb://heroku_app34612086:eotpkuschu3ftm137op9oq688q@ds051851.mongolab.com:51851/heroku_app34612086",
    "SESSION_SECRET": "Optimus Prime is my real dad",
    "TWITTER": {
        "consumerKey": "ZVQ2NZscYX1aa6nZI81Fg8HBg",
        "consumerSecret": "FkNrAsPhXVwr1qKgV5fSMGtuTsQNoWqybHlkKFf4g6FG1n4J1V",
        "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
    },
    "FACEBOOK": {
        "clientID": "375592052644640",
        "clientSecret": "ff9ca279a390ece0b2b5a24bbedc7b97",
        "callbackURL": "http://localhost:1337/auth/facebook/callback"
    },
    "GOOGLE": {
        "clientID": "369003002521-88250fc9kjpkfqvhicu7vokbnvu88ud6.apps.googleusercontent.com",
        "clientSecret": "DB1-q81E4ODEuL8cFGCm5QS1",
        "callbackURL": "http://localhost:1337/auth/google/callback"
    }
};
