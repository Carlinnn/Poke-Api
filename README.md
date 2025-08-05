# Pokédex Next.js

Uma Pokédex moderna e responsiva construída com Next.js, React e Bootstrap. O projeto consome dados da PokéAPI e traz informações completas sobre cada Pokémon, incluindo evoluções, moves, stats, itens, favoritos e muito mais.

## Funcionalidades

- Busca por nome ou número do Pokémon
- Autocomplete na barra de busca
- Exibição de informações detalhadas: stats, habilidades, moves, itens, formas, game indices
- Sistema de favoritos com modal
- Cadeia de evolução interativa
- Dark mode e light mode alternáveis
- Layout responsivo e acessível
- Notificações (toasts) para ações do usuário
- Animações de transição
- Testes unitários para serviços

## Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [PokéAPI](https://pokeapi.co/)
- [Jest](https://jestjs.io/) e [Testing Library](https://testing-library.com/) para testes

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Como rodar os testes

```bash
npm test
```

## Estrutura de pastas

- `components/` — Componentes React reutilizáveis
- `models/` — Modelos de dados
- `pages/` — Páginas Next.js
- `services/` — Funções de integração com a PokéAPI
- `styles/` — Arquivos CSS globais e animações

## Personalização

- Para alterar o tema, edite os estilos em `styles/globals.css`.
- Para adicionar novas funcionalidades, crie componentes em `components/` e integre nas páginas.

## Licença

Projeto open-source para fins de estudo e demonstração.