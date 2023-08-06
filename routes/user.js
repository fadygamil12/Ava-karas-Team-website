const express = require('express');
const { Module } = require('module');
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
const session = require('express-session')
const bcrypt = require("bcryptjs");
const {User} = require('../models/users');
const {Fields} = require('../models/fields');
const { stringify } = require('querystring');
const path = require('path')

// ----------------------------IMPORTANT FUNCTIONS-------------------------------------
function InputString(input){
    input = input.toLowerCase();
    input = input.replace(/\s+/g, "");
    return input;
}
router = express.Router()
router.post("/login" , async(req,res) =>{
        const { email, pass } = req.body;
        let user = await User.findOne({email:InputString(email)}).populate('field');
        if(!user){
            res.render('../views/Signin.pug', {message: "اسم المستخدم خطأ"})
        }
        else if (!bcrypt.compareSync(pass, user.passwordhash)) {
            res.render('../views/Signin.pug', {message: "كلمة سر خاطئة"})
        }
        else {
            req.session.isAuth = true ;
            req.session.user = user;

            res.redirect('/')
    }
})
router.post("/signup" , async (req,res)=>{
    const {name, email, pwd, pwd2 ,phonenum,age, address, field} = req.body;
    console.log(req.body)
    const user = await User.findOne({email:email});
    if(user){
        res.render('../views/Signup.pug' , {message:'اختار اسم مستخدم اخر'})
    }
    else if((pwd != pwd2)){
        res.render('../views/Signup.pug' , {message:'تأكد ان كلمة السر متطابقة'})
    }
    else if(pwd.length <8){
        res.render('../views/Signup.pug' , {message:"اختار كلمة سر اكتر من 8 حروف"})
    }
    else{
        if(req.files){
        const file = req.files.photo
        const filePath = path.join(__dirname, '../public', 'images', `${file.name}`)
        const filepathTofront = `/images/${file.name}`
        console.log(filepathTofront)
        file.mv(filePath, (err) => {
            if (err){
                return res.status(500).send(err)
            } 
        })
        }
        else{
            filepathTofront =''
        }
        let fields = await Fields.findOne({name:field})
        console.log(fields)
        let user = new User({
            name: name,
            email: InputString(email),
            passwordhash: bcrypt.hashSync(pwd , 8),
            phonenum:phonenum,
            photo:filepathTofront,
            age:age,
            address: address,
            field: fields._id

        })
        user = await user.save();
        if(user){
            res.render('../views/Signin.pug' , {message: "تم التسجيل"})
        }
        else if(err){
            console.log(err)
        }
        }
})
router.get('/signup',(req,res) => {
    if (req.session.isAuth){
        res.redirect(`/profile/${req.session.user._id}`)
    }
    else{
        res.render('Signup.pug')
    }
    
})
router.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
module.exports=router;