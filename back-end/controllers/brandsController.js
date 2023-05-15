import Brands from '../models/Brands.js';

export const showAllBrands = async (req, res) => {
    try {
        const documents = await Brands.find({});
        res.json(documents);
        
    } catch (error) {
        console.log(error);
    }
};

export const showBrandById = async (req, res) => {
    const document = await Brands.findById(req.params.idBrand);
    if(!document) {
        res.json({message : 'Brand does not exists'});
    }
    res.json(document);
};

export const searchBrandsByName = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Brands.find({ name: new RegExp(query, 'i') });
        res.json(documents);

    } catch (error) {
        console.log(error);
    }
};

export const newBrand = async (req, res) => {
    const document = new Brands(req.body);
    try {
        const doc = await document.save();
        res.json({ 
            error:false,
            message : 'New brand added with id:'+ ' ' + doc._id 
        });

    } catch (error) {
        res.json({ 
            error:true,
            message : error
        });
    }
};

export const updateBrand = async (req, res) => {
    try {
        const filter = { _id : req.body.id };
        const update =  req.body;
        const options = {new : true};
        const document = await Brands.findOneAndUpdate(filter, update, options);
        res.json({
           "message":"Brand modified successfully",
           ...document
        });

    } catch (error) {
        res.send(error);
    }
};

export const deleteBrand = async (req, res) => {
    try {
        await Brands.findByIdAndDelete({ _id : req.params.idBrand });
        res.json({message : 'Brand deleted with id:' + ' ' + req.params.idBrand });
        
    } catch (error) {
        console.log(error);
    }
};
