const User = require('./user-model');

function createUser(newUsername, done) {
    const userDocument = new User({username: newUsername});

    userDocument.save(function(err, savedUser){
        if(err) return done(err);
        done(null, savedUser);
    })
}

function findByUsername(findUsername, done){
    User.findOne({username: findUsername}, function(err, findUser){
        if(err) return done(err);
        done(null, findUser);
    })
}

module.exports = {createUser, findByUsername};