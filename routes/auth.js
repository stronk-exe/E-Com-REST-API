const router = require('express').Router()
const User = require('../models/User')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
	const newUser = new User ({
		username: req.body.username,
		email: req.body.email,
		password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
	})
	try {
		const savedUser = await newUser.save()
		res.status(201).json(savedUser)
	}
	catch (err) {
		res.status(500).json(err)
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username })
		!user && res.status(401).json('wrong credentials!')
		const hashedPass = cryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
		const originalPassword = hashedPass.toString(cryptoJS.enc.Utf8)

		originalPassword !== req.body.pass &&
			res.status(401).json('wrong credentials!')
		
		const accessTocken = jwt.sign({
			id: user._id,
			isAdmin: user.isAdmin
		},
		process.env.JWT_SEC,
		{expiresIn: '4d'})
		const { password, ...others } = user._doc
		res.status(200).json(others)
	}
	catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router