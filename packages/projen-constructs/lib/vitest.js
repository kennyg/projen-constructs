import { Component, JsonFile } from 'projen';
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
    constructor(project, options = {}) {
        super(project);
        const coverage = options.coverage ?? true;
        const coverageProvider = options.coverageProvider ?? 'v8';
        // Add Vitest dependencies
        project.addDevDeps('vitest@^3', '@vitest/coverage-v8@^3');
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
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ZpdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBYyxNQUFNLFFBQVEsQ0FBQztBQWdCekQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLE9BQU8sTUFBTyxTQUFRLFNBQVM7SUFDbkMsWUFDRSxPQUFxQyxFQUNyQyxVQUF5QixFQUFFO1FBRTNCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1FBQzFDLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQztRQUUxRCwwQkFBMEI7UUFDMUIsT0FBTyxDQUFDLFVBQVUsQ0FDaEIsV0FBVyxFQUNYLHdCQUF3QixDQUN6QixDQUFDO1FBRUYsNEJBQTRCO1FBQzVCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRTtZQUMxQyxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxJQUFJO29CQUNiLFdBQVcsRUFBRSxNQUFNO29CQUNuQixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQztvQkFDbEQsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7d0JBQzFCLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQzt3QkFDMUMsZ0JBQWdCLEVBQUUsVUFBVTtxQkFDN0IsQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDZDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUNBQWlDO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixRQUFRLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDakQsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDdEIsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsSUFBSSxFQUFFLDhCQUE4QjthQUNyQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsc0JBQXNCO1FBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQzVCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDLENBQUM7UUFFSCx5QkFBeUI7UUFDekIsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO2dCQUMvQixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxJQUFJLEVBQUUsdUJBQXVCO2FBQzlCLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEpzb25GaWxlLCB0eXBlc2NyaXB0IH0gZnJvbSAncHJvamVuJztcblxuZXhwb3J0IGludGVyZmFjZSBWaXRlc3RPcHRpb25zIHtcbiAgLyoqXG4gICAqIEVuYWJsZSBjb3ZlcmFnZSByZXBvcnRpbmcuXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHJlYWRvbmx5IGNvdmVyYWdlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ292ZXJhZ2UgcHJvdmlkZXIuXG4gICAqIEBkZWZhdWx0ICd2OCdcbiAgICovXG4gIHJlYWRvbmx5IGNvdmVyYWdlUHJvdmlkZXI/OiAndjgnIHwgJ2lzdGFuYnVsJztcbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIFZpdGVzdCBmb3IgZmFzdCwgRVNNLW5hdGl2ZSB0ZXN0aW5nLlxuICpcbiAqIFZpdGVzdCBwcm92aWRlczpcbiAqIC0gTmF0aXZlIEVTTSBzdXBwb3J0XG4gKiAtIEZhc3QgZXhlY3V0aW9uIHdpdGggVml0ZSdzIHRyYW5zZm9ybSBwaXBlbGluZVxuICogLSBKZXN0LWNvbXBhdGlibGUgQVBJXG4gKiAtIEJ1aWx0LWluIFR5cGVTY3JpcHQgc3VwcG9ydFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogbmV3IFZpdGVzdChwcm9qZWN0LCB7XG4gKiAgIGNvdmVyYWdlOiB0cnVlLFxuICogICBjb3ZlcmFnZVByb3ZpZGVyOiAndjgnLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFZpdGVzdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb2plY3Q6IHR5cGVzY3JpcHQuVHlwZVNjcmlwdFByb2plY3QsXG4gICAgb3B0aW9uczogVml0ZXN0T3B0aW9ucyA9IHt9XG4gICkge1xuICAgIHN1cGVyKHByb2plY3QpO1xuXG4gICAgY29uc3QgY292ZXJhZ2UgPSBvcHRpb25zLmNvdmVyYWdlID8/IHRydWU7XG4gICAgY29uc3QgY292ZXJhZ2VQcm92aWRlciA9IG9wdGlvbnMuY292ZXJhZ2VQcm92aWRlciA/PyAndjgnO1xuXG4gICAgLy8gQWRkIFZpdGVzdCBkZXBlbmRlbmNpZXNcbiAgICBwcm9qZWN0LmFkZERldkRlcHMoXG4gICAgICAndml0ZXN0QF4zJyxcbiAgICAgICdAdml0ZXN0L2NvdmVyYWdlLXY4QF4zJyxcbiAgICApO1xuXG4gICAgLy8gQ3JlYXRlIHZpdGVzdC5jb25maWcuanNvblxuICAgIG5ldyBKc29uRmlsZShwcm9qZWN0LCAndml0ZXN0LmNvbmZpZy5qc29uJywge1xuICAgICAgb2JqOiB7XG4gICAgICAgIHRlc3Q6IHtcbiAgICAgICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgICAgIGVudmlyb25tZW50OiAnbm9kZScsXG4gICAgICAgICAgaW5jbHVkZTogWydzcmMvKiovKi50ZXN0LnRzJywgJ3Rlc3QvKiovKi50ZXN0LnRzJ10sXG4gICAgICAgICAgY292ZXJhZ2U6IGNvdmVyYWdlID8ge1xuICAgICAgICAgICAgcHJvdmlkZXI6IGNvdmVyYWdlUHJvdmlkZXIsXG4gICAgICAgICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24nLCAnaHRtbCcsICdsY292J10sXG4gICAgICAgICAgICByZXBvcnRzRGlyZWN0b3J5OiAnY292ZXJhZ2UnLFxuICAgICAgICAgIH0gOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRlc3QgdGFzayB0byB1c2Ugdml0ZXN0XG4gICAgY29uc3QgdGVzdFRhc2sgPSBwcm9qZWN0LnRhc2tzLnRyeUZpbmQoJ3Rlc3QnKTtcbiAgICBpZiAodGVzdFRhc2spIHtcbiAgICAgIHRlc3RUYXNrLnJlc2V0KCd2aXRlc3QgcnVuIC0tcGFzc1dpdGhOb1Rlc3RzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3QuYWRkVGFzaygndGVzdCcsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdSdW4gdGVzdHMgd2l0aCBWaXRlc3QnLFxuICAgICAgICBleGVjOiAndml0ZXN0IHJ1biAtLXBhc3NXaXRoTm9UZXN0cycsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGVzdDp3YXRjaCB0YXNrXG4gICAgcHJvamVjdC5hZGRUYXNrKCd0ZXN0OndhdGNoJywge1xuICAgICAgZGVzY3JpcHRpb246ICdSdW4gdGVzdHMgaW4gd2F0Y2ggbW9kZScsXG4gICAgICBleGVjOiAndml0ZXN0JyxcbiAgICB9KTtcblxuICAgIC8vIEFkZCB0ZXN0OmNvdmVyYWdlIHRhc2tcbiAgICBpZiAoY292ZXJhZ2UpIHtcbiAgICAgIHByb2plY3QuYWRkVGFzaygndGVzdDpjb3ZlcmFnZScsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdSdW4gdGVzdHMgd2l0aCBjb3ZlcmFnZScsXG4gICAgICAgIGV4ZWM6ICd2aXRlc3QgcnVuIC0tY292ZXJhZ2UnLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=