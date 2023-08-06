const express = require('express');
const { Module } = require('module');
const user = require('./user.js')
const profile = require('./profile.js')
const fieldadmin = require('./fieldadmin.js')
const leaderboard = require('./leaderboard.js')
const api = require('./api.js')
router = express.Router()

// Handle the main routes
router.get('/',(req,res) => {
    res.render('index.pug' ,{user:req.session.user})
})
router.get('/aboutus',(req,res) => {
    res.render('About Us.pug' ,{user:req.session.user})
})
router.get('/services',(req,res) => {
    res.render('Services.pug' ,  {user:req.session.user})
})
router.get('/joinus',(req,res) => {
    res.render('JoinUS.pug',  {user:req.session.user})
})
router.get('/signin',(req,res) => {
    if (req.session.isAuth){
        res.redirect(`/profile/${req.session.user._id}`)
    }
    else{
        res.render('Signin.pug')
    }
    
})
//handle user routes:
router.use('/field_admin', fieldadmin)
router.use('/leaderboard', leaderboard)
router.use('/user',user)
router.use('/profile',profile)
router.use('/api-v1',api)


module.exports=router;