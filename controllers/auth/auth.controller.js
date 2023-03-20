import { User } from "../../models/user.model.js"
import {genPassword} from "../../lib/function.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


class AuthController {
        register = async (req,res, next)=> {
            try{
                const {name,email,phone,address,password,confirm_password} = req.body
                if (password == confirm_password){
                    const hash = await genPassword(password)
                    console.log(hash)
                    await User.create({name, email, phone, address, password:hash})

                    res.status(201).json({
                        success:'You have been register.Please login to continue'
                })
                }else{
                    next({
                        message: 'Password not confirmed',
                        status: 422
                    })
                
                }

                

            }catch(e){
                console.error(e)
                next({
                    message:"Problem while processing request",
                    status: 400
                })
            }
        }
        login = async (req, res, next)=> {
            try{
                const {email,password} = req.body
                const user = await User.findOne({email}).exec()
                if (user !=null){
                   if(await bcrypt.compare(password, user.password)){
                    const token = jwt.sign({id:user, iat:Math.floor(Date.now()/
                    1000)+ (30*24*60*60)},process.env.JWT_SECRECT)
                    res.json({token,user})

                    }
                }
            }catch (e){
                console.error(e)
                next({
                    message: 'Problem while processing request',
                    status: 400
                })
            }
        }
    }

export default new AuthController