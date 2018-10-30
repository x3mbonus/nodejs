import { Lector } from '../models'

// GET /api/lectors/:id
async function get(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot get lector. Id is missing`});
        return;
    }
    try {
        let lector = await Lector.findById(id);
        if (!lector)
        {
            res.status(404).json({Error: `Cannot find lector with id ${id}`});
            return;
        }
        res.status(200).json(lector);
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
};

// GET  /api/lectors/all
async function all(req, res) {
    try {
        let lectors = await Lector.find({});
        res.status(200).json(lectors);
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
}


// POST /api/lectors/create
async function create(req, res) {
    let lectorParam = req.body;
    if(!lectorParam){
        res.status(400).json({Error: "Cannot add lector. Data is missing"});
        return;
    }
    try {
        let lector = new Lector(lectorParam);

        let err = lector.validateSync();
        if (err) {
            res.status(409).json({Error: "Lector is not valid.", Message: err});
            return;
        }
        console.log(lector);

        let result = await lector.save();

        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "User was not created due to internal server error"});
    }
};

// DELETE /api/lectors/:id
async function remove(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot delete lector. Id is missing`});
        return;
    }
    
    try {
        let result = await Lector.findByIdAndDelete(id);
        res.status(200).json(result);
    }
    catch(ex){
        console.log(err);
        res.status(500).json({Error: "User was not deleted due to internal server error"});
    }
};

// POST /api/lectors/update/:id
async function update(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot update lector. Id is missing`});
        return;
    }

    let lector = req.body;
    if(!lector){
        res.status(400).json({Error: "Cannot update lector. Data is missing"});
        return;
    }

    try {
        
        let result = await Lector.findOneAndUpdate({_id: id}, lector);        

        res.status(200).json(result);
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "User was not updated due to internal server error"});
    }
};

export let lectors =
{
    get,
    all,
    create,
    update,
    remove
};