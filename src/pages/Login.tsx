/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import '../App.css'
import { login } from '../config/services/auth.service'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {

    const navCadastro = (url: string) => {
        navigate(url)
    }

    const navigate = useNavigate()
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        const user = {
            username: ev.currentTarget.username.value,
            password: ev.currentTarget.password.value
        }

        const response = await login(user)

        if (!response.ok) {
            alert(response.message)
            return
        }

        if (response.code === 200) {
            alert(response.message)
            localStorage.setItem('userLogged', JSON.stringify(response.data))
            localStorage.setItem('token', response.data.token)
            navigate("/home")

        }

        ev.currentTarget.username.value = '',
            ev.currentTarget.password.value = ''
    }

    return (
        <>
            <div className='styleLogin'>
                <div className='styleLoginBox'>
                    <h1>GrowTwitter</h1>
                    <p>Trabalho final do bloco intermediário</p>
                    <p>O GrowTwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa,
                        semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com
                        pessoas de todo o mundo e a disseminação de ideias.
                    </p>
                </div>
                <div className='styleInputBox'>
                    <form onSubmit={handleSubmit} className='styleInputs'>
                        <h2>Entrar no GrowTwitter</h2>
                        <label>Username</label>
                        <input id='username' type="text" required />
                        <label>Password</label>
                        <input id='password' type="password" required />
                        <button className='styleButton' type="submit">Entrar</button>
                        <div className='cadastro'>Ainda não tem conta ?  <button onClick={() => navCadastro('/cadastro')} className='cadastroLink'><strong>Cadastre-se</strong></button></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
