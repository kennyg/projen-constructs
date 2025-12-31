import { Component, TomlFile, Project } from 'projen';

export interface MiseOptions {
  /**
   * Node.js version to use.
   * @default 'lts'
   */
  readonly nodeVersion?: string;

  /**
   * pnpm version to use.
   * @default 'latest'
   */
  readonly pnpmVersion?: string;

  /**
   * Bun version to use.
   * @default 'latest'
   */
  readonly bunVersion?: string;

  /**
   * Additional tools to include.
   * @example { 'python': '3.12', 'go': 'latest' }
   */
  readonly tools?: Record<string, string>;
}

/**
 * Configures mise (formerly rtx) for tool version management.
 *
 * mise provides:
 * - Polyglot version management (node, python, go, rust, etc.)
 * - Fast Rust implementation
 * - Compatible with .tool-versions (asdf)
 * - Environment variable management
 *
 * @see https://mise.jdx.dev/
 *
 * @example
 * ```ts
 * new Mise(project, {
 *   nodeVersion: '20',
 *   bunVersion: 'latest',
 *   tools: {
 *     'python': '3.12',
 *   },
 * });
 * ```
 */
export class Mise extends Component {
  constructor(project: Project, options: MiseOptions = {}) {
    super(project);

    const nodeVersion = options.nodeVersion ?? 'lts';
    const pnpmVersion = options.pnpmVersion ?? 'latest';
    const bunVersion = options.bunVersion ?? 'latest';
    const additionalTools = options.tools ?? {};

    // Build tools config
    const tools: Record<string, string> = {
      node: nodeVersion,
      pnpm: pnpmVersion,
      bun: bunVersion,
      ...additionalTools,
    };

    // Create .mise.toml
    new TomlFile(project, '.mise.toml', {
      obj: {
        tools,
        // Environment variables (optional)
        env: {
          // Ensure pnpm uses the workspace
          NPM_CONFIG_PREFER_WORKSPACE_PACKAGES: 'true',
        },
      },
    });

    // Add to .gitignore patterns that mise might create
    project.gitignore?.addPatterns('.mise.local.toml');
  }
}
