'use strict';
app.factory('RandomGreetings', function () {

    var getRandomFromArray = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var greetings = [
        'I know that you just drank some coffee... have a mint...',
        'Ummm...... You need a mint...',
        'You know what would make this day better? Mint.',
        'You know what would make this day better? Coffee.',
        'Coffee. Mint. It\'s like peanut butter and jelly',
        'Seriously. Coffee with salmon salad? Take a mint.',
        'What\'s your problem with mints? You need one.',
        'Your breath stinks.'
    ];

    return {
        greetings: greetings,
        getRandomGreeting: function () {
            return getRandomFromArray(greetings);
        }
    };

});
