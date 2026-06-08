import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { calcularRisco } from '../utils/riskCalculator';
import {
  MapCard,
  MapHeaderOverlay,
  LegendOverlay,
  PlaceholderDiv,
  riskMeta,
} from '../styles/MapView.styles';

const iconByRisk = {
  baixo: new L.DivIcon({
    className: 'risk-marker low',
    html: '<span></span>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
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
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  }),
};

function MapView({ cities }) {
  if (!cities || cities.length === 0) {
    return (
      <MapCard>
        <PlaceholderDiv>
          <div style={{ fontSize: '2.5rem' }}>🗺️</div>
          <p style={{ margin: 0, color: '#64748b' }}>Nenhum dado disponível para visualizar no mapa</p>
        </PlaceholderDiv>
      </MapCard>
    );
  }

  const highCount = cities.filter(c => calcularRisco(c) === 'alto').length;

  return (
    <MapCard>
      <MapContainer center={[-19.5, -44.5]} zoom={6} scrollWheelZoom style={{ height: '100%', width: '100%', borderRadius: '22px' }}>
        <TileLayer
          attribution='&copy; CartoDB | OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {cities.map((city) => {
          const risco = calcularRisco(city);
          const meta = riskMeta[risco] || riskMeta.baixo;

          return (
            <Marker
              key={city.id}
              position={city.coords}
              icon={iconByRisk[risco]}
            >
              <Popup>
                <div style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  background: '#0f172a',
                  color: '#eff6ff',
                  borderRadius: '12px',
                  padding: '14px',
                  minWidth: '210px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#eff6ff' }}>{city.name}</div>
                    <span style={{
                      background: meta.color,
                      color: meta.textColor,
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>
                      {meta.emoji} {meta.label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem', color: '#64748b' }}>
                        <span>💧 Chuva 24h</span>
                        <strong style={{ color: '#eff6ff' }}>{city.chuva24h}%</strong>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(148,163,184,0.12)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(100, city.chuva24h)}%`, background: meta.color, borderRadius: '999px', opacity: 0.85 }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem', color: '#64748b' }}>
                        <span>🌊 Nível do rio</span>
                        <strong style={{ color: '#eff6ff' }}>{city.nivelRio.toFixed(1)} m</strong>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(148,163,184,0.12)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(100, (city.nivelRio / 6) * 100)}%`, background: '#38bdf8', borderRadius: '999px', opacity: 0.75 }} />
                      </div>
                    </div>

                    {city.temperatura && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', paddingTop: '2px', borderTop: '1px solid rgba(148,163,184,0.1)' }}>
                        <span>🌡️ Temperatura</span>
                        <strong style={{ color: '#eff6ff' }}>{city.temperatura}°C</strong>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <MapHeaderOverlay>
        🗺️ Minas Gerais &nbsp;·&nbsp; <span className="count">{cities.length}</span> municípios
        {highCount > 0 && <>&nbsp;·&nbsp; <span style={{ color: '#fca5a5' }}>⚠ {highCount} crítico{highCount > 1 ? 's' : ''}</span></>}
      </MapHeaderOverlay>

      <LegendOverlay>
        <h3>Nível de Risco</h3>
        <ul>
          <li>
            <span className="dot high"></span>
            <span>Alto</span>
            <span className="legend-threshold">chuva &gt;60% · rio &gt;3m</span>
          </li>
          <li>
            <span className="dot medium"></span>
            <span>Médio</span>
            <span className="legend-threshold">chuva &gt;30%</span>
          </li>
          <li>
            <span className="dot low"></span>
            <span>Baixo</span>
            <span className="legend-threshold">sem alerta</span>
          </li>
        </ul>
        <div className="legend-divider" />
        <p className="legend-note">Clique em um marcador para ver os detalhes do município.</p>
      </LegendOverlay>
    </MapCard>
  );
}

export default MapView;

 