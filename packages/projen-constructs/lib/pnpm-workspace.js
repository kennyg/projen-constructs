import * as path from 'path';
import { Component, YamlFile } from 'projen';
/**
 * Generates pnpm-workspace.yaml from the project's subprojects.
 *
 * This component automatically discovers all subprojects and adds their
 * relative paths to the pnpm workspace configuration.
 *
 * @example
 * ```ts
 * new PnpmWorkspace(project);
 * ```
 */
export class PnpmWorkspace extends Component {
    constructor(rootProject) {
        super(rootProject);
        new YamlFile(rootProject, 'pnpm-workspace.yaml', {
            obj: {
                packages: rootProject.subprojects.map((subproject) => path.relative(rootProject.outdir, subproject.outdir)),
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG5wbS13b3Jrc3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG5wbS13b3Jrc3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBVyxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sT0FBTyxhQUFjLFNBQVEsU0FBUztJQUMxQyxZQUFZLFdBQW9CO1FBQzlCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuQixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUscUJBQXFCLEVBQUU7WUFDL0MsR0FBRyxFQUFFO2dCQUNILFFBQVEsRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQ3JEO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBQcm9qZWN0LCBZYW1sRmlsZSB9IGZyb20gJ3Byb2plbic7XG5cbi8qKlxuICogR2VuZXJhdGVzIHBucG0td29ya3NwYWNlLnlhbWwgZnJvbSB0aGUgcHJvamVjdCdzIHN1YnByb2plY3RzLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGF1dG9tYXRpY2FsbHkgZGlzY292ZXJzIGFsbCBzdWJwcm9qZWN0cyBhbmQgYWRkcyB0aGVpclxuICogcmVsYXRpdmUgcGF0aHMgdG8gdGhlIHBucG0gd29ya3NwYWNlIGNvbmZpZ3VyYXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBuZXcgUG5wbVdvcmtzcGFjZShwcm9qZWN0KTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgUG5wbVdvcmtzcGFjZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHJvb3RQcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgc3VwZXIocm9vdFByb2plY3QpO1xuXG4gICAgbmV3IFlhbWxGaWxlKHJvb3RQcm9qZWN0LCAncG5wbS13b3Jrc3BhY2UueWFtbCcsIHtcbiAgICAgIG9iajoge1xuICAgICAgICBwYWNrYWdlczogcm9vdFByb2plY3Quc3VicHJvamVjdHMubWFwKChzdWJwcm9qZWN0KSA9PlxuICAgICAgICAgIHBhdGgucmVsYXRpdmUocm9vdFByb2plY3Qub3V0ZGlyLCBzdWJwcm9qZWN0Lm91dGRpcilcbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==