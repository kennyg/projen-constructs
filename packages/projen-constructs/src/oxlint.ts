import { Component, JsonFile, typescript } from 'projen';

export interface OxlintOptions {
  /**
   * Enable auto-fix on lint.
   * @default true
   */
  readonly fix?: boolean;
}

/**
 * Configures oxlint for fast, Rust-powered linting.
 *
 * oxlint provides:
 * - 50-100x faster than ESLint
 * - Zero configuration needed
 * - Built-in TypeScript support
 * - Growing rule coverage
 *
 * @example
 * ```ts
 * new Oxlint(project, { fix: true });
 * ```
 */
export class Oxlint extends Component {
  constructor(
    project: typescript.TypeScriptProject,
    options: OxlintOptions = {}
  ) {
    super(project);

    const fix = options.fix ?? true;

    // Add oxlint dependency
    project.addDevDeps('oxlint@^1');

    // Create oxlint config
    new JsonFile(project, 'oxlint.json', {
      obj: {
        $schema: './node_modules/oxlint/configuration_schema.json',
        rules: {
          'no-unused-vars': 'warn',
          'no-undef': 'error',
          'no-console': 'warn',
          '@typescript-eslint/no-explicit-any': 'warn',
        },
        ignorePatterns: [
          'lib/**',
          'dist/**',
          'node_modules/**',
          'coverage/**',
          '*.js',
          '*.d.ts',
        ],
      },
    });

    // Remove eslint task if present
    const lintTask = project.tasks.tryFind('eslint');
    if (lintTask) {
      project.tasks.removeTask('eslint');
    }

    // Add lint tasks
    const lintCommand = fix ? 'oxlint --fix src' : 'oxlint src';
    project.addTask('lint', {
      description: 'Lint with oxlint',
      exec: lintCommand,
    });

    project.addTask('lint:fix', {
      description: 'Lint and fix with oxlint',
      exec: 'oxlint --fix src',
    });
  }
}
