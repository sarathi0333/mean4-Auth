const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true},
    password: {type: String, required: true},
});

userSchema.pre('save', function(next) {

    // if(this.isModified('password')) {
    //     return next();
    // }
    //generate salt value
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err);
        }
        //hashing
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            this.password = hash;
            next();
        })
    });
});

userSchema.methods.isPasswordMatch = function(plainPassword, hashed, cb) {
    bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
        if (err) {
            next(err);
        }
        cb(null, isMatch);
    })
}
const User = mongoose.model('User', userSchema);

module.exports = User;