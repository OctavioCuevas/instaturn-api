    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = process.env._PORT || 5000;
    require('./database/index.js');
    const User = require('./models/UserSchema');
    //const Ticket = require('./models/TicketSchema');

    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    /****** INSERT ******/
    
    app.post('/api/v1/user', (req, res) => {
        // Pedimos el articulo de req.body
        const user = req.body;
        // Creamos una instancia del articulo a partir del esquema
        const newUser = new User(user);

        // Guardamos en la BD y respondemos al usuario con respuesta de la BD
        newUser.save()
            .then( usuario => res.status(201).send({
                'mensaje': 'Usuario creado exitosamente',
                'usuario': user,
            }))
            .catch( err => res.status(400).send({
                'mensaje': 'Error al crear usuario',
                'error': err,
            }));    
    });


    app.listen(PORT,()=>{
        console.log(`Servidor corriendo en puerto ${PORT}`);  
    });
