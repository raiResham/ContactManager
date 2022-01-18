const contactService = require("../services/contact")

const getAllContacts = async (req, res) => {
    const userId = req.userId
    try {
        const contacts = await contactService.getAllContacts(userId)
        res.status(200).send(contacts)
    } catch (err) {
        res.status(500).send("Oops! Something went wrong.");
    }
}

const addContact = async (req, res) => {
    try {
        const inserted = await contactService.addContact(req.body, req.userId)
        res.status(200).send({
            "error": false,
            "message": "Contact Added successfully."
        })
    } catch (err) {
        res.status(500).send("Oops! Something went wrong.");
    }
}

const deleteContact = async (req, res) => {
    const contactId = req.params._id
    try {
        const deleted = await contactService.deleteContact(contactId)
        res.status(200).send({
            "error": false,
            "message": "Contact deleted successfully."
        })
    } catch (err) {
        res.status(500).send("Oops! Something went wrong.");
    }
};

const editContact = async (req, res) => {
    const contactId = req.params._id
    const {
        name,
        phone,
        favourite
    } = req.body
    try {
        const edited = await contactService.editContact(contactId, name, phone, favourite)
        res.status(200).send({
            "error": false,
            "message": "Contact edited successfully."
        })
    } catch (err) {
        res.status(500).send("Oops! Something went wrong.");
    }
};

const getContact = async (req, res) => {
    const contactId = req.params._id
    try {
        const contacts = await contactService.getContact(contactId)
        res.status(200).send(contacts)
    } catch (err) {
        res.status(500).send("Oops! Something went wrong.");
    }
}

module.exports = {
    getAllContacts,
    addContact,
    deleteContact,
    editContact,
    getContact
}