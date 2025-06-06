import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import Token from "../models/Token"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"


export class AuthController {
    static createAccount = async (req: Request, res: Response) => {

        try {


            const { password, email } = req.body
            const userExists = await User.findOne({ email })
            if (userExists) {
                const error = new Error('El Usuario ya esta registrado')
                res.status(409).json({ error: error.message })
            }
            //Crea un usuario
            const user = new User(req.body)

            //Hash password
            user.password = await hashPassword(password)

            //generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            //Envar Email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })


            await Promise.allSettled([user.save(), token.save()])
            res.send('Cuenta creada, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }


    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExist = await Token.findOne({ token })
            console.log(tokenExist)
            if (!tokenExist) {
                const error = new Error('Token no válido')
                res.status(404).json({ error: error.message })
            }

            const user = await User.findById(tokenExist.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Cuenta confirmada correctamente')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static login = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({ error: error.message })
            }

            if (!user.confirmed) {
                const token = new Token()
                token.user = user.id
                token.token = generateToken()
                await token.save()

                //enviar Email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error('Cuenta no a sido confirmada, Emos enviado un email de confirmación')
                res.status(401).json({ error: error.message })
            }
            // Revisar password
            const isPasswordCorrect = await checkPassword(password, user.password)

            if (!isPasswordCorrect) {
                const error = new Error('password Incorrecto')
                res.status(401).json({ error: error.message })
            }
            
            res.send('Autenticado...')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static requestConfirmationCode = async (req: Request, res: Response) => {

        try {

            const { email } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                const error = new Error('El Usuario no esta registrado')
                res.status(404).json({ error: error.message })
            } else {

                if (user.confirmed) {
                    
                    const error = new Error('El Usuario ya esta registrado')
                    res.status(403).json({ error: error.message })

                } else {

                    //generar Token
                    const token = new Token()
                    token.token = generateToken()
                    token.user = user.id

                    //Envar Email
                    AuthEmail.sendConfirmationEmail({
                        email: user.email,
                        name: user.name,
                        token: token.token
                    })

                    await Promise.allSettled([user.save(), token.save()])

                    res.send('Se envió un nuevo token a tu e-mail')
                }

            }
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }

}