const db = require('../config/dbConnection')

const findUser = (email) => {
    return new Promise((resolve, reject) => {
        try {
            db.query("select * from user where email = ? ", [email],
                (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    findUser
}