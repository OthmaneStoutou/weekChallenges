const { getAllPosts, createPosts } = require("../Models/post");
const path = require("path") ;
const now = new Date();
const filename = path.join(__dirname, '../models/data.json');
let data = require('../models/data.json');


async function Create(req, res) {
    console.log("on create function")
    let numberElement = Object.keys(req.body).length;
    let objectKeys = Object.keys(data[0]).length-1;
    let idGenerate = data[data.length-1].id + 1;
    let curentDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
    try {
        console.log("in try statement")
        if (numberElement == objectKeys) {
            let newData = [...data, { id: idGenerate, ...req.body , date : curentDate }];
            let Data = JSON.stringify(newData) ;
            await createPosts(filename,Data);
            res.send({ "message": "post added successfully" });
        } else {
            res.status(400).send({ error: "You forgot one of the properties" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

async function Read(req, res) {
    try {
        let posts = await getAllPosts(filename);
        
        res.status(200).send({ data: posts });
    } catch (error) {
        res.status(500).send({ error: "Error in getting posts" });
    }
}

async function Update(req, res) {
    let id = req.params.id;
    try {
        let update = req.body;
        let newData = data.map(e => e.id == id ? { ...e, ...update } : e);
        console.log(newData)
        let Data = JSON.stringify(newData)
        await createPosts(filename,Data);
        res.send({ "message": "Update successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

async function Delete(req, res) {
    let id = req.params.id;
    newData = data.filter(e => e.id != id);
    try {
        await createPosts(filename , newData);
        res.send({ "message": "The post has been deleted!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

function findOneById(req, res) {
    try {
        let id = req.params.id;
        let post = data.find(e => e.id == id);
        if (post) {
            res.send({ "details": post });
        } else {
            res.status(404).send({ "message": "Post not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

module.exports = { Create, Read, Update, Delete, findOneById };
