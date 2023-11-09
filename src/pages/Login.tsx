/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import '../App.css';
import { login } from '../config/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import AlertLoginStyled from '../components/Alerts/AlertLoginStyled';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [loadingMessageVisible, setLoadingMessageVisible] = useState(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alert, setAlert] = useState('')

    function handleLoading() {
        setLoading(false);
    }

    const navCadastro = (url: string) => {
        navigate(url);
    };

    const handleCloseAlert = () => {
        setOpenAlert(true);
    }


    const navigate = useNavigate();
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const user = {
            username: ev.currentTarget.username.value,
            password: ev.currentTarget.password.value,
        };

        setLoading(true);
        setLoadingMessageVisible(true);

        const response = await login(user);

        setLoading(false);
        setLoadingMessageVisible(false);

        if (!response.ok) {
            setAlert(response.message!);
            return;
        }

        if (response.code === 200) {
            handleCloseAlert()
            setAlert(response.message!);
            localStorage.setItem('userLogged', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
            setTimeout(() => {
                navigate('/home');
            }, 1700)
        }

        ev.currentTarget.username.value = '';
        ev.currentTarget.password.value = '';
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className="styleLogin">
                <div className="styleLoginBox">
                    <h1>GrowTwitter</h1>
                    <p>Trabalho final do bloco intermediário</p>
                    <p>
                        O GrowTwitter é a plataforma definitiva para todos os apaixonados
                        por redes sociais que buscam uma experiência familiar e poderosa,
                        semelhante ao Twitter, mas com um toque único. Seja parte desta
                        comunidade que valoriza a liberdade de expressão, a conexão com
                        pessoas de todo o mundo e a disseminação de ideias.
                    </p>
                </div>
                <div className="styleInputBox">
                    <form onSubmit={handleSubmit} className="styleInputs">
                        <h2>Entrar no GrowTwitter</h2>
                        <label>Username</label>
                        <input id="username" type="text" required />
                        <label>Password</label>
                        <input id="password" type="password" required />
                        <button
                            onClick={handleLoading}
                            className={loading ? 'disabledButton' : 'styleButton'}
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Entrar
                        </button>
                        <div className="cadastro">
                            Ainda não tem conta ?
                            <button
                                onClick={() => navCadastro('/cadastro')}
                                className="cadastroLink"
                            >
                                <strong>Cadastre-se</strong>
                            </button>
                        </div>
                    </form>
                    {loadingMessageVisible && (
                        <div className="loading">
                            <span style={{ paddingRight: '8px' }}>Carregando</span>
                            <span className="bolinha"></span>
                            <span className="bolinha"></span>
                            <span className="bolinha"></span>
                        </div>
                    )}
                </div>
            </div>
            <AlertLoginStyled>
                <Snackbar open={openAlert} autoHideDuration={1800} onClose={() => setOpenAlert(false)}>
                    <Alert variant='outlined' onClose={() => setOpenAlert(false)} severity="success">
                        {alert}
                    </Alert>
                </Snackbar>
            </AlertLoginStyled>
        </div>
    );
};

export default Login;

