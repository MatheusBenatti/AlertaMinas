import { useMemo, useState } from "react";
import { calcularRisco } from "../utils/riskCalculator";
import MapView from "../components/MapView";
import NotificationPanel from "../components/NotificationPanel";
import {
  PageSection,
  Card,
  SimulatedSection,
  SectionHeader,
  DataGrid,
  SimulatedDashboardGrid,
  DataCard,
  AlertForm,
  AlertFormWrapper,
} from "../styles/AlertsPage.styles";

function AlertsPage() {
  // base mockada fixa
  const allSimulatedData = useMemo(() => {
    return [
      {
        id: "city-1-demo",
        name: "Belo Horizonte",
        coords: [-19.92, -43.94],
        chuva24h: 85,
        nivelRio: 4.2,
        source: "simulado",
      },
      {
        id: "city-2-demo",
        name: "Uberlândia",
        coords: [-18.91, -48.27],
        chuva24h: 45,
        nivelRio: 2.1,
        source: "simulado",
      },
      {
        id: "city-3-demo",
        name: "Juiz de Fora",
        coords: [-21.76, -43.35],
        chuva24h: 15,
        nivelRio: 1.8,
        source: "simulado",
      },
      {
        id: "city-4-demo",
        name: "Montes Claros",
        coords: [-16.72, -43.86],
        chuva24h: 78,
        nivelRio: 3.8,
        source: "simulado",
      },
    ];
  }, []);

  // overrides (alertas criados pelo usuário)
  const [overrides, setOverrides] = useState([]);

  // merge base + overrides
  const allCities = useMemo(() => {
    return allSimulatedData.map((city) => {
      const override = overrides.find((o) => o.id === city.id);
      return override ? { ...city, ...override } : city;
    });
  }, [overrides, allSimulatedData]);

  // apenas críticos
  const simulatedAlerts = useMemo(() => {
    return allCities.filter((city) => calcularRisco(city) === "alto");
  }, [allCities]);

  // criar/atualizar alerta
  function criarAlerta(novoAlerta) {
    setOverrides((prev) => {
      const existe = prev.find((c) => c.id === novoAlerta.id);

      if (existe) {
        return prev.map((c) =>
          c.id === novoAlerta.id ? { ...c, ...novoAlerta } : c,
        );
      }

      return [...prev, novoAlerta];
    });
  }

  return (
    <PageSection>
      <SimulatedDashboardGrid>
        <Card>
          <div>
            <p className="eyebrow">DEMONSTRAÇÃO DE ALERTAS</p>
            <h2>Visualização de Diferentes Níveis de Risco</h2>
            <p className="description">
              Sistema com dados simulados + sobrescrita dinâmica de alertas.
            </p>
          </div>
        </Card>

        <AlertFormWrapper>
          <AlertCreator cities={allSimulatedData} onCreate={criarAlerta} />
        </AlertFormWrapper>
      </SimulatedDashboardGrid>

      {/* MAPA + ALERTAS */}
      <Card>
        <SimulatedSection>
          <SectionHeader>
            Mapa de Monitoramento com Dados Simulados
          </SectionHeader>

          <SimulatedDashboardGrid>
            <MapView cities={allCities} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <NotificationPanel cities={simulatedAlerts} />
            </div>
          </SimulatedDashboardGrid>
        </SimulatedSection>
      </Card>

      {/* DETALHES */}
      <Card>
        <SimulatedSection>
          <SectionHeader>Detalhes de Cada Localidade</SectionHeader>

          <DataGrid>
            {allCities.map((city) => {
              const risk = calcularRisco(city);

              const riskLabel =
                risk === "alto"
                  ? "🔴 Alto"
                  : risk === "medio"
                    ? "🟡 Médio"
                    : "🟢 Baixo";

              return (
                <DataCard key={city.id} $risk={risk}>
                  <div className="card-top">
                    <div className="city-name">{city.name}</div>
                    <span className="risk-badge">{riskLabel}</span>
                  </div>

                  <div className="data-row">
                    <span className="label">💧 Chuva 24h</span>
                    <span className="value">{city.chuva24h}%</span>
                  </div>

                  <div className="data-row">
                    <span className="label">🌊 Nível do rio</span>
                    <span className="value">{city.nivelRio?.toFixed(1)}</span>
                  </div>
                </DataCard>
              );
            })}
          </DataGrid>
        </SimulatedSection>
      </Card>
    </PageSection>
  );
}

/* =========================
   FORMULÁRIO
========================= */

function AlertCreator({ cities, onCreate }) {
  const [form, setForm] = useState({
    id: "",
    chuva24h: "",
    nivelRio: "",
  });

  return (
    <AlertForm>
      <h3 className="form-title">Criar ou atualizar alerta</h3>

      <div className="form-group">
        {/* SELECT cidades */}
      <select
        className="form-input"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      >
        <option value="">Selecione uma cidade</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
        {/* chuva */}
        <input
          className="form-input"
          type="number"
          placeholder="Chuva 24h (%)"
          value={form.chuva24h}
          onChange={(e) =>
            setForm({
              ...form,
              chuva24h: Number(e.target.value),
            })
          }
        />

        {/* rio */}
        <input
          className="form-input"
          type="number"
          placeholder="Nível do rio (m)"
          value={form.nivelRio}
          onChange={(e) =>
            setForm({
              ...form,
              nivelRio: Number(e.target.value),
            })
          }
        />
      </div>

      <button
        className="form-button"
        onClick={() => {
          if (!form.id) return;

          onCreate(form);

          // reset form
          setForm({
            id: "",
            chuva24h: 0,
            nivelRio: 0,
          });
        }}
      >
        Aplicar alerta
      </button>
    </AlertForm>
  );
}

export default AlertsPage;
