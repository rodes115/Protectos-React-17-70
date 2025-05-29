import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}


export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <adimn@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'Confirma tu cuenta en UpTask',
            html: `<p>hola: ${user.name} has creado tu cuenta en UpTask, ya casi esta tod listo , solo debes confirmar tu cuenta</p>
                        <p>Visita el siguiente enlace:</p>
                        <a href="">Confirmar cuenta</a>
                        <p>Eingresa el código: <b>${user.token}</b></p>
                        <p>Este token expira en 10 min</p>
                `

        })

        console.log('Mensaje enviado', info.messageId)
    }
}