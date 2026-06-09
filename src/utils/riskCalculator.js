export function calcularRisco(cidade) {
  const chuva = cidade.chuva24h ?? 0;
  const nivel = cidade.nivelRio ?? 0;
  const umidade = cidade.umidade ?? 0;

  // 🔴 Alto risco (combinação crítica)
  if (
    (chuva > 60 && nivel > 3) ||
    (nivel > 4) ||
    (chuva > 80)
  ) {
    return 'alto';
  }

  // 🟡 Médio risco (condições de atenção)
  if (
    (chuva > 30 && nivel > 2) ||
    chuva > 50 ||
    umidade > 85
  ) {
    return 'medio';
  }

  // 🟢 Baixo risco
  return 'baixo';
}