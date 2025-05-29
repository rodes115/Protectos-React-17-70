import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'
import { ContextHandlerImpl } from 'express-validator/lib/chain'

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        console.log(value)
        console.log(req.body.password)

        if (value !== req.body.password) {
            throw new Error('Los Passwords no son iguales')
        }
        return true
    }),
    body('email')
        .isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',

    body('token').notEmpty().withMessage('El token no puede ir vacio'),
    handleInputErrors,
    AuthController.confirmAccount

)

router.get('/login',
    body('email')
        .isEmail().withMessage('El E-mail no es valido'),
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.login
)

export default router