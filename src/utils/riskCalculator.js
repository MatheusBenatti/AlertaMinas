export function calcularRisco(cidade) {
  if (cidade.chuva24h > 60 && cidade.nivelRio > 3) {
    return 'alto';
  }

  if (cidade.chuva24h > 30) {
    return 'medio';
  }

  return 'baixo';
}
