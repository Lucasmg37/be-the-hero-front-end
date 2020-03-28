import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import './NewIncident.css';
import api from '../../services/api';

import logoImg from "../../assets/imagens/logo.svg";

export default function NewIncident({ history }) {

    const [incident, setIncident] = useState({});

    const handleNewIncident = e => {
        e.preventDefault();

        api.post('incidents', incident).then(response => {
            history.push('/profile');
        });

    }

    return (
        <div className="new-incident">
            <div className="content" >
                <section>
                    <img src={logoImg} alt="Be the hero" />
                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontar um herói para resolver isso.</p>
                    <Link className="icon-link" to="/profile"> <FiArrowLeft size={16} color="#E02041" />  Voltar para home</Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        type="text"
                        placeholder="Titulo do caso"
                        required
                        value={incident.title}
                        onChange={e => setIncident({ ...incident, title: e.target.value })}
                    />

                    <textarea
                        placeholder="Descrição"
                        required
                        value={incident.description}
                        onChange={e => setIncident({ ...incident, description: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Valor em reais"
                        required
                        value={incident.value}
                        onChange={e => setIncident({ ...incident, value: e.target.value })}
                    />

                    <button className="primary-button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}