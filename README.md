# Clicksign Project Manager - Lucas Becker

Este projeto é uma aplicação web desenvolvida para gerenciamento de projetos, construída com foco em performance, escalabilidade e boas práticas de front-end.

## Tecnologias Utilizadas

- **Next.js 16**: Framework React com suporte a renderização híbrida (SSR/SSG) e App Router.
- **React 19**: Biblioteca para construção de interfaces declarativas e componentizadas.
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade do código.
- **Zustand**: Gerenciamento de estado global simples e eficiente.
- **React Hook Form + Zod**: Criação e validação de formulários de forma performática e tipada.
- **Tailwind CSS**: Estilização utilitária com foco em produtividade e consistência visual.
- **Jest + Testing Library**: Testes automatizados para garantir confiabilidade da aplicação.
- **ESLint**: Padronização e qualidade de código.

## Visão Geral da Arquitetura

O projeto segue uma abordagem modular e desacoplada, priorizando:
- Componentes reutilizáveis.
- Separação clara de responsabilidades.
- Validação de dados baseada em schema.
- Estado global centralizado apenas quando necessário.

## Scripts Principais

- **dev**: Executa o projeto em ambiente de desenvolvimento.
- **build**: Gera a build de produção.
- **start**: Inicia a aplicação em produção.
- **lint**: Executa a análise estática de código.
- **test**: Executa a suíte de testes.
- **test:watch**: Executa testes em modo observação.