import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import api from '../../services/api';

import heroesImg from "../../assets/imagens/heroes.png";
import logoImg from "../../assets/imagens/logo.svg";
import { FiLogIn } from "react-icons/fi";

export default function Login({ history }) {

    const [login, setLogin] = useState({});

    const handleLogin = e => {
        e.preventDefault();

        api.post('sessions', login).then(response => {
            localStorage.setItem('name', response.data.name)
            history.push("/profile")
        }).catch(error => {

        });

    }

    return (
        <div className="login">
            <section>
                <img src={logoImg} alt="be the hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input
                        type="email"
                        required
                        placeholder="Seu Email"
                        value={login.email}
                        onChange={e => setLogin({ ...login, email: e.target.value })}
                    />

                    <input
                        type="password"
                        required
                        placeholder="Sua Senha"
                        value={login.password}
                        onChange={e => setLogin({ ...login, password: e.target.value })}
                    />

                    <button className="primary-button">Entrar</button>
                    <Link className="icon-link" to="/register"> <FiLogIn size={16} color="#E02041" />  Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes" />
        </div>
    );
}