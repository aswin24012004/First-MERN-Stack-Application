const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db_url = process.env.DB;
const port = process.env.PORT;

mongoose.connect(db_url)
    .then(()=>console.log("✅ MongoDB Connected Successfully!.."))
    .catch((err) => console.log(`❌ MongoDB Connection Error: ${err.message}`));

// mongoose.connect(db_url)
//     .then(() => console.log("✅ MongoDB Connected Successfully!"))
//     .catch((err) => console.error(`❌ MongoDB Connection Error: ${err.message}`));


const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true }
});
const Animal = mongoose.model('Animal',animalSchema);



//create
app.post('/animals',async (req,res) => {
    try{
        const animal = new Animal(req.body);
        const savedAnimal = await animal.save();
        res.status(201).json(savedAnimal);
        res.json("Animal Added successfully");
    }catch(e){
        res.status(404).json({error: e.message});
    }
});


//read
app.get('/animals',async (req,res) =>{
    try{
        const animals = await Animal.find();
        res.json(animals);
    }catch(e){
        res.status(404).json({error: e.message});
    }
});

// get the particular id
app.get('/animals/:id',async (req,res) =>{
    try{
        const animal = await Animal.findById(req.params.id);
        if(!animal) return res.status(404).json({error: "Animal not Found"});
        res.json({message: "Animal updated successfully",data: animal});
    }catch(e){
        res.status(404).json({error: "e.message"});
    }
});

//update
app.put('/animals/:id',async (req,res) => {
    try{
        const updateAnimal = await Animal.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!updateAnimal) return res.status(404).json({error: "Animal not Found"});
        res.json({message: "Animal updated successfully",data: updateAnimal});
    }catch(e){
        res.status(404).json({error: "e.message"});
    }
});

//delete
app.delete('/animals/:id', async (req,res) =>{
    try{
        const deleteAnimal = await Animal.findByIdAndDelete(req.params.id);
        if(!deleteAnimal) return res.status(404).json({error: "Animal not Found"});
        res.json({message: "Animal Deleted successfully",data: deleteAnimal});
        
    }catch(e){
        res.status(404).json({error: "e.message"});
    }
});

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});



console.log("Tested.......");
