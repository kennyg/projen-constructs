import * as path from 'path';
import { Component, JsonFile } from 'projen';
/**
 * Generates VSCode settings for monorepo support.
 *
 * This configures:
 * - ESLint/oxlint working directories per subproject
 * - TypeScript import preferences
 * - Format on save
 *
 * @example
 * ```ts
 * new VscodeSettings(project);
 * ```
 */
export class VscodeSettings extends Component {
    constructor(rootProject) {
        super(rootProject);
        new JsonFile(rootProject, '.vscode/settings.json', {
            obj: {
                // Configure linter to use per-package configs
                'eslint.workingDirectories': rootProject.subprojects.map((subproject) => ({
                    pattern: path.relative(rootProject.outdir, subproject.outdir),
                })),
                // Recommended settings for TypeScript monorepos
                'typescript.preferences.importModuleSpecifier': 'relative',
                'editor.formatOnSave': true,
                'editor.codeActionsOnSave': {
                    'source.fixAll.eslint': 'explicit',
                },
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnNjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ZzY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBVyxNQUFNLFFBQVEsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFNBQVM7SUFDM0MsWUFBWSxXQUFvQjtRQUM5QixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbkIsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLHVCQUF1QixFQUFFO1lBQ2pELEdBQUcsRUFBRTtnQkFDSCw4Q0FBOEM7Z0JBQzlDLDJCQUEyQixFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN4RSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUM7aUJBQzlELENBQUMsQ0FBQztnQkFFSCxnREFBZ0Q7Z0JBQ2hELDhDQUE4QyxFQUFFLFVBQVU7Z0JBQzFELHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLDBCQUEwQixFQUFFO29CQUMxQixzQkFBc0IsRUFBRSxVQUFVO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbXBvbmVudCwgSnNvbkZpbGUsIFByb2plY3QgfSBmcm9tICdwcm9qZW4nO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBWU0NvZGUgc2V0dGluZ3MgZm9yIG1vbm9yZXBvIHN1cHBvcnQuXG4gKlxuICogVGhpcyBjb25maWd1cmVzOlxuICogLSBFU0xpbnQvb3hsaW50IHdvcmtpbmcgZGlyZWN0b3JpZXMgcGVyIHN1YnByb2plY3RcbiAqIC0gVHlwZVNjcmlwdCBpbXBvcnQgcHJlZmVyZW5jZXNcbiAqIC0gRm9ybWF0IG9uIHNhdmVcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIG5ldyBWc2NvZGVTZXR0aW5ncyhwcm9qZWN0KTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgVnNjb2RlU2V0dGluZ3MgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihyb290UHJvamVjdDogUHJvamVjdCkge1xuICAgIHN1cGVyKHJvb3RQcm9qZWN0KTtcblxuICAgIG5ldyBKc29uRmlsZShyb290UHJvamVjdCwgJy52c2NvZGUvc2V0dGluZ3MuanNvbicsIHtcbiAgICAgIG9iajoge1xuICAgICAgICAvLyBDb25maWd1cmUgbGludGVyIHRvIHVzZSBwZXItcGFja2FnZSBjb25maWdzXG4gICAgICAgICdlc2xpbnQud29ya2luZ0RpcmVjdG9yaWVzJzogcm9vdFByb2plY3Quc3VicHJvamVjdHMubWFwKChzdWJwcm9qZWN0KSA9PiAoe1xuICAgICAgICAgIHBhdHRlcm46IHBhdGgucmVsYXRpdmUocm9vdFByb2plY3Qub3V0ZGlyLCBzdWJwcm9qZWN0Lm91dGRpciksXG4gICAgICAgIH0pKSxcblxuICAgICAgICAvLyBSZWNvbW1lbmRlZCBzZXR0aW5ncyBmb3IgVHlwZVNjcmlwdCBtb25vcmVwb3NcbiAgICAgICAgJ3R5cGVzY3JpcHQucHJlZmVyZW5jZXMuaW1wb3J0TW9kdWxlU3BlY2lmaWVyJzogJ3JlbGF0aXZlJyxcbiAgICAgICAgJ2VkaXRvci5mb3JtYXRPblNhdmUnOiB0cnVlLFxuICAgICAgICAnZWRpdG9yLmNvZGVBY3Rpb25zT25TYXZlJzoge1xuICAgICAgICAgICdzb3VyY2UuZml4QWxsLmVzbGludCc6ICdleHBsaWNpdCcsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=