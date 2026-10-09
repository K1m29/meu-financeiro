import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export default function App() {
  const transacoesIniciais = [
    { id: 1, descricao: 'Salário de Outubro', categoria: 'Rendimento', data: '05/10/2026', valor: 7500.00, tipo: 'entrada' },
    { id: 2, descricao: 'Supermercado', categoria: 'Alimentação', data: '06/10/2026', valor: 450.00, tipo: 'saida' },
    { id: 3, descricao: 'Conta de Luz', categoria: 'Contas Fixas', data: '07/10/2026', valor: 180.00, tipo: 'saida' },
    { id: 4, descricao: 'Assinatura Streaming', categoria: 'Lazer', data: '08/10/2026', valor: 49.90, tipo: 'saida' },
  ]

  // Estado das transações no localStorage
  const [transacoes, setTransacoes] = useState(() => {
    const dadosSalvos = localStorage.getItem('meu_financeiro_transacoes')
    if (dadosSalvos) {
      try {
        return JSON.parse(dadosSalvos)
      } catch (e) {
        console.error('Erro ao carregar do localStorage', e)
        return transacoesIniciais
      }
    }
    return transacoesIniciais
  })

  // Estados para Filtro e Pesquisa
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos') // 'todos' | 'entrada' | 'saida'

  useEffect(() => {
    localStorage.setItem('meu_financeiro_transacoes', JSON.stringify(transacoes))
  }, [transacoes])

  // Estados do Modal e Formulário
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [tipo, setTipo] = useState('saida')

  // Cálculos dinâmicos gerais
  const totalEntradas = transacoes
    .filter(t => t.tipo === 'entrada')
    .reduce((acc, t) => acc + t.valor, 0)

  const totalSaidas = transacoes
    .filter(t => t.tipo === 'saida')
    .reduce((acc, t) => acc + t.valor, 0)

  const saldoTotal = totalEntradas - totalSaidas

  // Agrupamento de dados para o Gráfico de Gastos por Categoria
  const dadosGrafico = transacoes
    .filter(t => t.tipo === 'saida')
    .reduce((acc, item) => {
      const categoriaExistente = acc.find(c => c.name.toLowerCase() === item.categoria.toLowerCase())
      if (categoriaExistente) {
        categoriaExistente.value += item.valor
      } else {
        acc.push({ name: item.categoria, value: item.valor })
      }
      return acc
    }, [])

  // Paleta de cores para o gráfico
  const CORES_GRAFICO = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']

  // Lógica para filtrar as transações em tempo real
  const transacoesFiltradas = transacoes.filter((item) => {
    const atendeFiltroTipo = 
      filtroTipo === 'todos' ? true : item.tipo === filtroTipo

    const atendeBusca = 
      item.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busca.toLowerCase())

    return atendeFiltroTipo && atendeBusca
  })

  const handleAddTransacao = (e) => {
    e.preventDefault()

    if (!descricao || !valor || !categoria) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const novaTransacao = {
      id: Date.now(),
      descricao,
      categoria,
      data: new Date().toLocaleDateString('pt-BR'),
      valor: parseFloat(valor),
      tipo,
    }

    setTransacoes([novaTransacao, ...transacoes])

    setDescricao('')
    setValor('')
    setCategoria('')
    setTipo('saida')
    setIsModalOpen(false)
  }

  const handleRemoveTransacao = (id) => {
    const listaFiltrada = transacoes.filter(item => item.id !== id)
    setTransacoes(listaFiltrada)
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-gray-100 font-sans">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Meu Financeiro</h1>
          <p className="text-sm text-gray-400">Visão geral do seu patrimônio e transações</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 transition-colors cursor-pointer"
        >
          + Nova Transação
        </button>
      </header>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
          <p className="text-sm font-medium text-gray-400">Saldo Total</p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <span className="mt-2 inline-block rounded-full bg-blue-950 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-800">
            Salvo localmente
          </span>
        </div>

        <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
          <p className="text-sm font-medium text-gray-400">Entradas no Mês</p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            + R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <span className="mt-2 inline-block rounded-full bg-emerald-950 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-800">
            Total de ganhos
          </span>
        </div>

        <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
          <p className="text-sm font-medium text-gray-400">Saídas no Mês</p>
          <h2 className="mt-2 text-3xl font-bold text-rose-500">
            - R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <span className="mt-2 inline-block rounded-full bg-rose-950 px-2.5 py-0.5 text-xs font-semibold text-rose-400 border border-rose-800">
            Total de despesas
          </span>
        </div>
      </div>

      {/* Seção do Gráfico de Distribuição de Despesas */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Distribuição de Gastos por Categoria</h3>
        <p className="text-xs text-gray-400 mb-4">Acompanhe visualmente as maiores categorias de despesas</p>
        
        {dadosGrafico.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Nenhuma despesa registrada para exibir no gráfico.</p>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosGrafico}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dadosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES_GRAFICO[index % CORES_GRAFICO.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Tabela com Filtro e Pesquisa */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Transações Recentes</h3>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input 
              type="text"
              placeholder="Pesquisar por nome ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-lg bg-gray-800 border border-gray-700 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none w-full sm:w-64"
            />

            <div className="flex rounded-lg bg-gray-800 p-1 border border-gray-700">
              <button
                onClick={() => setFiltroTipo('todos')}
                className={`rounded-md px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                  filtroTipo === 'todos' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFiltroTipo('entrada')}
                className={`rounded-md px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                  filtroTipo === 'entrada' ? 'bg-emerald-600/30 text-emerald-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                Entradas
              </button>
              <button
                onClick={() => setFiltroTipo('saida')}
                className={`rounded-md px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                  filtroTipo === 'saida' ? 'bg-rose-600/30 text-rose-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                Saídas
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800/50 text-xs uppercase text-gray-400 border-b border-gray-800">
              <tr>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3 text-right">Valor</th>
                <th className="px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transacoesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : (
                transacoesFiltradas.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-4 font-medium text-white">{item.descricao}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-300">
                        {item.categoria}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-400">{item.data}</td>
                    <td className={`px-4 py-4 text-right font-semibold ${item.tipo === 'entrada' ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {item.tipo === 'entrada' ? '+' : '-'} R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleRemoveTransacao(item.id)}
                        className="rounded-lg bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors cursor-pointer"
                        title="Excluir Transação"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE NOVA TRANSAÇÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-800 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Nova Transação</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTransacao} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Descrição</label>
                <input 
                  type="text" 
                  placeholder="Ex: Mercadinho, Freelance..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 p-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Valor (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 p-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Categoria</label>
                <input 
                  type="text" 
                  placeholder="Ex: Alimentação, Lazer, Salário..."
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 p-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Tipo de Movimentação</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTipo('entrada')}
                    className={`rounded-lg py-2 text-sm font-semibold cursor-pointer border transition-colors ${
                      tipo === 'entrada' 
                        ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500' 
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-750'
                    }`}
                  >
                    + Entrada
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipo('saida')}
                    className={`rounded-lg py-2 text-sm font-semibold cursor-pointer border transition-colors ${
                      tipo === 'saida' 
                        ? 'bg-rose-600/20 text-rose-400 border-rose-500' 
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-750'
                    }`}
                  >
                    - Saída
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 cursor-pointer transition-colors"
                >
                  Salvar Transação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}