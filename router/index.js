const Router = require('express').Router
const userController = require('../controllers/user-controller')
const ProductController = require('../controllers/product-controller')
const OrderController = require('../controllers/order-controller')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

router.get('/products', ProductController.getAll)
router.post('/products', ProductController.addProduct)
router.get('/product/:id', ProductController.getOne)

router.get('/orders/:userID', OrderController.getAll)
router.post('/orders', OrderController.createOrder)

module.exports = router