const authService = require("../services/auth")
const userService = require("../services/user")

exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        const response = await authService.login(email, password)
        if (!response.error) {
            // Removes previously stored refresh token if any
            await authService.removeRefreshToken(response.id)
            await authService.storeRefreshToken(response.id, response.refreshToken)
        }
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send("Oops! Something went wrong.");
    }
}

exports.signup = async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        const userAlreadyExists = await userService.findUser(email)
        if (userAlreadyExists) {
            const response = {
                "error": true,
                "message": "Email already exists."
            }
            res.status(200).send(response);
        } else {
            const response = await authService.signup(email, password)
            res.status(200).send(response);
        }
    } catch (err) {
        res.status(500).send("Oops! Something went wrong.");
    }
}