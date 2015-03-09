'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.post('/adminUser', function(req, res, next) {
    console.log('getting user');
    var userToAdmin = req.body.email;
    console.log(userToAdmin);
    mongoose.model('User').findOne({
        email: userToAdmin
    }, function(err, usr) {
        if (err) return next(err);
        //adminify!
        console.log(usr);
        if (usr !== null) {
            usr.isAdmin = true;
            console.log(usr);
            usr.save();
            res.send('adminified');
        }
    });
});

router.get('/allUsers', function(req, res, next) {
    mongoose.model('User').find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/getProds', function(req, res, next) {
    var prod = req.body.theProd;
    console.log(prod);
    mongoose.model(prod).find({}, function(err, prods) {
        if (err) return next(err);
        //adminify!
        if (prods !== null) {
            res.json(prods);
        }
    });
});

router.post('/chkUsr', function(req, res, next) {
    var userToAdmin = req.body.user;
    mongoose.model('User').findOne({
        email: userToAdmin
    }, function(err, usr) {
        if (err) return next(err);
        console.log(usr);
        if (usr !== null && usr.isAdmin) {
            res.send('yes');
        } else {
            res.send('no');
        }
    });
});

router.post('/remProd', function(req, res, next) {
    var prod = req.body.theProd;
    var col = req.body.theCat;
    mongoose.model(col).findOneAndRemove({
        title: prod
    }, function(err, prod) {
        if (err) return next(err);
        console.log('What? You don\'t like ' + prod + ' ?!');
        res.send(prod);
    });
});

router.post('/addProd', function(req, res, next) {
    var title = req.body.name;
    var col = req.body.type;
    mongoose.model(col).findOne({
        title: title
    }, function(err, prod) {
        if (err) return next(err);
        if (prod === null) {
            mongoose.model(col).create({
                'title': req.body.name,
                'description': req.body.desc,
                'price': req.body.price,
                'category': req.body.keys
            });
            res.send(title);
        } else {
            res.send('Err: That product already exists!');
        }
    });
});

router.post('/editProd', function(req, res, next) {
    var title = req.body.title;
    var col = req.body.type;
    mongoose.model(col).findOne({
        title: title
    }, function(err, prod) {
        if (err) return next(err);
        if (prod !== null) {
            res.json(prod);
        } else {
            res.send('Err: That product does not exist!');
        }
    });
});

router.post('/editSubmit', function(req, res, next) {
    var title = req.body.title,
        type = req.body.type;
    console.log('E: ', req.body.title);
    mongoose.model(type).findOne({
        title: title
    }, function(err, prod) {
        if (err) return next(err);
        prod.description = req.body.desc;
        prod.price = parseInt(req.body.price * 100);
        prod.category = req.body.keys;
        prod.photo = req.body.file;
        prod.save();
        res.json(prod);
    });
});

router.get('/proms', function(req, res, next) {
    mongoose.model('Promo').find({}, function(err, proms) {
        if (err) return next(err);
        res.send(proms);
    });
});

router.post('/addProm', function(req, res, next) {
    mongoose.model('Promo').create({
        'code': req.body.code,
        'creationDate': req.body.creationDate,
        'expireDate': req.body.expireDate,
        'promotionOn': req.body.promotionOn,
        'pricePerc': parseInt(req.body.pricePerc)
    });
})

router.post('/remProm', function(req, res, next) {
    var code = req.body.code;
    console.log('in rem requiescat ',code);
    mongoose.model('Promo').findOneAndRemove({
        code: code
    }, function(err, response) {
        res.send(response);
    })
})