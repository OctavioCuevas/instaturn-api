const mongoose = require('mongoose');
const db_uri = 'mongodb+srv://the_user:Chocolate1010@instaturn-21tvv.mongodb.net/instaturn_db?retryWrites=true&w=majority';

mongoose.connect(db_uri,
    { useNewUrlParser: true },
    () => console.log('Conexión a Mongo Atlas existosa'));
