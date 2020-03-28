import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from "../../assets/imagens/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

export default function Register({ history }) {

    const [ong, setOng] = useState({});

    function handleRegister(e) {
        e.preventDefault();

        api.post("ongs", ong).then(response => {
            history.push("/");
        }).catch(err => {
            //Todo Componente de erro

        });

    }


    return (
        <div className="register" >

            <div className="content" >
                <section>
                    <img src={logoImg} alt="Be the hero" />
                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="icon-link" to="/"> <FiArrowLeft size={16} color="#E02041" />  Voltar para login</Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        required
                        placeholder="Nome da ONG"
                        onChange={e => setOng({ ...ong, name: e.target.value })}
                        value={ong.name}
                    />

                    <input
                        type="email"
                        required
                        placeholder="E-mail"
                        onChange={e => setOng({ ...ong, email: e.target.value })}
                        value={ong.email}
                    />

                    <input
                        type="text"
                        required
                        placeholder="Whatsapp"
                        onChange={e => setOng({ ...ong, whatsapp: e.target.value })}
                        value={ong.whatsapp}
                    />

                    <div className="input-group">
                        <input
                            type="text"
                            required
                            placeholder="Cidade"
                            onChange={e => setOng({ ...ong, city: e.target.value })}
                            value={ong.city}
                        />

                        <input
                            type="text"
                            required
                            maxLength={2}
                            placeholder="UF"
                            style={{ width: 80, marginLeft: 8 }}
                            onChange={e => setOng({ ...ong, uf: e.target.value })}
                            value={ong.uf}
                        />
                    </div>
                    <button className="primary-button">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}