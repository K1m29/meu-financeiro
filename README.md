# 💰 Meu Financeiro

Aplicação web para gerenciamento de finanças pessoais desenvolvida com React e Tailwind CSS. O projeto permite acompanhar saldo, receita e despesas em tempo real com visualização gráfica e suporte a exportação de relatórios.

---

## 🚀 Funcionalidades

- **Dashboard Financeiro**: Visualização dinâmica do Saldo Total, Entradas e Saídas do mês.
- **Gráfico Dinâmico**: Distribuição de despesas agrupadas por categoria utilizando a biblioteca Recharts.
- **Gestão de Transações**:
  - Adição de novos lançamentos via modal responsivo.
  - Exclusão de transações com atualização automática dos saldos.
  - Busca por descrição/categoria e filtros por tipo (Todas, Entradas e Saídas).
- **Persistência Local**: Todos os dados são salvos no `localStorage` do navegador.
- **Relatório CSV**: Exportação do extrato financeiro filtrado em formato `.csv`.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**: Biblioteca para construção de interfaces.
- **Vite 6**: Bundler e ambiente de desenvolvimento ultra-rápido.
- **Tailwind CSS v4**: Estilização moderna baseada em utilitários (*Dark Mode*).
- **Recharts**: Biblioteca para renderização de gráficos em SVG.

---

## 🔧 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/K1m29/meu-financeiro.git](https://github.com/K1m29/meu-financeiro.git)