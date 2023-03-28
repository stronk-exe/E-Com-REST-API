const router = require('express').Router()

router.get('/user', (req, res) => {
	res.send('gg')
})

router.post('/user', (req, res) => {
	const username = req.body.username
	res.send('username: '+username)
})

module.exports = router