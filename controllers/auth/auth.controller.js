import { User } from "../../models/user.model.js"
import {genPassword} from "../../lib/function.js"


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
        login = async (res, req, next)=> {}
    }

export default new AuthController