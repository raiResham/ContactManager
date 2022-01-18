const db = require('../config/dbConnection')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        try{
            db.query(
                'select id, email , password from user where email = ? ',[email],
                async (err, users) => {
                    if(err) reject(err)
                    if(users.length){
                        const user = users[0]
                        let matched = await bcrypt.compare(password, user.password)
                        if(matched){
                            const accessToken = jwt.sign({id : user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: 86400 // 24 hours
                              });
                            const refreshToken = jwt.sign({ id : user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
                            // Add refresh token to db

                            resolve({"error": false,
                                        "id" : user.id,
                                        "accessToken": accessToken,
                                        "refreshToken":refreshToken})
                        }
                        resolve({"error":true, "message":"Password does not match."})
                    }
                    resolve({"error":true, "message":"Email does not exists."})
                }
            )
        }catch(err){
            reject(err)
        }
    })
}

const storeRefreshToken = (userId, refreshToken) =>{
    return new Promise((resolve,reject)=>{
        try{
            db.query("insert into refresh_token (user_id, refresh_token) values (?, ?) ", [userId, refreshToken],
                (err, rows)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(true)
                }
            )
        }catch(err){
            reject(err)
        }
    })  
}

const removeRefreshToken = (userId) =>{
    return new Promise((resolve,reject)=>{
        try{
            db.query("delete from refresh_token where user_id = ? ", [userId],
                (err, rows)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(true)
                }
            )
        }catch(err){
            reject(err)
        }
    })  
}

const signup = (email, password) =>{
    const SALT = parseInt(process.env.SALT)
    return new Promise((resolve,reject)=>{
        try{
            db.query("insert into user (email, password) values (?, ?)", [email, bcrypt.hashSync(password, SALT)],
                (err, rows)=>{
                    if(err){
                        reject(err)
                    }
                    const response = {"error":false, "message":"User registered succesfully."}
                    resolve(response);
                }
            )
        }catch(err){
            reject(err)
        }
    })  
}

module.exports = {login, storeRefreshToken, removeRefreshToken, signup}