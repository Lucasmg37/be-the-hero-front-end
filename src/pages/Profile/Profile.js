import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import './Profile.css';
import logoImg from "../../assets/imagens/logo.svg";
import api from "../../services/api";

export default function Profile({history}) {

    const name = localStorage.getItem('name').toUpperCase();
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get("profile").then(response => {
            setIncidents(response.data);
        })

    }, []);

    const handleDeleteIncident = id => {
        api.delete(`incidents/${id}`).then(response => {
            setIncidents(incidents.filter(incident => incident.id !== id));
        })
    };

    const handleDeleteLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem Vindo, {name}</span>
                <Link className="primary-button" to="/incidents/new" >Novo caso</Link>
                <button onClick={handleDeleteLogout}><FiPower size={18} color="#e02041" /></button>
            </header>

            <h1>Casos Cadastrados</h1>

            {incidents.length === 0 && (<div className="empty-incident">Nenhum caso foi encontrado.</div>)}

            <ul>

                {incidents.length > 0 && incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}

            </ul>

        </div>
    )
}