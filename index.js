    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = process.env.PORT || 5000;
    require('./database/index.js');
    const User = require('./models/UserSchema');
    const Ticket = require('./models/TicketSchema');
    const mongoose = require('mongoose');

    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    /****** INSERT USER ******/
    app.post('/api/v1/user', (req, res) => {
        // Pedimos el usuario de req.body
        const user = req.body;
        // Creamos una instancia del usuario a partir del esquema
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
    // READ ALL USERS
    app.get('/api/v1/user', (req, res) => {
        User.find()
            .then( users => res.status(200).send({
                'mensaje': 'Artículos encontrados exitosamente',
                'usuarios': users,
            }))
            .catch( err => res.status(400).send({
            'mensaje': 'Error al pedir la lista de usuarios',
            'error': err,
        }))
    });
    /****** READ ONE USER******/
    app.get('/api/v1/user/:id', (req, res) => {
        User.findById(req.params.id)
            .then( response => response !== null
                    ? res.status(200).send(
                        {'mensaje': 'Usuario encontrado', 'usuario': response})
                    : res.status(404).send({
                        'mensaje': 'No se encontró el usuario con el id proporcionado'})
            )
    });
     //UPDATE USER
     app.patch('/api/v1/user/:id', (req, res) => {
        /*
            Al actualizar mandamos tres argumentos: 
            1) id para hallar el usuario que queremos actualizar 
            2) el cuerpo de la petición donde vienen los campos que queremos actualizar 
            3) un objeto con opciones. Aqui pasamos la opcion "new: true" para que al 
                al actualizar, la respuesta nos develva el objeto ya actualizado y no 
                el objeto antes de ser actualizado.
        */
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then( user => res.status(200).send({
                'mensaje': 'Usuario encontrado exitosamente',
                'usuario': user,
            }))
            .catch( err => res.status(400).send({
            'mensaje': 'Error al pedir el usuario',
            'error': err,
        }));
    });
    /****** INSERT TICKET ******/
    app.post('/api/v1/ticket', (req, res) => {
        // Pedimos el ticket de req.body
        const ticket = req.body;
        // Creamos una instancia del ticket a partir del esquema
        const newTicket = new Ticket(ticket);
        // Guardamos en la BD y respondemos al ticket con respuesta de la BD
        newTicket.save()
            .then( ticket => res.status(201).send({
                'mensaje': 'Ticket creado exitosamente',
                'ticket': ticket,
            }))
            .catch( err => res.status(400).send({
                'mensaje': 'Error al crear ticket',
                'error': err,
            }));    
    });
    /****** READ REGULAR USER'S TICKETS******/
    app.get('/api/v1/ticket/:id_user/', (req, res) => {
        console.log(req.params.id_user);
        Ticket.find({"regular_user" : mongoose.Types.ObjectId(req.params.id_user), "active" : true})
            .then(tickets => res.status(200).send({
                'mensaje': 'Tickets encontrados exitosamente',
                'tickets': tickets,
            }))
            .catch( err => res.status(400).send({
            'mensaje': 'Error al pedir la lista de tickets',
            'error': err,
        }))
    });
    /****** READ REGULAR USER'S TICKETS******/
    app.get('/api/v1/ticket/b/:id_user/', (req, res) => {
        Ticket.find({"business_user" : mongoose.Types.ObjectId(req.params.id_user), "active" : true})
            .then(tickets => res.status(200).send({
                'mensaje': 'Tickets encontrados exitosamente',
                'tickets': tickets,
            }))
            .catch( err => res.status(400).send({
            'mensaje': 'Error al pedir la lista de tickets',
            'error': err,
        }))
    });
    app.get('/api/v1/ticket/b/next/:id_user/', (req, res) => {
        Ticket.findOne({"business_user" : mongoose.Types.ObjectId(req.params.id_user), "active" : true}).sort()
            .then(tickets => res.status(200).send({
                'mensaje': 'Tickets encontrados exitosamente',
                'tickets': tickets,
            }))
            .catch( err => res.status(400).send({
            'mensaje': 'Error al pedir la lista de tickets',
            'error': err,
        }))
    });
    //UPDATE TICKET
    app.patch('/api/v1/ticket/:id', (req, res) => {
        Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then( user => res.status(200).send({
                'mensaje': 'Ticket encontrado exitosamente',
                'ticket': user,
            }))
            .catch( err => res.status(400).send({
            'mensaje': 'Error al pedir el ticket',
            'error': err,
        }));
    });
    //SERVER START
    app.listen(PORT,()=>{
        console.log(`Servidor corriendo en puerto ${PORT}`);  
    });