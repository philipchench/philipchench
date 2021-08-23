const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/shoppingList', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err))

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
    name: String,
    items: [{title: String, content: String}]
});

const Users = mongoose.model("users", userSchema);

async function createUser(req, res){
    console.log(req.body, "reqbody");
    const user = await Users
        .findOne({name: req.body.username});
    if(!user){
        const user = new Users({
            name: req.body.username,
            items: [{title: "Sample Item", content: "This is a sample item."}]
        });
        const result = await user.save();
        console.log(result);
        res.json(user);
        return;
    }
    res.send(null);
    return;
}

async function getUser(req, res, userId){
    const user = await Users
        .findOne({name: userId});
    if(!user){
        return res.status(404).send("user does not exist");
    }
    res.json(user)
}

// async function getItem(req, res, userId, itemId){
//     const user = await Users
//         .findOne({name: userId});
//     if(!user){
//         return res.status(404).send("user does not exist");
//     }
//     item = user.items.id(itemId);
//     if(!item){
//         return res.status(404).send("item does not exist");
//     }
//     res.json(item)
// }

async function addItem(req, res, userId, body){
    const user = await Users
        .findOne({name: userId});
    if(!user){
        return res.status(404).send("user does not exist");
    }
    user.items.push(body);

    user.save(function (err) {
    if (err) return handleError(err)
    console.log('Success!');
    });
    res.json(user)
}

async function deleteItem(req, res, userId, itemId){
    const user = await Users
        .findOne({name: userId});
    if(!user){
        return res.status(404).send("user does not exist");
    }
    user.items.id(itemId).remove();
    user.save(function (err) {
    if (err) return handleError(err);
    console.log('the subdocs were removed');
    });
    res.json(user);
}

app.get('/api/:userId', (req, res) => {
    getUser(req, res, req.params.userId)
});

app.post('/api/users', (req, res) => {
    createUser(req, res);
});

app.post('/api/:userId/posting', (req, res) => {
    addItem(req, res, req.params.userId, req.body)
});

app.delete('/api/:userId/:itemId', (req, res) => {
    deleteItem(req, res, req.params.userId, req.params.itemId)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
