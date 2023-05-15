import Models from '../models/Models.js';

export const showAllModels = async (req, res) => {
    try {
        const documents = await Models.find({}).populate("brand");
        res.json(documents);

    } catch (error) {
        console.log(error);
    }
};

export const searchModelsByName = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Models.find({ name: new RegExp(query, 'i') })
            .populate({
                path: 'brand',
                model: 'Brands'
            });
        res.json(documents);

    } catch (error) {
        console.log(error);
    }
};

export const searchModelsByBrand = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Models.find({ brand:ObjectId(req.params.idCategory)}).populate("brand");      
        res.json(documents);

    } catch (error) {
        console.log(error);
    }
};

export const searchModelByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.params;
        const documents = await Models.find({
            $and:
                [
                    { price: { $gte: minPrice } },
                    { price: { $lte: maxPrice } },
                ]
        }).populate("brand");
        res.json(documents);

    } catch (error) {
        console.log(error);
    }
};

export const showModelById = async (req, res) => {
    const document = await Models.findById(req.params.idModel);
    if (!document) {
        res.json({ message: 'This model does not exist' });
    }
    res.json(document);
};

export const newModel = async (req, res) => {
    const document = new Models(req.body);
    try {
    
        const doc = await document.save();
        res.json({ message: 'New model added with id:' + ' ' + doc._id });
    
    } catch (error) {
        res.send(error);
    }
};

export const updateModel = async (req, res) => {
    try {
        const filter = { _id: req.body.id };
        const update = req.body;
        const options = { new: true };
        const document = await Models.findOneAndUpdate(filter, update, options);
        res.json({
            "message":"Model updated successfully",
            ...document
        });

    } catch (error) {
        res.send(error);
    }
};

export const deleteModel = async (req, res) => {
    try {
        await Models.findByIdAndDelete({ _id: req.params.idModel });
        res.json({ message: 'Model deleted with id:' + ' ' + req.params.idModel });
    
    } catch (error) {
        console.log(error);
    }
};