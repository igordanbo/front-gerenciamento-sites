import "./utilsStyles.css";

export default function renderStatus(status) {
  if (status === "maintenance" || status === "inactive" )
    return (
      <span className="badge-render-status badge-render-status-agendada">
        Inativo
      </span>
    );
  if (status === "active")
    return (
      <span className="badge-render-status badge-render-status-concluida">
        Ativo
      </span>
    );
  if (status === "canceled")
    return (
      <span className="badge-render-status badge-render-status-cancelada">
        Cancelado
      </span>
    );
  if (status === "lost_domain")
    return (
      <span className="badge-render-status badge-render-status-lost">
        Dom. perdido
      </span>
    );

  if (status === "frozen_domain")
    return (
      <span className="badge-render-status badge-render-status-frozen">
        Dom. congelado
      </span>
    );

  return <span>Indefinido</span>;
}