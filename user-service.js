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

function findAllUsers(done){
    let allUsers = User.find({});
    allUsers.select('_id username').exec((err, users) => {
        if(err) return done(err);
        done(null, users);
    })
}

function findUserAndAddExercise(userId, exerciseDuration, exerciseDescription, exerciseDate, done){
    User.findByIdAndUpdate({_id: userId}, {$push: {log: [{date: exerciseDate, duration: exerciseDuration, description: exerciseDescription}]}}, {new: true}, function(err, addedExercise){
        if(err) return done(err);
        done(null, addedExercise);
    })
}

module.exports = {createUser, findByUsername, findAllUsers, findUserAndAddExercise};