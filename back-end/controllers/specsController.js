import Specs from '../models/Specs.js';

export const showAllSpecs = async (req, res) => {
    try {
        const documents = await Specs.find({}).populate("model");
        res.json(documents);
        
    } catch (error) {
        console.log(error);
    }
};

export const searchSpecByModel = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Specs.find({ name: new RegExp(query, 'i') })
            .populate({
                path: 'model',
                model: 'Models'
            })
        res.json(documents);

    } catch (error) {
        console.log(error);
    }
};

export const showSpecById = async (req, res) => {
    const document = await Specs.findById(req.params.idSpec);
    if (!document) {
        res.json({ message: 'This spec does not exist' });
    }
    res.json(document);
};

export const newSpecForModel = async (req, res) => {
    const document = new Specs(req.body);
    try {
    
        const doc = await document.save();
        res.json({ message: 'New spec added with id:' + ' ' + doc._id });
    
    } catch (error) {
        res.send(error);
    }
};

export const updateSpec = async (req, res) => {
    try {
        const filter = { _id: req.body.id };
        const update = req.body;
        const options = { new: true };
        const document = await Specs.findOneAndUpdate(filter, update, options);
        res.json({
            "message":"Spec updated successfully",
            ...document
        });

    } catch (error) {
        res.send(error);
    }
};

export const deleteSpec = async (req, res) => {
    try {
        await Specs.findByIdAndDelete({ _id: req.params.idSpec });
        res.json({ message: 'Spec deleted with id:' + ' ' + req.params.idSpec });
    
    } catch (error) {
        console.log(error);
    }
};