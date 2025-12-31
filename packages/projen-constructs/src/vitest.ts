import { Component, JsonFile, typescript } from 'projen';

export interface VitestOptions {
  /**
   * Enable coverage reporting.
   * @default true
   */
  readonly coverage?: boolean;

  /**
   * Coverage provider.
   * @default 'v8'
   */
  readonly coverageProvider?: 'v8' | 'istanbul';
}

/**
 * Configures Vitest for fast, ESM-native testing.
 *
 * Vitest provides:
 * - Native ESM support
 * - Fast execution with Vite's transform pipeline
 * - Jest-compatible API
 * - Built-in TypeScript support
 *
 * @example
 * ```ts
 * new Vitest(project, {
 *   coverage: true,
 *   coverageProvider: 'v8',
 * });
 * ```
 */
export class Vitest extends Component {
  constructor(
    project: typescript.TypeScriptProject,
    options: VitestOptions = {}
  ) {
    super(project);

    const coverage = options.coverage ?? true;
    const coverageProvider = options.coverageProvider ?? 'v8';

    // Add Vitest dependencies
    project.addDevDeps(
      'vitest@^3',
      '@vitest/coverage-v8@^3',
    );

    // Create vitest.config.json
    new JsonFile(project, 'vitest.config.json', {
      obj: {
        test: {
          globals: true,
          environment: 'node',
          include: ['src/**/*.test.ts', 'test/**/*.test.ts'],
          coverage: coverage ? {
            provider: coverageProvider,
            reporter: ['text', 'json', 'html', 'lcov'],
            reportsDirectory: 'coverage',
          } : undefined,
        },
      },
    });

    // Update test task to use vitest
    const testTask = project.tasks.tryFind('test');
    if (testTask) {
      testTask.reset('vitest run --passWithNoTests');
    } else {
      project.addTask('test', {
        description: 'Run tests with Vitest',
        exec: 'vitest run --passWithNoTests',
      });
    }

    // Add test:watch task
    project.addTask('test:watch', {
      description: 'Run tests in watch mode',
      exec: 'vitest',
    });

    // Add test:coverage task
    if (coverage) {
      project.addTask('test:coverage', {
        description: 'Run tests with coverage',
        exec: 'vitest run --coverage',
      });
    }
  }
}
