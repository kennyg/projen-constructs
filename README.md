# Projen Constructs

Reusable [projen](https://projen.io/) constructs for modern TypeScript monorepos.

## Features

- **pnpm workspaces** - Efficient dependency management with workspace protocol
- **NX** - Build orchestration with caching and affected commands
- **ESM-first** - Native ES modules, no CommonJS legacy
- **Vitest** - Fast, ESM-native testing
- **oxlint** - Rust-powered linting (50-100x faster than ESLint)
- **Bun** - Fast TypeScript execution for projenrc

## Quick Start

### Installation

```bash
pnpm add -D "github:kennyg/projen-constructs#path:packages/projen-constructs"
```

### Usage

```typescript
import { typescript, javascript } from 'projen';
import { PnpmWorkspace, Nx, Vitest, Oxlint, VscodeSettings } from '@kennyg/projen-constructs';

const project = new typescript.TypeScriptProject({
  name: 'my-monorepo',
  defaultReleaseBranch: 'main',
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,
});

// Add monorepo tooling
new PnpmWorkspace(project);
new Nx(project);
new VscodeSettings(project);

// Create a subproject with modern tooling
const myLib = new typescript.TypeScriptProject({
  parent: project,
  outdir: 'packages/my-lib',
  name: '@my-scope/my-lib',
  // ...
});

new Vitest(myLib);
new Oxlint(myLib);

project.synth();
```

## Available Constructs

| Construct | Description |
|-----------|-------------|
| `PnpmWorkspace` | Generates `pnpm-workspace.yaml` from subprojects |
| `Nx` | Configures NX for build orchestration and caching |
| `Vitest` | Adds Vitest testing with coverage support |
| `Oxlint` | Adds oxlint linting with auto-fix |
| `VscodeSettings` | Configures VS Code for monorepo development |

## Repository Structure

```
projen-constructs/
├── packages/
│   └── projen-constructs/    # The publishable construct library
├── examples/
│   ├── shared-lib/           # Example shared library
│   └── app-a/                # Example app using shared-lib
├── projenrc/
│   └── mise.ts               # Local components (not yet published)
└── docs/
    └── architecture.md       # Detailed architecture documentation
```

## Development

```bash
# Install dependencies
pnpm install

# Regenerate project files
bun .projenrc.ts

# Build all packages
pnpm nx run-many -t build

# Test all packages
pnpm nx run-many -t test

# Lint all packages
pnpm nx run-many -t lint
```

## Documentation

See [docs/architecture.md](docs/architecture.md) for detailed information about:

- Design decisions and rationale
- How each construct works
- Adding new packages to the monorepo
- Tool version management with mise

## License

Apache-2.0