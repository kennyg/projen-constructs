# Projen Constructs Architecture

This document explains the architecture of this monorepo and the reasoning behind our tooling choices.

## Overview

This repository provides reusable [projen](https://projen.io/) constructs for setting up modern TypeScript monorepos. The constructs are designed to work together to provide a cohesive developer experience.

## Repository Structure

```
projen-constructs/
├── .projenrc.ts              # Main projen configuration (uses Bun)
├── packages/
│   └── projen-constructs/    # Publishable construct library
├── examples/
│   ├── shared-lib/           # Example shared library
│   └── app-a/                # Example app consuming shared-lib
└── projenrc/
    └── mise.ts               # Local components (not yet published)
```

## Design Decisions

### Why Projen?

Projen manages project configuration as code. Instead of manually maintaining `package.json`, `tsconfig.json`, and other config files, you define your project structure in `.projenrc.ts` and projen generates everything. This provides:

- **Consistency**: All projects follow the same patterns
- **Maintainability**: Update configurations in one place
- **Reproducibility**: Configuration is version-controlled code

### Why pnpm Workspaces?

We chose pnpm over npm/yarn for several reasons:

1. **Disk efficiency**: pnpm uses a content-addressable store, so shared dependencies are stored once
2. **Strict dependency resolution**: Prevents phantom dependencies (using packages you didn't declare)
3. **Fast**: Parallel installation and efficient caching
4. **Workspace protocol**: `workspace:*` ensures local packages always use the workspace version

### Why NX?

NX provides build orchestration for the monorepo:

1. **Dependency-aware builds**: Builds packages in the correct order based on dependencies
2. **Caching**: Skips unchanged packages, dramatically speeding up CI
3. **Affected commands**: Only run tasks for packages affected by your changes
4. **Parallel execution**: Runs independent tasks concurrently

### Why ESM-First?

CommonJS (CJS) is legacy. ESM (ECMAScript Modules) is the standard:

1. **Native browser support**: ESM works in browsers without bundling
2. **Better tree-shaking**: Static imports enable dead code elimination
3. **Top-level await**: Only available in ESM
4. **Future-proof**: Node.js and the ecosystem are moving to ESM

Our TypeScript configuration uses:
```typescript
{
  module: 'NodeNext',
  moduleResolution: 'NodeNext',
  target: 'ES2022'
}
```

### Why Vitest over Jest?

Jest was designed for CommonJS and requires significant configuration for ESM:

1. **Native ESM**: Vitest is built for ESM from the ground up
2. **Speed**: Uses Vite's transformation pipeline, significantly faster
3. **Compatible API**: Same `describe`/`it`/`expect` patterns as Jest
4. **TypeScript**: Works with TypeScript without additional config

### Why oxlint over ESLint?

ESLint is powerful but slow. oxlint is a Rust-based linter:

1. **Speed**: 50-100x faster than ESLint
2. **Zero config**: Sensible defaults out of the box
3. **Drop-in replacement**: Covers most common ESLint rules
4. **Growing ecosystem**: Active development, adding more rules

Note: For complex custom rules, you may still need ESLint. oxlint covers ~80% of use cases.

### Why Bun for Projenrc?

The `.projenrc.ts` file needs to be executed to generate configs. Options:

- **ts-node**: Slow startup, CommonJS-focused
- **tsx**: Fast, but another dependency
- **Bun**: Native TypeScript execution, extremely fast, no config

We use Bun only for running projenrc, not as the package manager (pnpm handles that).

## The Constructs

### PnpmWorkspace

Generates `pnpm-workspace.yaml` by discovering all subprojects:

```typescript
new PnpmWorkspace(project);
```

This automatically includes all child projects in the workspace configuration.

### Nx

Configures NX for build orchestration:

```typescript
new Nx(project);
```

Generates `nx.json` with:
- Task pipeline (build depends on dependencies' builds)
- Caching configuration
- Affected command defaults

### Vitest

Adds Vitest testing to a project:

```typescript
new Vitest(project);
```

Provides:
- `test` task running `vitest run`
- `test:watch` for development
- `test:coverage` with v8 coverage
- Sensible default configuration

### Oxlint

Adds oxlint linting to a project:

```typescript
new Oxlint(project);
```

Provides:
- `lint` task for checking
- `lint:fix` for auto-fixing
- Default configuration file

### VscodeSettings

Configures VS Code for monorepo development:

```typescript
new VscodeSettings(project);
```

Sets up:
- TypeScript SDK from node_modules
- Recommended extensions
- Workspace-aware settings

## Usage

### In This Repository

The constructs are imported from the local package:

```typescript
import { PnpmWorkspace, Nx, Vitest, Oxlint } from './packages/projen-constructs/src/index.js';
```

### In Other Repositories

Install from GitHub:

```bash
pnpm add -D "github:kennyg/projen-constructs#path:packages/projen-constructs"
```

Then import:

```typescript
import { PnpmWorkspace, Nx, Vitest, Oxlint } from '@kennyg/projen-constructs';
```

## Local Development

```bash
# Install dependencies
pnpm install

# Run projen to regenerate configs
bun .projenrc.ts

# Build all packages
pnpm nx run-many -t build

# Test all packages
pnpm nx run-many -t test

# Lint all packages
pnpm nx run-many -t lint
```

## Adding New Packages

1. Add the subproject in `.projenrc.ts`:

```typescript
const myPackage = new typescript.TypeScriptProject({
  parent: project,
  outdir: 'packages/my-package',
  name: `${SCOPE}/my-package`,
  // ... other options
});

configureSubproject(myPackage);
```

2. Run projen:

```bash
bun .projenrc.ts
```

3. Install dependencies:

```bash
pnpm install
```

## Tool Version Management

We use [mise](https://mise.jdx.dev/) for managing tool versions (Node.js, pnpm, Bun). The `.mise.toml` file is generated by the `Mise` component in `projenrc/mise.ts`.

To use:

```bash
# Trust the config (first time only)
mise trust

# Install tools
mise install

# Tools are now available
node --version
pnpm --version
bun --version
```
