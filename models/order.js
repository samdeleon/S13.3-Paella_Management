const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://johann_gonzales:MichealSteve@clusterzero.herk2.mongodb.net/paella_management?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

const orderSchema = new mongoose.Schema(
    {
        ordernum:           {type: String, required: true},
        name:               {type: String, required: true},
        contact_info:       {type: String, required: true},
        mode_of_delivery:   {type: String, required: true},
        address:            {type: String, required: true},
        date:               {type: String, required: true},
        time:               {type: String, required: true},
        paellasize:         {type: String, required: true},
        status:             {type: String, required: true},
        extraremarks:       {type: String, required: false},
        pan_used:           {type: String, required: true},
        /*
        to add:

        ingredients         {type: Object, required: true}  --> for this one the values inside are: id (string), quantity (int), checked (int)
        message_info:       {type: String, required: true} 
        */
    }
);

module.exports = mongoose.model('orders', orderSchema);