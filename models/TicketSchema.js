const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    folio : Number,
    date : {
        type: Date,
        required: true
    },
    creation_date: {
        type: Date,
        default: new Date()
    },
    regular_user : {
        type: String,
        required: true
    },
    business_user : {
        type: String,
        required: true
    },
    active : Boolean
});

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;
