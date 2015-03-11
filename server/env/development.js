module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/my-app",
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
// https://tranquil-ocean-8233.herokuapp.com/oauth2callback
