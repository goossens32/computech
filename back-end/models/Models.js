import mongoose from "mongoose";
const Schema = mongoose.Schema;

const modelsSchema = new Schema ({
    name: {
        type: String,
        required: true,
        // Nombre de modelo tiene que ser unico
        unique: true
    },
    description: {
        type: String,
        default: 'Sin descripción'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    img: {
        type: String,
        required: true
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brands'
    },
    specs: {
        type: mongoose.Schema.ObjectId,
        ref: 'Specs'
    }
},
{ versionKey: false });

modelsSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const Models = mongoose.model('Models', modelsSchema);

export default Models;