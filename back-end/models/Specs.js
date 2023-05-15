import mongoose from "mongoose";
const Schema = mongoose.Schema;

const specsSchema = new Schema({
    os: {
        type: String,
        required: true 
    },
    cpu: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    screen: {
        type: String,
        required: true
    },
    battery: {
        type: String,
        required: true
    },
    model: {
        type: mongoose.Schema.ObjectId,
        ref: 'Models'
    }
},
{ versionKey: false} );

specsSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const Specs = mongoose.model('Specs', specsSchema);
export default Specs;