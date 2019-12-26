const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_type: {
        type: String,
        required: true,
        enum: ['Student', 'Lecturer']
    }
});


const FinalProjectSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    students:{ 
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        unique: true,
        autopopulate: true,
        validate:{
            validator: function(v){
                return v.length < 5;
            },
            message: 'Maximum 4 Students in a project'
        }
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    }

});
FinalProjectSchema.plugin(require('mongoose-autopopulate'));

const User = mongoose.model('User', UserSchema);
const FinalProject = mongoose.model('FinalProject', FinalProjectSchema);


module.exports = {
    User,
    FinalProject
}