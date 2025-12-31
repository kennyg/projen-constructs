import { Component, JsonFile } from 'projen';
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
    constructor(project, options = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3hsaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL294bGludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBYyxNQUFNLFFBQVEsQ0FBQztBQVV6RDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxPQUFPLE1BQU8sU0FBUSxTQUFTO0lBQ25DLFlBQ0UsT0FBcUMsRUFDckMsVUFBeUIsRUFBRTtRQUUzQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFZixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztRQUVoQyx3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoQyx1QkFBdUI7UUFDdkIsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRTtZQUNuQyxHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLGlEQUFpRDtnQkFDMUQsS0FBSyxFQUFFO29CQUNMLGdCQUFnQixFQUFFLE1BQU07b0JBQ3hCLFVBQVUsRUFBRSxPQUFPO29CQUNuQixZQUFZLEVBQUUsTUFBTTtvQkFDcEIsb0NBQW9DLEVBQUUsTUFBTTtpQkFDN0M7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2IsTUFBTTtvQkFDTixRQUFRO2lCQUNUO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxpQkFBaUI7UUFDakIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQzVELE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3RCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsSUFBSSxFQUFFLFdBQVc7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDMUIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxJQUFJLEVBQUUsa0JBQWtCO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSnNvbkZpbGUsIHR5cGVzY3JpcHQgfSBmcm9tICdwcm9qZW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE94bGludE9wdGlvbnMge1xuICAvKipcbiAgICogRW5hYmxlIGF1dG8tZml4IG9uIGxpbnQuXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHJlYWRvbmx5IGZpeD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyBveGxpbnQgZm9yIGZhc3QsIFJ1c3QtcG93ZXJlZCBsaW50aW5nLlxuICpcbiAqIG94bGludCBwcm92aWRlczpcbiAqIC0gNTAtMTAweCBmYXN0ZXIgdGhhbiBFU0xpbnRcbiAqIC0gWmVybyBjb25maWd1cmF0aW9uIG5lZWRlZFxuICogLSBCdWlsdC1pbiBUeXBlU2NyaXB0IHN1cHBvcnRcbiAqIC0gR3Jvd2luZyBydWxlIGNvdmVyYWdlXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBuZXcgT3hsaW50KHByb2plY3QsIHsgZml4OiB0cnVlIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBPeGxpbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm9qZWN0OiB0eXBlc2NyaXB0LlR5cGVTY3JpcHRQcm9qZWN0LFxuICAgIG9wdGlvbnM6IE94bGludE9wdGlvbnMgPSB7fVxuICApIHtcbiAgICBzdXBlcihwcm9qZWN0KTtcblxuICAgIGNvbnN0IGZpeCA9IG9wdGlvbnMuZml4ID8/IHRydWU7XG5cbiAgICAvLyBBZGQgb3hsaW50IGRlcGVuZGVuY3lcbiAgICBwcm9qZWN0LmFkZERldkRlcHMoJ294bGludEBeMScpO1xuXG4gICAgLy8gQ3JlYXRlIG94bGludCBjb25maWdcbiAgICBuZXcgSnNvbkZpbGUocHJvamVjdCwgJ294bGludC5qc29uJywge1xuICAgICAgb2JqOiB7XG4gICAgICAgICRzY2hlbWE6ICcuL25vZGVfbW9kdWxlcy9veGxpbnQvY29uZmlndXJhdGlvbl9zY2hlbWEuanNvbicsXG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgJ25vLXVudXNlZC12YXJzJzogJ3dhcm4nLFxuICAgICAgICAgICduby11bmRlZic6ICdlcnJvcicsXG4gICAgICAgICAgJ25vLWNvbnNvbGUnOiAnd2FybicsXG4gICAgICAgICAgJ0B0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnknOiAnd2FybicsXG4gICAgICAgIH0sXG4gICAgICAgIGlnbm9yZVBhdHRlcm5zOiBbXG4gICAgICAgICAgJ2xpYi8qKicsXG4gICAgICAgICAgJ2Rpc3QvKionLFxuICAgICAgICAgICdub2RlX21vZHVsZXMvKionLFxuICAgICAgICAgICdjb3ZlcmFnZS8qKicsXG4gICAgICAgICAgJyouanMnLFxuICAgICAgICAgICcqLmQudHMnLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBlc2xpbnQgdGFzayBpZiBwcmVzZW50XG4gICAgY29uc3QgbGludFRhc2sgPSBwcm9qZWN0LnRhc2tzLnRyeUZpbmQoJ2VzbGludCcpO1xuICAgIGlmIChsaW50VGFzaykge1xuICAgICAgcHJvamVjdC50YXNrcy5yZW1vdmVUYXNrKCdlc2xpbnQnKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgbGludCB0YXNrc1xuICAgIGNvbnN0IGxpbnRDb21tYW5kID0gZml4ID8gJ294bGludCAtLWZpeCBzcmMnIDogJ294bGludCBzcmMnO1xuICAgIHByb2plY3QuYWRkVGFzaygnbGludCcsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnTGludCB3aXRoIG94bGludCcsXG4gICAgICBleGVjOiBsaW50Q29tbWFuZCxcbiAgICB9KTtcblxuICAgIHByb2plY3QuYWRkVGFzaygnbGludDpmaXgnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0xpbnQgYW5kIGZpeCB3aXRoIG94bGludCcsXG4gICAgICBleGVjOiAnb3hsaW50IC0tZml4IHNyYycsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==