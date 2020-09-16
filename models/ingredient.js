const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://johann_gonzales:MichealSteve@clusterzero.herk2.mongodb.net/paella_management?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

const orderSchema = new mongoose.Schema(
    {

        name:               {type: String, required: true},
        contact_info:       {type: Number, required: true},
        mode_of_delivery:   {type: Decimal128, required: true}

    }
);

module.exports = mongoose.model('ingredients', orderSchema);