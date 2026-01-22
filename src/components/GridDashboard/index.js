import "./styles.css";

import api from "../../utils/api";

import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";

import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

export default function GridDashboard() {
  const [stats, setStats] = useState(null);

  const [chartStatusData, setChartStatusData] = useState([]);

  const [chartDepartmentData, setChartDepartmentData] = useState({
    labels: [],
    values: [],
  });

  const [chartServiceData, setChartServiceData] = useState({
    labels: [],
    values: [],
  });

  const { showLoading, hideLoading } = useLoading();

  const statusLabels = {
    active: "Ativo",
    inactive: "Inativo",
    canceled: "Cancelado",
    lost_domain: "Domínio Perdido",
    frozen_domain: "Domínio Congelado",
    maintenance: "Manutenção",
    laon: "Laon",
    external: "Externo",
    wordpress: "Wordpress",
    opencart: "Opencart",
    outros: "Outros",
  };

  const loadDashboard = async () => {
    try {
      showLoading();

      const response = await api.get("/dashboard");
      setStats(response.data);

      // Pie chart (status)
      const statusData = response.data.status;

      const formattedStatus = Object.entries(response.data.status).map(
        ([key, value], index) => ({
          id: index,
          value,
          label: statusLabels[key] || key,
          className: key,
        })
      );

      setChartStatusData(formattedStatus);

      // Bar chart (department)
      const dept = response.data.department;
      const labels = Object.keys(dept).map((key) => statusLabels[key] || key);
      const values = Object.values(dept);

      setChartDepartmentData({ labels, values });

      // Bar chart (services)
      const service = response.data.service;
      const serviceLabels = Object.keys(service).map(
        (key) => statusLabels[key] || key
      );
      const serviceValues = Object.values(service);

      setChartServiceData({ labels: serviceLabels, values: serviceValues });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);


  if (!stats) return <>Carregando...</>;

  return (
    <section className="container-grid-dashboard-page">
      <div className="container-charts">
        <div className="container-total">
          <p>Total de clientes cadastrados</p>
          <h2>{stats?.total}</h2>
        </div>

        <div className="container-chart-single">
          <PieChart
            series={[
              {
                data: chartStatusData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 15,
                startAngle: -45,
                endAngle: 225,
                cx: 150,
                cy: 150,
              },
            ]}
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="container-charts">
        <div className="container-chart-single">
          <BarChart
            yAxis={[{ scaleType: "band", data: chartServiceData.labels }]}
            series={[
              {
                data: chartServiceData.values,
                borderRadius: 6,
              },
            ]}
            layout="horizontal"
            width={500}
            borderRadius={15}
            height={300}
          />
        </div>

        <div className="container-chart-single">
          <BarChart
            xAxis={[{ scaleType: "band", data: chartDepartmentData.labels }]}
            series={[{ data: chartDepartmentData.values }]}
            borderRadius={15}
            width={500}
            height={300}
          />
        </div>
      </div>

      <div className="container-por-status">
        <div>
          <h2>Status</h2>
          <p>Confira o número de contas por status</p>
        </div>

        <div className="grid-stat-item">
          {Object.entries(stats.status).map(([key, value]) => (
            <div className={`stat-item ${key}`} key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="container-por-status">
        <div>
          <h2>Departamento</h2>
          <p>Confira o número de contas por departamento</p>
        </div>

        <div className="grid-stat-item">
          {Object.entries(stats.department).map(([key, value]) => (
            <div className={`stat-item ${key}`} key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="container-por-status">
        <div>
          <h2>Hosting</h2>
          <p>Confira o número de contas por hosting</p>
        </div>

        <div className="grid-stat-item">
          {Object.entries(stats.hosting).map(([key, value]) => (
            <div className={`stat-item ${key}`} key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
