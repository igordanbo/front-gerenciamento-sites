import "./style.css";
import api from "../../../utils/api";
import renderStatus from "../../../utils/renderStatus";

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLoading } from "../../../context/LoadingContext";

export default function AccountView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [account, setAccount] = useState(null);

  const loadAccount = async () => {
    try {
      showLoading();
      const response = await api.get(`/products/${id}`);
      setAccount(response.data.data);
    } catch (error) {
      console.error("Erro ao carregar conta:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadAccount();
  }, []);

  if (!account) return <>Carregando...</>;

  return (
    <div className="account-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>

      <h1 className="title">{account.name}</h1>

      <div className="info-grid">
        <div className="info-item">
          <strong>ID:</strong> {account.id}
        </div>
        <div className="info-item">
          <strong>URL:</strong>{" "}
          <Link to={account.url} target="_blank">
            {account.url}
          </Link>
        </div>
        <div className="info-item">
          <strong>Departamento:</strong> {account.department}
        </div>
        <div className="info-item">
          <strong>Hosting:</strong> {account.hosting}
        </div>
        <div className="info-item">
          <strong>Serviço:</strong> {account.service}
        </div>
        <div className="info-item">
          <strong>Status:</strong> {renderStatus(account.status)}
        </div>
        <div className="info-item">
          <strong>CNPJ:</strong> {account.cnpj ?? "—"}
        </div>
        <div className="info-item">
          <strong>Info adicional:</strong> {account.adicional_info ?? "—"}
        </div>
        <div className="info-item">
          <strong>CNPJ:</strong> {account.cnpj ?? "—"}
        </div>
        <div className="info-item">
          <strong>Criado em:</strong>{" "}
          {new Date(account.created_at).toLocaleString()}
        </div>
        <div className="info-item">
          <strong>Atualizado em:</strong>{" "}
          {new Date(account.updated_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
