const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Schema = mongoose.Schema;
const cartSchema = Schema({
    UserId : {
        type : mongoose.ObjectId, ref:User
    },
    items : [{
        productId : {
            type : mongoose.ObjectId, ref:Product
        },
        size : {
            type : String,
            required : ture
        },
        qty : {
            type : Number,
            default : 1,
            required : ture

        }
    }]
}, {timestamps:true});

productSchema.methods.toJSON = function() {
    const obj = this._doc
    delete obj.password
    delete obj.__v
    delete obj.updateAt
    delete obj.createAt
    return obj
}

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;