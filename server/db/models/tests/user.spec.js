var mongoose = require('mongoose'),
    chai = require('chai'),
    expect = chai.expect;
mongoose.connect('mongodb://localhost/testingDB');

require('../user');
require('../product');
var User = mongoose.model('User');

describe('User model', function() {
    var userTest;
    before(function(done) {
        //users need to be unique
        var userNum = Math.floor(Math.random() * 999);
        var passIn = 'meep';
        userTest = new User({
            email: 'test' + userNum + '@test.com',
            password: passIn,
            google: {
                id: 'aGoogleId',
                email: 'email@google.com'
            }
        });
        userTest.save(done);
    });
    describe('correctPassword method', function() {
        it('returns true given a true password', function() {
            expect(userTest.correctPassword('meep')).to.equal(true);
        });
    });
    describe(' input ', function() {
        it('should have auto-generated salt', function(done) {
            expect(userTest).to.have.property('salt');
            done();
        });
        it(' has a password that is not stored on the backend as a raw (unencrypted) password',function(done){
            //expect(theSpanishInquisition).to.be(false);
            expect(userTest.password).to.not.equal('meep');
            expect(userTest.correctPassword('meep')).to.equal(true);
            done();
        })
    });

});

// describe('Product model', function() {
//     var prodTest;
//     before(function(done) {
//         //users need to be unique
//         var prodNum = Math.floor(Math.random()*999);
//         prodTest = new Product({
//             email: 'widget #'+userNum,
//             password: 'meep',
//             google: {
//                 id: 'aGoogleId',
//                 email: 'email@google.com'
//             }
//         });
//         userTest.save(done);
//     });
//     describe('correctPassword method', function() {
//         it('returns true given a true password', function() {
//             console.log(userTest.password);
//             expect(userTest.correctPassword('meep')).to.equal(true);
//         });
//     });
//     describe('generateSalt method', function() {
//         it('is a method', function() {
//             expect(generateSalt).to.be.a('function');
//         });
//     });

// });