
const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://johann_gonzales:MichealSteve@clusterzero.herk2.mongodb.net/paella_management?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema(
    {

        username:       {type: String, required: true},
        password:       {type: String, required: true},
    }
);

module.exports =/*user=*/ mongoose.model('user', userSchema);