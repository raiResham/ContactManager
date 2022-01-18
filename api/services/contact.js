const db = require('../config/dbConnection')

const getAllContacts = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query("select * from contacts where user_id = ? order by favourite desc, name asc", id,
                (err, contacts) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(contacts)
                })
        } catch (err) {
            reject(err)
        }
    })
}

const addContact = ({
    name,
    phone,
    favourite
}, userId) => {
    const isFavourite = favourite === "yes" ? 1 : 0
    return new Promise((resolve, reject) => {
        try {
            db.query("insert into contacts (user_id, name, phone, favourite) values  (?,?,?,?)", [userId, name, phone, isFavourite],
                (err, contacts) => {
                    if (err) {
                        reject(false)
                    }
                    resolve(true)
                })
        } catch (err) {
            reject(false)
        }
    })
}

const getContactById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                'SELECT * FROM contacts where id = ? ', id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length) {
                        resolve(rows[0]);
                    } else {
                        resolve(false)
                    }


                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

const isAuthorizedToEditOrDeleteContact = (contactId, userId) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                'SELECT user_id FROM contacts where id = ? ', contactId,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length) {
                        if (rows[0].user_id == userId) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }

                    } else {
                        // Contact does not exits
                        resolve(false)
                    }
                    resolve(rows[0]);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}


const deleteContact = (contactId) => {
    return new Promise((resolve, reject) => {
        try {
            db.query("delete from contacts where id = ? ", [contactId],
                (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(true)
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

const editContact = (contactId, name, phone, favourite) => {
    favourite = (favourite === "yes" ? 1 : 0)
    return new Promise((resolve, reject) => {
        try {
            db.query("update contacts set name = ?, phone =?, favourite = ? where id = ? ", [name, phone, favourite, contactId],
                (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(true)
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

const getContact = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query("select * from contacts where id = ?", id,
                (err, contacts) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(contacts)
                })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    addContact,
    getAllContacts,
    getContactById,
    isAuthorizedToEditOrDeleteContact,
    deleteContact,
    editContact,
    getContact
}