import styled from "styled-components";
export { PageSection } from "./shared.styles";

export const Card = styled.article`
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.96),
    rgba(7, 17, 29, 0.98)
  );
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 18px;

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #38bdf8;
    font-size: 0.75rem;
    margin: 0 0 6px 0;
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  .description {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
`;

export const SimulatedSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionHeader = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fbbf24;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(251, 191, 36, 0.2);
`;

export const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
  margin-top: 12px;
`;

export const SimulatedDashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 49% 50%;
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

/* =========================
   RISK THEME
========================= */

export const riskAccentMap = {
  alto: {
    border: "rgba(239,68,68,0.4)",
    left: "#ef4444",
    bg: "rgba(239,68,68,0.06)",
    badgeBg: "#ef4444",
    badgeColor: "#fff",
    glow: "rgba(239,68,68,0.12)",
  },
  medio: {
    border: "rgba(251,191,36,0.35)",
    left: "#fbbf24",
    bg: "rgba(251,191,36,0.05)",
    badgeBg: "#fbbf24",
    badgeColor: "#0f172a",
    glow: "rgba(251,191,36,0.10)",
  },
  baixo: {
    border: "rgba(34,197,94,0.3)",
    left: "#22c55e",
    bg: "rgba(34,197,94,0.05)",
    badgeBg: "#22c55e",
    badgeColor: "#0f172a",
    glow: "rgba(34,197,94,0.08)",
  },
};

/* =========================
   DATA CARD (MANTIDO)
========================= */

export const DataCard = styled.div`
  background: ${(props) =>
    riskAccentMap[props.$risk]?.bg || "rgba(30,41,59,0.6)"};
  border: 1px solid
    ${(props) => riskAccentMap[props.$risk]?.border || "rgba(148,163,184,0.18)"};
  border-left: 3px solid
    ${(props) => riskAccentMap[props.$risk]?.left || "#38bdf8"};
  border-radius: 14px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px
      ${(props) => riskAccentMap[props.$risk]?.glow || "rgba(0,0,0,0.2)"};
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .city-name {
    font-weight: 700;
    color: #eff6ff;
    font-size: 1rem;
    flex: 1;
  }

  .data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    font-size: 0.85rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.06);

    &:last-of-type {
      border-bottom: none;
    }

    .label {
      color: #64748b;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .value {
      color: #eff6ff;
      font-weight: 700;
    }
  }

  .risk-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 6px;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    flex-shrink: 0;
    background: ${(props) => riskAccentMap[props.$risk]?.badgeBg || "#38bdf8"};
    color: ${(props) => riskAccentMap[props.$risk]?.badgeColor || "#fff"};
  }
`;

/* =========================
   🔥 NOVO: ALERT FORM (NÍVEL CARD)
========================= */

export const AlertForm = styled.div`
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.92),
    rgba(7, 17, 29, 0.98)
  );
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-left: 3px solid #38bdf8;
  border-radius: 16px;
  padding: 16px;
  width: 100%;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);

  display: flex;
  flex-direction: column;
  gap: 10px;

  .form-group {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .form-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #38bdf8;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  select,
  input {
    background: rgba(2, 6, 23, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 10px;
    padding: 10px 12px;
    color: #e2e8f0;
    font-size: 0.9rem;
    outline: none;
    transition: all 0.2s ease;
    flex-grow: 1;
    margin-right: 5px;
  }

  select:focus,
  input:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.15);
  }

  button {
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    border: none;
    border-radius: 10px;
    padding: 10px 12px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }
`;

export const AlertFormWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;
