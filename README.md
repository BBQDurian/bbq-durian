# DealMaker

AI-powered sales intelligence platform that turns sales conversations into signed contracts.

## What it does

DealMaker helps sales teams move faster. Upload a sales call transcript, and DealMaker's AI agents extract deal intent, build proposals, generate contracts, and route them through business approval — all automatically.

### For Sales
- Upload or paste a sales conversation
- AI extracts key details: client name, deal value, decision maker, contact info
- Multi-agent pipeline drafts a proposal email and prepares the contract
- Submit to Business Review with one click

### For Business Admin
- Review incoming proposals from the sales team
- AI evaluates risk, profitability, and compliance
- Approve, reject, or request revisions
- Signed contracts are recorded with document hashing

## Architecture

```
User → Browser → Cloudflare Worker (dealmaker.bbq-durian.workers.dev)

                         │
            ┌────────────┴────────────┐
            │                         │
    Static Assets              API Routes
    (React SPA)                (/api/*)
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
              Auth (cookies)      Deals CRUD          AI Agents
                                                   ┌──────┴──────┐
                                              Sales Graph   Business Graph
                                              (parse →      (parse →
                                               enrich →      evaluate →
                                               construct →   judge)
                                               validate)
                                                    │
                                            Featherless LLM
                                            + Band.ai Rooms
                                                    │
                                              D1 Database
                                         (deals, evaluations,
                                          events, signatures)
```

## Key integrations

| Service | Role |
|---|---|
| **Featherless** | LLM inference for all AI agent reasoning |
| **Band.ai** | Multi-agent chat rooms with @mention collaboration |
| **D1** | Relational database for deals, evaluations, events |

## Tech stack

- **Frontend**: React 19, React Router 6, Vite 6, TypeScript
- **Backend**: Cloudflare Workers
- **AI**: Multi-agent graph pipeline (Featherless LLM + Band)
- **Storage**: D1 (SQLite on Cloudflare)
