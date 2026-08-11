# Sriteja Valaboju Portfolio

This repository contains the portfolio site and a separate, local-only job-application MCP server.

## Job Apply Profile MCP

[`job-apply-mcp`](./job-apply-mcp) provides structured tools for job discovery plans, listing ingestion, fit scoring, tailored application drafts, and review-gated approval records. It keeps protected data out of the public profile and never submits an application itself.

See the [MCP setup guide](./job-apply-mcp/README.md) for installation, local encryption, and client configuration.

## Portfolio site

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
