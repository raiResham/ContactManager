const Yup = require("yup")

const addOrEditContactSchema = Yup.object({
    name: Yup.string()
        .required(),
    phone: Yup.string()
        .required('Required'),
    favourite: Yup.string().oneOf(["yes", "no"])
})

module.exports = addOrEditContactSchema