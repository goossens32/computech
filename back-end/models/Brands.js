import mongoose from "mongoose";
const Schema = mongoose.Schema;

const brandsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'Sin descripción'
    }
},
{ versionKey: false });

brandsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {   delete ret._id  }  
});

const Brands = mongoose.model('Brands', brandsSchema);
export default Brands;