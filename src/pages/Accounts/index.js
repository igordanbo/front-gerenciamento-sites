import "./style.css";

import api from "../../utils/api";
import renderStatus from "../../utils/renderStatus";
import cleanDomain from "../../utils/cleanDomain";

import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import { Link, useNavigate } from "react-router-dom";

import Table from "../../components/Table";
import TableHeader from "../../components/TableHeader";
import TableItem from "../../components/TableItem";
import TableFooter from "../../components/TableFooter";
import TableItemEmpty from "../../components/TableItemEmpty";
import Input from "../../components/Input";
import Select from "../../components/Select";
import ModuleTitleClip from "../../components/ModuleTitleClip";

export default function Accounts() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [pagination, setPagination] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    hosting: "",
    department: "",
    service: "",
  });

  // debounce timer
  const [searchTimer, setSearchTimer] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // se não for o campo search, filtra imediatamente
    if (name !== "search") {
      loadPageAccounts("/products", { ...filters, [name]: value });
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setFilters((prev) => ({
      ...prev,
      search: value,
    }));

    // limpa timer anterior
    if (searchTimer) clearTimeout(searchTimer);

    // cria novo debounce
    const timer = setTimeout(() => {
      loadPageAccounts("/products", { ...filters, search: value });
    }, 400);

    setSearchTimer(timer);
  };

  const loadPageAccounts = async (url = "/products", customFilters = null) => {
    try {
      showLoading();

      const params = customFilters ?? filters;

      const response = await api.get(url, { params });

      setAccounts(response.data.data);

      setPagination({
        currentPage: response.data.current_page,
        perPage: response.data.per_page,
        total: response.data.total,
        next: response.data.next_page_url,
        prev: response.data.prev_page_url,
        lastPage: response.data.last_page,
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadPageAccounts();
  }, []);

  if (!pagination) return <>Carregando...</>;

  return (
    <>
      <ModuleTitleClip title={"Listagem de contas"} />

      {/* FILTROS */}
      <div className="filters-grid mb-4 grid gap-3 md:grid-cols-5">
        {/* SEARCH */}
        <Input
          name="search"
          label="Buscar por nome ou URL"
          placeholder="Buscar por nome ou URL"
          value={filters.search}
          onChange={handleSearchChange}
        />

        {/* STATUS */}
        <Select
          name="status"
          label="Filtre por status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
          <option value="canceled">Cancelado</option>
          <option value="lost_domain">Domínio perdido</option>
          <option value="frozen_domain">Domínio congelado</option>
          <option value="maintenance">Manutenção</option>
        </Select>

        {/* HOSTING */}
        <Select
          name="hosting"
          label="Filtre por hosting"
          value={filters.hosting}
          onChange={handleChange}
        >
          <option value="laon">Laon</option>
          <option value="external">Externo</option>
        </Select>

        {/* DEPARTMENT */}
        <Select
          name="department"
          value={filters.department}
          onChange={handleChange}
          label="Filtre por hosting"
        >
          <option value="laon">Laon</option>
          <option value="wordpress">wordpress</option>
          <option value="opencart">Opencart</option>
          <option value="outros">Outros</option>
        </Select>

        {/* SERVICE */}
        <Select
          name="service"
          value={filters.service}
          label="Filtre por serviço"
          onChange={handleChange}
        >
          <option value="site">Site</option>
          <option value="email">Email</option>
          <option value="sistema">Sistema</option>
          <option value="site_email">Site + Email</option>
          <option value="site_sistema">Site + Sistema</option>
          <option value="sistema_email">Sistema + Email</option>
          <option value="site_email_sistema">Site + Email + Sistema</option>
        </Select>
      </div>

      {/* TABELA */}
      <Table>
        <TableHeader
          columns="5"
          col1="Cliente"
          col2="URL"
          col3="Departamento"
          col4="Hosting"
          col5="Status"
        />

        {accounts.length === 0 ? (
          <TableItemEmpty />
        ) : (
          accounts.map((account) => (
            <TableItem
              key={account?.id}
              columns={"5"}
              col1={account?.name}
              col2={<Link to={account?.url}>{account?.url}</Link>}
              col3={account?.department}
              col4={account?.hosting}
              col5={renderStatus(account?.status)}
              actions={true}
              action_view={true}
              onClickView={() =>
                navigate(`/administracao/contas/conta/${account?.id}`)
              }
            />
          ))
        )}

        <TableFooter
          prev={!!pagination.prev}
          next={!!pagination.next}
          totalItems={pagination.total}
          currentPage={pagination.currentPage}
          perPage={pagination.perPage}
          onClickPrev={() => loadPageAccounts(pagination.prev)}
          onClickNext={() => loadPageAccounts(pagination.next)}
        />
      </Table>
    </>
  );
}
