# Projeto Full Stack de Consulta a API News https://newsapi.org/

## Como executar
- `docker compose up`
- API: http://localhost:3001/api/articles
- FRONT: http://localhost:8080

Foram aplicados conceitos de Clean Architeture, Clean Code, e alguns Design Patterns como Adapter e Factories.
As camadas da aplicação estão desacopladas uma das outras, dessa forma fica fácil trocar do Express para outro Framework, bastando criar um novo Adpater para esse Framework.