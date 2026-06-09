

export async function getReservasPorMes(ano, mes) {
  // Busca do dia 1 ao último dia do mês
  const primeiroDia = `${ano}-${String(mes + 1).padStart(2, '0')}-01`
  const ultimoDia = new Date(ano, mes + 1, 0)
  const ultimoDiaStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(ultimoDia.getDate()).padStart(2, '0')}`

  // A API filtra por data exata, então precisamos buscar dia a dia
  // OU usar uma abordagem mais simples: buscar todas e filtrar no front
  const response = await fetch(`${BASE_URL}/reservas`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (!response.ok) throw new Error('Erro ao buscar reservas')

  const reservas = await response.json()

  // Filtra as reservas do mês e extrai os dias com reserva
  return reservas
    .filter(r => {
      const data = new Date(r.data_hora)
      return data.getFullYear() === ano && data.getMonth() === mes
        && r.status !== 'cancelada'
    })
    .map(r => new Date(r.data_hora).getDate())
}