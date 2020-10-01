const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://johann_gonzales:MichealSteve@clusterzero.herk2.mongodb.net/paella_management?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

const ingredientsSchema = new mongoose.Schema(
    {

        name:           {type: String, required: true},
        quantity:       {type: Number, required: true}

    }
);

module.exports = mongoose.model('ingredients', ingredientsSchema);