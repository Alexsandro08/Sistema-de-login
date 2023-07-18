const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/user')
const User = mongoose.model('users')
const bcrypt = require('bcryptjs')
const Passport = require('passport')




router.get('/register', (req,res)=>{
    res.render('form/cadastro')
})

router.post('/register',(req,res)=>{
   
    let erros = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({texto:'Invalid name '})
    }
    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
        erros.push({texto:'Invalid password '})
    }

    if(req.body.name.length < 2){
        erros.push({texto:'Short name'})
    }
    if(req.body.password.length < 2){
        erros.push({texto:'Slug name'})
    }

    if(erros.length > 0){
        res.render('form/cadastro', {erros:erros})
    }
    else{
        User.findOne({email:req.body.email}).then((users)=>{
            if(users){
                req.flash('error', 'This account already exists')
                res.redirect('/register')
            } else{

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    telephone:req.body.telephone,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(newUser.password, salt, (erro, hash)=>{
                        if(erro){
                            req.flash('error', 'failed')
                            res.redirect('/')
                        }
                        
                        newUser.password = hash

                        newUser.save().then(()=>{
                            req.flash('success', 'Registration successfully registered!')
                            res.redirect('/')
                        }).catch(err =>{
                            req.flash('error', 'Failed to create user')
                            res.redirect('/register')
                        })
                    })
                })
            }
        }).catch(err =>{
            req.flash('error', 'failed')
            res.redirect('/register')
        })
    }
})





router.post('/login', (req,res,next)=>{
    Passport.authenticate('local',{
        successRedirect:'/home',
        failureRedirect:'/',
        failureFlash:true
    })(req,res,next)

})

router.get("/logout", (req,res,next)=>{
    req.logOut((err)=>{
        if(err){return next(err)}    
    req.flash('success', "logged out!")
    res.redirect('/')
    })
})












module.exports = router