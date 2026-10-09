import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meu Financeiro</h1>
          <p className="text-sm text-gray-500">Visão geral do seu patrimônio e transações</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors">
          + Nova Transação
        </button>
      </header>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card Saldo Total */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Saldo Total</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">R$ 5.420,00</h2>
          <span className="mt-2 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            Atualizado hoje
          </span>
        </div>

        {/* Card Entradas */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Entradas no Mês</p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-600">+ R$ 7.500,00</h2>
          <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            + 12% em relação ao mês anterior
          </span>
        </div>

        {/* Card Saídas */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Saídas no Mês</p>
          <h2 className="mt-2 text-3xl font-bold text-rose-600">- R$ 2.080,00</h2>
          <span className="mt-2 inline-block rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800">
            Dentro da meta prevista
          </span>
        </div>
      </div>
    </div>
  )
}