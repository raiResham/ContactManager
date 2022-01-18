const contactService = require("../services/contact")

const isAuthorizedToEditOrDeleteContact = () => {
    return async (req, res, next) => {
        const contactId = req.params._id
        const userId = req.userId
        const contact = await contactService.getContactById(contactId)
        if (!contact) {
            return res.status(404).send({
                "error": true,
                "message": "Contact does not exists."
            });
        }
        const authorized = await contactService.isAuthorizedToEditOrDeleteContact(contactId, userId)
        if (!authorized) {
            return res.status(403).send({
                "error": true,
                "message": "Not Authorized."
            });
        }
        next()
    }
}

module.exports = {
    isAuthorizedToEditOrDeleteContact
}