const mongoose = require('mongoose');
const Product = require('./Product');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    shipTo: {
        type: Object,
        required: true  
    },
    contact: {
        type: Object,
        required: true   
    },
    userId: {
        type: mongoose.ObjectId, ref: 'User',
        required: true  
    },
    totalPrice:{
        type : Number,
        required : true,
        default : 0
    },
    orderNum:{
        type : String
    },
    status : {
        type : String,
        default : "preparing"
    },
    items: [{
        productId: {
            type: mongoose.ObjectId, ref: Product, 
            required: true  
        },
        qty: {
            type: Number, 
            default : 1,
            required: true  
        },
        size: {
            type: String, 
            required: true  
        },
        price: {
            type: Number, 
            required: true  
        }
    }]
}, {timestamps: true});

orderSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updatedAt; 
    delete obj.createdAt; 
    return obj;
}

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
