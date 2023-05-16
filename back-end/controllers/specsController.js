import Specs from '../models/Specs.js';

export const showAllSpecs = async (req, res) => {
    try {
        const documents = await Specs.find({});
        res.json(documents);
        
    } catch (error) {
        console.log(error);
    }
};