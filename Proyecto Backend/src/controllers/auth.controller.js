import { createError } from "../utils/error.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//npm bcrypt para una contraseña encriptada
import bcrypt from "bcryptjs";

export const register = async ( req, res, next) =>{
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).send("Usuario ha sido creado")

    } catch (err) {
        next(err)
    }
} 

export const login = async ( req, res, next) =>{
    try {

        const user =  await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User no found!")) //next(createError(404, "user no found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(404, "Wrong password or username!"));

        //verificar, revisar nuestra infroramcion de usuario y si es admin vamos a permitir eliminar el hotel
        const token = jwt.sign({ id:user._id, isAdmin: user.isAdmin}, process.env.JWT) // terminal --> openssl rand -base64 32

        const { password, isAdmin, ...otherDetails} = user._doc //jwt ocultar nuestra información

        res
        .cookie("acces_token", token, {
            httpOnly:true, //no permite ningun cliente secreto para llegar a esta cookie por lo que es mucho mas seguro ahora mismo
        }).status(200).json({...otherDetails});

    } catch (err) {
        next(err)
    }
} 
