import { Component, JsonFile } from 'projen';
/**
 * Configures NX for monorepo build orchestration and caching.
 *
 * NX provides:
 * - Intelligent build caching (skip unchanged packages)
 * - Dependency-aware task execution
 * - `nx affected` commands for CI optimization
 *
 * @example
 * ```ts
 * new Nx(project, {
 *   cacheableOperations: ['build', 'test', 'lint'],
 * });
 * ```
 */
export class Nx extends Component {
    constructor(rootProject, options = {}) {
        super(rootProject);
        const cacheableOperations = options.cacheableOperations ?? ['build', 'test'];
        const defaultBase = options.defaultBase ?? 'origin/main';
        // Add NX dependency
        rootProject.addDevDeps('nx@^20');
        // Generate nx.json configuration
        new JsonFile(rootProject, 'nx.json', {
            obj: {
                $schema: './node_modules/nx/schemas/nx-schema.json',
                extends: 'nx/presets/npm.json',
                tasksRunnerOptions: {
                    default: {
                        runner: 'nx/tasks-runners/default',
                        options: {
                            cacheableOperations,
                        },
                    },
                },
                targetDefaults: {
                    compile: {
                        dependsOn: ['^compile'],
                        inputs: [
                            '!{projectRoot}/lib/**/*',
                        ],
                        outputs: [
                            '{projectRoot}/lib',
                        ],
                    },
                    build: {
                        dependsOn: ['^build'],
                        inputs: [
                            '!{projectRoot}/test-reports/**/*',
                            '!{projectRoot}/coverage/**/*',
                            '!{projectRoot}/build/**/*',
                            '!{projectRoot}/dist/**/*',
                            '!{projectRoot}/lib/**/*',
                            '!{projectRoot}/cdk.out/**/*',
                        ],
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
                affected: {
                    defaultBase,
                },
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbngudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQWMsTUFBTSxRQUFRLENBQUM7QUFnQnpEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxPQUFPLEVBQUcsU0FBUSxTQUFTO0lBQy9CLFlBQ0UsV0FBeUMsRUFDekMsVUFBcUIsRUFBRTtRQUV2QixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbkIsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0UsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUM7UUFFekQsb0JBQW9CO1FBQ3BCLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFakMsaUNBQWlDO1FBQ2pDLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUU7WUFDbkMsR0FBRyxFQUFFO2dCQUNILE9BQU8sRUFBRSwwQ0FBMEM7Z0JBQ25ELE9BQU8sRUFBRSxxQkFBcUI7Z0JBRTlCLGtCQUFrQixFQUFFO29CQUNsQixPQUFPLEVBQUU7d0JBQ1AsTUFBTSxFQUFFLDBCQUEwQjt3QkFDbEMsT0FBTyxFQUFFOzRCQUNQLG1CQUFtQjt5QkFDcEI7cUJBQ0Y7aUJBQ0Y7Z0JBRUQsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRTt3QkFDUCxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7d0JBQ3ZCLE1BQU0sRUFBRTs0QkFDTix5QkFBeUI7eUJBQzFCO3dCQUNELE9BQU8sRUFBRTs0QkFDUCxtQkFBbUI7eUJBQ3BCO3FCQUNGO29CQUNELEtBQUssRUFBRTt3QkFDTCxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBQ3JCLE1BQU0sRUFBRTs0QkFDTixrQ0FBa0M7NEJBQ2xDLDhCQUE4Qjs0QkFDOUIsMkJBQTJCOzRCQUMzQiwwQkFBMEI7NEJBQzFCLHlCQUF5Qjs0QkFDekIsNkJBQTZCO3lCQUM5Qjt3QkFDRCxPQUFPLEVBQUU7NEJBQ1Asb0JBQW9COzRCQUNwQixtQkFBbUI7NEJBQ25CLHVCQUF1Qjt5QkFDeEI7cUJBQ0Y7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQzt3QkFDcEIsTUFBTSxFQUFFOzRCQUNOLDhCQUE4Qjs0QkFDOUIsa0NBQWtDO3lCQUNuQzt3QkFDRCxPQUFPLEVBQUU7NEJBQ1Asd0JBQXdCOzRCQUN4Qiw0QkFBNEI7eUJBQzdCO3FCQUNGO29CQUNELE1BQU0sRUFBRTt3QkFDTixTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7cUJBQ3JCO2lCQUNGO2dCQUVELFFBQVEsRUFBRTtvQkFDUixXQUFXO2lCQUNaO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEpzb25GaWxlLCB0eXBlc2NyaXB0IH0gZnJvbSAncHJvamVuJztcblxuZXhwb3J0IGludGVyZmFjZSBOeE9wdGlvbnMge1xuICAvKipcbiAgICogT3BlcmF0aW9ucyB0aGF0IGNhbiBiZSBjYWNoZWQgYnkgTlguXG4gICAqIEBkZWZhdWx0IFsnYnVpbGQnLCAndGVzdCddXG4gICAqL1xuICByZWFkb25seSBjYWNoZWFibGVPcGVyYXRpb25zPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGJhc2UgYnJhbmNoIGZvciBhZmZlY3RlZCBjb21tYW5kcy5cbiAgICogQGRlZmF1bHQgJ29yaWdpbi9tYWluJ1xuICAgKi9cbiAgcmVhZG9ubHkgZGVmYXVsdEJhc2U/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyBOWCBmb3IgbW9ub3JlcG8gYnVpbGQgb3JjaGVzdHJhdGlvbiBhbmQgY2FjaGluZy5cbiAqXG4gKiBOWCBwcm92aWRlczpcbiAqIC0gSW50ZWxsaWdlbnQgYnVpbGQgY2FjaGluZyAoc2tpcCB1bmNoYW5nZWQgcGFja2FnZXMpXG4gKiAtIERlcGVuZGVuY3ktYXdhcmUgdGFzayBleGVjdXRpb25cbiAqIC0gYG54IGFmZmVjdGVkYCBjb21tYW5kcyBmb3IgQ0kgb3B0aW1pemF0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBuZXcgTngocHJvamVjdCwge1xuICogICBjYWNoZWFibGVPcGVyYXRpb25zOiBbJ2J1aWxkJywgJ3Rlc3QnLCAnbGludCddLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIE54IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcm9vdFByb2plY3Q6IHR5cGVzY3JpcHQuVHlwZVNjcmlwdFByb2plY3QsXG4gICAgb3B0aW9uczogTnhPcHRpb25zID0ge31cbiAgKSB7XG4gICAgc3VwZXIocm9vdFByb2plY3QpO1xuXG4gICAgY29uc3QgY2FjaGVhYmxlT3BlcmF0aW9ucyA9IG9wdGlvbnMuY2FjaGVhYmxlT3BlcmF0aW9ucyA/PyBbJ2J1aWxkJywgJ3Rlc3QnXTtcbiAgICBjb25zdCBkZWZhdWx0QmFzZSA9IG9wdGlvbnMuZGVmYXVsdEJhc2UgPz8gJ29yaWdpbi9tYWluJztcblxuICAgIC8vIEFkZCBOWCBkZXBlbmRlbmN5XG4gICAgcm9vdFByb2plY3QuYWRkRGV2RGVwcygnbnhAXjIwJyk7XG5cbiAgICAvLyBHZW5lcmF0ZSBueC5qc29uIGNvbmZpZ3VyYXRpb25cbiAgICBuZXcgSnNvbkZpbGUocm9vdFByb2plY3QsICdueC5qc29uJywge1xuICAgICAgb2JqOiB7XG4gICAgICAgICRzY2hlbWE6ICcuL25vZGVfbW9kdWxlcy9ueC9zY2hlbWFzL254LXNjaGVtYS5qc29uJyxcbiAgICAgICAgZXh0ZW5kczogJ254L3ByZXNldHMvbnBtLmpzb24nLFxuXG4gICAgICAgIHRhc2tzUnVubmVyT3B0aW9uczoge1xuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHJ1bm5lcjogJ254L3Rhc2tzLXJ1bm5lcnMvZGVmYXVsdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlYWJsZU9wZXJhdGlvbnMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGFyZ2V0RGVmYXVsdHM6IHtcbiAgICAgICAgICBjb21waWxlOiB7XG4gICAgICAgICAgICBkZXBlbmRzT246IFsnXmNvbXBpbGUnXSxcbiAgICAgICAgICAgIGlucHV0czogW1xuICAgICAgICAgICAgICAnIXtwcm9qZWN0Um9vdH0vbGliLyoqLyonLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIG91dHB1dHM6IFtcbiAgICAgICAgICAgICAgJ3twcm9qZWN0Um9vdH0vbGliJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgZGVwZW5kc09uOiBbJ15idWlsZCddLFxuICAgICAgICAgICAgaW5wdXRzOiBbXG4gICAgICAgICAgICAgICche3Byb2plY3RSb290fS90ZXN0LXJlcG9ydHMvKiovKicsXG4gICAgICAgICAgICAgICche3Byb2plY3RSb290fS9jb3ZlcmFnZS8qKi8qJyxcbiAgICAgICAgICAgICAgJyF7cHJvamVjdFJvb3R9L2J1aWxkLyoqLyonLFxuICAgICAgICAgICAgICAnIXtwcm9qZWN0Um9vdH0vZGlzdC8qKi8qJyxcbiAgICAgICAgICAgICAgJyF7cHJvamVjdFJvb3R9L2xpYi8qKi8qJyxcbiAgICAgICAgICAgICAgJyF7cHJvamVjdFJvb3R9L2Nkay5vdXQvKiovKicsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb3V0cHV0czogW1xuICAgICAgICAgICAgICAne3Byb2plY3RSb290fS9kaXN0JyxcbiAgICAgICAgICAgICAgJ3twcm9qZWN0Um9vdH0vbGliJyxcbiAgICAgICAgICAgICAgJ3twcm9qZWN0Um9vdH0vY2RrLm91dCcsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGVzdDoge1xuICAgICAgICAgICAgZGVwZW5kc09uOiBbJ2J1aWxkJ10sXG4gICAgICAgICAgICBpbnB1dHM6IFtcbiAgICAgICAgICAgICAgJyF7cHJvamVjdFJvb3R9L2NvdmVyYWdlLyoqLyonLFxuICAgICAgICAgICAgICAnIXtwcm9qZWN0Um9vdH0vdGVzdC1yZXBvcnRzLyoqLyonLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIG91dHB1dHM6IFtcbiAgICAgICAgICAgICAgJ3twcm9qZWN0Um9vdH0vY292ZXJhZ2UnLFxuICAgICAgICAgICAgICAne3Byb2plY3RSb290fS90ZXN0LXJlcG9ydHMnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlcGxveToge1xuICAgICAgICAgICAgZGVwZW5kc09uOiBbJ2J1aWxkJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICBhZmZlY3RlZDoge1xuICAgICAgICAgIGRlZmF1bHRCYXNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19