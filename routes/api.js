// ---------------------------IMPORTS-------------------------------

const express = require('express');
const {User} = require('../models/users')
const {Fields} = require('../models/fields')
const {Serves} = require('../models/serves')
const bcrypt = require('bcryptjs')

// --------------------Starting router------------------------
router = express.Router()

// ------------------------Middlewares--------------------------
function isAuth(req,res,next){
    if(!req.session.isAuth){
        return res.status(200).send('not auth');
    }
    else{
        next();
    }
};
function isAdmin(req,res,next){
    if(!req.session.user.isAdmin){
        return res.status(200).send('not admin');
    }
    else{
        next();
    }
};
// ---------------------USER APIS------------------

//Get all users:
router.get('/users' , async (req,res)=>{
    res.send(await User.find().populate('field'))
})
//Get all users ranked by rate:
router.get('/users/leaderboard' , async (req,res)=>{
    res.send(await User.find().sort({rate:-1 }).populate('field'))
})


//Post new user:
router.post('/user' , async (req,res)=>{
    let user = await User.findOne({email: req.body.email});
    let field = await Fields.findOne({name:req.body.field});

    if(user){
        res.send(500 , "email already used")
    }
    else if(!field){
        res.send(500 , "wrong field")
    }
    else{

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordhash: bcrypt.hashSync(req.body.password,12),
            phonenum: req.body.phonenum,
            address: req.body.address,
            age: req.body.age,
            field: field._id,
            rate: req.body.rate,
            isAdmin: req.body.isAdmin
        })
        user = await user.save();
        if(user){
            res.send(200, 'user signed up')
        }
    }
})


//Get all users in specific field:
router.get('/users/:id' ,async (req,res)=>{
    res.send(await User.find({field: req.params.id}).populate('field').select('-passwordhash'))
})


//Get specific user:
router.get('/user/:id' , async (req,res)=>{
    let user = await User.findOne({_id: req.params.id}).populate('field').select('-passwordhash -_id -__v')
    res.send(user)
})

//Delete a user
router.get('/user/delete/:id' , async (req,res)=>{
    let user = await User.findOneAndRemove({_id: req.params.id})
    res.redirect('/profile')
})
// ---------------------------------Fields---------------------------------------
//Get all fields:
router.get('/fields', async (req,res)=>{
    let fields= await Fields.find().select('')
    res.send(fields)
})

// ---------------------------------Serves---------------------------------------
//Get all serves:
router.get('/serves', async (req,res)=>{
    res.send(await Serves.find().populate('participants'))
})
//Get serves that participant do:
router.get('/serves/:id', async (req,res)=>{
    res.send(await Serves.find({participants:req.params.id}))
})
//Post a serve
router.post('/serve',async (req,res)=>{
    let field = await Fields.findOne({name:req.body.field})
    let participants = []
    for(var i =0; i<req.body.participants.length; i++){
        let user = await User.findOne({email:req.body.participants[i]})
        participants.push(user._id)
    }
    let serve = new Serves({
        name: req.body.name,
        place: req.body.place,
        field: field._id,
        participants: participants

    })
    serve = await serve.save()
    if(serve){
        res.send('serve added')
    }
    else{
        res.send(err)
    }
})
module.exports=router;

