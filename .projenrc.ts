import { typescript, javascript } from 'projen';
import { TypeScriptModuleResolution } from 'projen/lib/javascript';

// Import from the workspace package (after first build)
// For bootstrapping a new repo, use: github:kennyg/projen-constructs#path:packages/projen-constructs
import { PnpmWorkspace, Nx, VscodeSettings, Vitest, Oxlint } from './packages/projen-constructs/src/index.js';

// Local components (not yet in published package)
import { Mise } from './projenrc/mise';

// ============================================
// Configuration
// ============================================

const SCOPE = '@kennyg';
const GITHUB_USER = 'kennyg';

// Root monorepo project (not published - just the workspace container)
const project = new typescript.TypeScriptProject({
  name: 'projen-constructs',  // No scope - this is just the repo name
  defaultReleaseBranch: 'main',
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,
  minNodeVersion: '20.0.0',

  // Disable root-level tooling (handled per-package or via NX)
  jest: false,
  eslint: false,
  sampleCode: false,

  // GitHub Actions for CI (no releases)
  githubOptions: {
    mergify: false,
    pullRequestLint: false,
  },
  buildWorkflow: true,
  buildWorkflowOptions: {
    mutableBuild: false,  // Don't auto-commit mutations
    preBuildSteps: [
      { name: 'Setup Bun', uses: 'oven-sh/setup-bun@v2' },
    ],
  },
  pullRequestTemplate: false,
  depsUpgrade: false,

  // Disable npm publishing (no npm account)
  release: false,
  releaseToNpm: false,

  // pnpm settings
  pnpmVersion: '9',

  devDeps: [
    'projen',
    '@types/node',
  ],
});

// Use Bun to run projenrc (faster, native ESM/TS support)
project.defaultTask?.reset('bun .projenrc.ts');
project.tasks.tryFind('projen')?.reset('bun .projenrc.ts');

// Ignore local cache and settings
project.gitignore.exclude('.nx/', '.claude/');

// Override build/test tasks to use NX for all packages
project.compileTask.reset('pnpm nx run-many -t compile');
project.testTask.reset('pnpm nx run-many -t test');

// Add lint task using NX
project.addTask('lint', {
  description: 'Lint all packages',
  exec: 'pnpm nx run-many -t lint',
});

// Customize build workflow
const buildWorkflow = project.github?.tryFindWorkflow('build');

// Trigger on push to main, PRs, and manual dispatch
buildWorkflow?.on({
  push: { branches: ['main'] },
  pullRequest: {},
  workflowDispatch: {},
});


// Run lint after compile (as part of post-compile)
project.postCompileTask.spawn(project.tasks.tryFind('lint')!);

// ============================================
// ESM + Modern Tooling Configuration
// ============================================

// ESM-first TypeScript configuration
const esmTsConfig = {
  compilerOptions: {
    module: 'NodeNext',
    moduleResolution: TypeScriptModuleResolution.NODE_NEXT,
    target: 'ES2022',
    skipLibCheck: true,
    types: ['node'],
    declaration: true,
    declarationMap: true,
  },
};

// Helper to configure a subproject with modern tooling
function configureSubproject(subproject: typescript.TypeScriptProject) {
  subproject.tasks.tryFind('install')?.reset('echo "Install handled by workspace root"');
  subproject.package.addField('type', 'module');
  new Vitest(subproject);
  new Oxlint(subproject);
}

// ============================================
// Projen Constructs Package (publishable)
// ============================================

const projenConstructs = new typescript.TypeScriptProject({
  parent: project,
  outdir: 'packages/projen-constructs',
  name: `${SCOPE}/projen-constructs`,
  description: 'Modern projen components: ESM, Vitest, oxlint, NX, pnpm workspaces',
  defaultReleaseBranch: 'main',
  packageManager: javascript.NodePackageManager.PNPM,
  github: false,
  sampleCode: false,
  jest: false,
  eslint: false,
  release: false,
  releaseToNpm: false,
  tsconfig: esmTsConfig,
  tsconfigDev: esmTsConfig,

  // projen is a peer dep - users bring their own version
  peerDeps: ['projen@>=0.91.0', 'constructs@^10.0.0'],
  peerDependencyOptions: {
    pinnedDevDependency: true,
  },

  // Repository info for GitHub references
  repository: `https://github.com/${GITHUB_USER}/projen-constructs.git`,
});

// Configure but skip Vitest/Oxlint for the constructs package itself
projenConstructs.tasks.tryFind('install')?.reset('echo "Install handled by workspace root"');
projenConstructs.package.addField('type', 'module');

// Include lib/ in git for GitHub-based installation (no npm publish)
projenConstructs.gitignore.include('/lib/');

// ============================================
// Examples (demos showing how to use the constructs)
// ============================================

const sharedLib = new typescript.TypeScriptProject({
  parent: project,
  outdir: 'examples/shared-lib',
  name: `${SCOPE}/example-shared-lib`,
  defaultReleaseBranch: 'main',
  packageManager: javascript.NodePackageManager.PNPM,
  github: false,
  sampleCode: false,
  jest: false,
  eslint: false,
  release: false,
  tsconfig: esmTsConfig,
  tsconfigDev: esmTsConfig,
});

configureSubproject(sharedLib);

const appA = new typescript.TypeScriptProject({
  parent: project,
  outdir: 'examples/app-a',
  name: `${SCOPE}/example-app-a`,
  defaultReleaseBranch: 'main',
  packageManager: javascript.NodePackageManager.PNPM,
  github: false,
  sampleCode: false,
  jest: false,
  eslint: false,
  release: false,
  tsconfig: esmTsConfig,
  tsconfigDev: esmTsConfig,
  deps: [`${SCOPE}/example-shared-lib@workspace:*`],
});

configureSubproject(appA);

// ============================================
// Monorepo Components
// ============================================

new PnpmWorkspace(project);
new Nx(project);
new VscodeSettings(project);

// Tool version management with mise
new Mise(project, {
  nodeVersion: '22',
  bunVersion: 'latest',
  pnpmVersion: '9',
});

// ============================================
// Synthesize
// ============================================
project.synth();
