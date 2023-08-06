//--------------------------------IMPORTS---------------------------
const { model } = require('mongoose')
const {User} = require('../models/users.js')
const {Serves} = require('../models/serves.js')
const express = require('express')
const path = require('path')
const fs = require('fs')

//-----------------------Start router---------------------
router = express.Router()


router.get('/', (req,res)=>{
    if(!req.session.user){
        res.redirect('/signin');
    }
    else{
        res.redirect(`/profile/${req.session.user._id}`)
    }
})
router.get('/:id' ,async (req,res)=>{
    
    if(!req.session.user){
        res.redirect('/signin');
    }
    else if(req.session.user._id != req.params.id){
        res.redirect(`/profile/${req.session.user._id}`)
    }
    else if (!req.session.user.isAdmin){
        let serves = await Serves.find({participants:req.session.user._id}).sort({Date:-1 })
        console.log(serves)
        res.render('Profile_normal', {user: req.session.user ,pruser: req.session.user , serves:serves})
    }
    else if (req.session.user.isAdmin){
        let serves = await Serves.find({participants:req.session.user._id}).sort({Date:-1 })
        res.render('Profile_admin', {user: req.session.user , pruser: req.session.user , serves:serves})
    }
})
// ---------------------------PREVIEW OF PROFILE---------------------------------
router.get('/preview/:id/' ,async (req,res)=>{
    if (!req.session.user){
        res.redirect('/signin')
    }
    else if (!req.session.user.isAdmin){
        res.redirect(`/profile/${req.session.user._id}`)
    }
    else if (req.session.user.isAdmin){
        let user = await User.findOne({_id:req.params.id}).populate('field')
        let serves = await Serves.find({participants:req.session.user._id}).sort({Date:-1 })
        res.render('Profile_normal', {user: req.session.user, pruser:user ,serves:serves })
    }
})



// ----------------------------------EDIT PROFILE--------------------------------------
router.get('/edit/:id' , async(req,res)=>{
    if(!req.session.user){
        res.redirect(`/signin`)
    }
    else if(req.session.user._id != req.params.id){
        res.redirect(`/profile/preview/${req.params.id}` ,500)
    }
    else{
        res.render('Profile_edit' , {user:req.session.user , pruser:req.session.user })
    }
})
router.post('/edit/:id' , async(req,res)=>{
    if(!req.session.user){
        res.redirect(`/signin`)
    }
    else if(req.session.user._id != req.params.id){
        res.redirect(`/profile/preview/${req.params.id}` )
    }
    else{
        let user = await User.findOneAndUpdate({_id:req.params.id}, req.body, {
            new: true
        })
        if (req.files){
            var filePath = path.join(__dirname ,'public')+ user.photo

            if (fs.existsSync(filePath)) {
            // The file exists, so you can proceed with deleting it
            try {
            fs.unlinkSync(filePath)
            console.log('File deleted successfully')
            } catch (err) {
            console.error(err)
            }
            } else {
            console.log('File not found')
            }           
        
            const file = req.files.photo
            filePath = path.join(__dirname, '../public', 'images', `${file.name}`)
            const filepathTofront = `/images/${file.name}`
            console.log(filepathTofront)
            file.mv(filePath, err => {
            if (err) return res.status(500).send(err)
            })
            user = await User.findOneAndUpdate({_id:req.params.id}, {photo:filepathTofront}, {
                new: true
            })
        }
        
            user = await  User.findOne({_id:req.params.id}).populate('field')
            req.session.user = user;
            res.redirect('/profile')
    
    }
})
module.exports=router;
    