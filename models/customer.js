const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://johann_gonzales:MichealSteve@clusterzero.herk2.mongodb.net/paella_management?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

const customerSchema = new mongoose.Schema(
    {

        name:               {type: String, required: true},
        contact_info:       {type: String, required: true},
        message_info:       {type: String, required: true},
        address:            {type: String, required: true},

    }
);

module.exports = mongoose.model('customers', customerSchema);