import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { calcularRisco } from '../utils/riskCalculator';

const MapCard = styled.section`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 0;
  position: relative;
  overflow: hidden;
  height: 520px;
`;

const LegendOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(7, 17, 29, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 12px;
  padding: 12px;
  z-index: 1000;
  min-width: 160px;
  backdrop-filter: blur(8px);

  h3 {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #38bdf8;
    margin: 0 0 10px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #dbeafe;

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .dot.low { background: #22c55e; }
    .dot.medium { background: #fbbf24; }
    .dot.high { background: #ef4444; }
  }
`;

const PlaceholderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #cbd5e1;
  font-size: 1rem;
  text-align: center;
  flex-direction: column;
`;

const iconByRisk = {
  baixo: new L.DivIcon({
    className: 'risk-marker low',
    html: '<span></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  }),
  medio: new L.DivIcon({
    className: 'risk-marker medium',
    html: '<span></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  }),
  alto: new L.DivIcon({
    className: 'risk-marker high',
    html: '<span></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  }),
};

function MapView({ cities }) {
  if (!cities || cities.length === 0) {
    return (
      <MapCard>
        <PlaceholderDiv>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🗺️</div>
          <p style={{ margin: 0 }}>Nenhum dado disponível para visualizar no mapa</p>
        </PlaceholderDiv>
      </MapCard>
    );
  }

  const getRiskColor = (risco) => {
    switch (risco) {
      case 'alto': return '#ef4444';
      case 'medio': return '#fbbf24';
      case 'baixo': return '#22c55e';
      default: return '#38bdf8';
    }
  };

  const getRiskLabel = (risco) => {
    switch (risco) {
      case 'alto': return 'ALTO';
      case 'medio': return 'MÉDIO';
      case 'baixo': return 'BAIXO';
      default: return 'DESCONHECIDO';
    }
  };

  return (
    <MapCard>
      <MapContainer center={[-19.5, -44.5]} zoom={6} scrollWheelZoom style={{ height: '100%', width: '100%', borderRadius: '22px' }}>
        <TileLayer
          attribution='&copy; CartoDB | OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {cities.map((city) => {
          const risco = calcularRisco(city);

          return (
            <Marker
              key={city.id}
              position={city.coords}
              icon={iconByRisk[risco]}
            >
              <Popup>
                <div style={{ padding: '8px', minWidth: '200px', color: '#0f172a' }}>
                  <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>
                    {city.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        backgroundColor: getRiskColor(risco),
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {getRiskLabel(risco)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                    <div>💧 Chuva 24h: <strong>{city.chuva24h}%</strong></div>
                    <div>🌊 Nível do rio: <strong>{city.nivelRio.toFixed(1)} m</strong></div>
                    {city.temperatura && (
                      <div>🌡️ Temperatura: <strong>{city.temperatura}°C</strong></div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <LegendOverlay>
        <h3>Legenda</h3>
        <ul>
          <li><span className="dot low"></span> Baixo risco</li>
          <li><span className="dot medium"></span> Médio risco</li>
          <li><span className="dot high"></span> Alto risco</li>
        </ul>
      </LegendOverlay>
    </MapCard>
  );
}

export default MapView;
