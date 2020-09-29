const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://johann_gonzales:MichealSteve@clusterzero.herk2.mongodb.net/paella_management?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

const pansSchema = new mongoose.Schema(
    {
        name:           {type: String, required: true},
        availability:   {type: Boolean, required: true},
        order_id:       {type: mongoose.ObjectId, required: true}
    }
);

module.exports = mongoose.model('pans', pansSchema);