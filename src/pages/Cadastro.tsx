import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { CadastroRequest, cadastro } from '../config/services/user.service'

const Cadastro: React.FC = () => {
    const navigate = useNavigate()
    const navHome = (url: string) => {
        navigate(url)
    }

    const [user, setUser] = useState<CadastroRequest>({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        const response = await cadastro(user)

        if (!response.ok && response.code !== 201) {
            alert(response.message)
            return
        }

        if (response.code === 201) {
            navigate('/')
        }
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
                        <label>Name</label>
                        <input onChange={(e) => setUser({ ...user, name: e.target.value })} type="text" required />
                        <label>Username</label>
                        <input onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" required />
                        <label>Email</label>
                        <input onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" required />
                        <label>Password</label>
                        <input onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" required />
                        <button className='styleButton' type="submit" >Cadastrar</button>
                        <div className='cadastro'>Já tem conta ? <button className='cadastroLink' onClick={() => navHome('/')}>Fazer login</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Cadastro