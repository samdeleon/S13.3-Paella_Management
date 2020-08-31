const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://johann_gonzales:MichealSteve@clusterzero.herk2.mongodb.net/paella_management?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

const orderSchema = new mongoose.Schema(
    {
        name:           {type: String, required: true},
        dateneeded:     {type: String, required: true},
        timeneeded:     {type: String, required: true},
        paellasize:     {type: String, required: true},
        extraremarks:   {type: String, required: false},
    }
);

module.exports = mongoose.model('orders', orderSchema);