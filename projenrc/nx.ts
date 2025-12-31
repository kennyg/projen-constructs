import { Component, JsonFile, typescript } from 'projen';

export interface NxOptions {
  /**
   * Operations that can be cached by NX.
   * @default ['build', 'test']
   */
  readonly cacheableOperations?: string[];

  /**
   * The default base branch for affected commands.
   * @default 'origin/main'
   */
  readonly defaultBase?: string;
}

/**
 * Configures NX for monorepo build orchestration and caching.
 *
 * NX provides:
 * - Intelligent build caching (skip unchanged packages)
 * - Dependency-aware task execution
 * - `nx affected` commands for CI optimization
 */
export class Nx extends Component {
  constructor(
    rootProject: typescript.TypeScriptProject,
    options: NxOptions = {}
  ) {
    super(rootProject);

    const cacheableOperations = options.cacheableOperations ?? ['build', 'test'];
    const defaultBase = options.defaultBase ?? 'origin/main';

    // Add NX dependency - just the core package, others are optional
    rootProject.addDevDeps('nx@^20');

    // Generate nx.json configuration
    new JsonFile(rootProject, 'nx.json', {
      obj: {
        $schema: './node_modules/nx/schemas/nx-schema.json',
        extends: 'nx/presets/npm.json',

        // Task runner configuration
        tasksRunnerOptions: {
          default: {
            runner: 'nx/tasks-runners/default',
            options: {
              cacheableOperations,
            },
          },
        },

        // Target defaults
        targetDefaults: {
          build: {
            // Build dependencies before this package
            dependsOn: ['^build'],

            // Files that affect cache validity (exclude outputs)
            inputs: [
              '!{projectRoot}/test-reports/**/*',
              '!{projectRoot}/coverage/**/*',
              '!{projectRoot}/build/**/*',
              '!{projectRoot}/dist/**/*',
              '!{projectRoot}/lib/**/*',
              '!{projectRoot}/cdk.out/**/*',
            ],

            // Build output locations (for cache restoration)
            outputs: [
              '{projectRoot}/dist',
              '{projectRoot}/lib',
              '{projectRoot}/cdk.out',
            ],
          },
          test: {
            dependsOn: ['build'],
            inputs: [
              '!{projectRoot}/coverage/**/*',
              '!{projectRoot}/test-reports/**/*',
            ],
            outputs: [
              '{projectRoot}/coverage',
              '{projectRoot}/test-reports',
            ],
          },
          deploy: {
            dependsOn: ['build'],
          },
        },

        // Affected command configuration
        affected: {
          defaultBase,
        },
      },
    });
  }
}
