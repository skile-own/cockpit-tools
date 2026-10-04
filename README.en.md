# polls

A desktop account panel for ChatGPT/Codex, Antigravity and ZCode. Based on [Cockpit Tools](https://github.com/jlcodes99/cockpit-tools) by jlcodes99.

The app retains account import, switching, quota views and instance management where supported by each integration. ChatGPT accounts are handled through the existing Codex integration. Supported sections include Codex API Service and Antigravity IDE.

The polls rebrand uses monochrome icons. A broader UI redesign is deferred. Other platforms are excluded from navigation, settings and background refresh; legacy internal formats remain for compatibility.

## Development

Install Node.js, Rust and Go (for the proxy engine), then run:

```sh
npm ci
npm run tauri:dev
```

Validation: `npm test`, `npm run test:release`, `npm run build`.

[Русский](README.md) · [Inherited documentation](docs/)
