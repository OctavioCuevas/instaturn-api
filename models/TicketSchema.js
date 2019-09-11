const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Schema.Types.ObjectId, ref: 'users'
    },
    business_user : {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    active : Boolean
});

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;
