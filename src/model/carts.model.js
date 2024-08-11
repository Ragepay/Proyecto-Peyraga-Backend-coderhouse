import mongoose from "mongoose";

//  Esquema del documento/JSON/BSON de la BBDD.
const cartsSchema = new mongoose.Schema({
    products: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products'},
        quantity: { type: Number }
    }]
});

//           collection/invocacion         (Collection, Esquema)
export const CartsModel = mongoose.model('carts', cartsSchema);
