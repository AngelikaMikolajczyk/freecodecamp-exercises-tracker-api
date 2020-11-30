const User = require('./user-model');

function createUser(newUsername, done) {
    const userDocument = new User({username: newUsername});

    userDocument.save(function(err, savedUser){
        if(err) return done(err);
        done(null, savedUser);
    })
}

module.exports = {createUser};