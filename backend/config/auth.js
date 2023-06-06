// const mongoose = require("mongoose")
// const User = require("../models/users")
// const service = require("../services")

// function signUp (req,res) {
//     const user = new User({
//         email: req.body.email,
//         name: req.body.name
//     })

//     user.save((err) => {
       
//      if(err) res.status(500).send({message:"error al crear usuario"})
//      return res.status(200).send({token: service.createToken(user)})
//     })
// }

//Los servicios son funciones que ayudar a realizar determinadas acciones que se repiten a lo largo del codigo

// function signIn(req,res) {

// }

// module.exports= {signUp, signIn}