/**
 * Example application using the shared library
 */

import { greet, add } from '@kennyg/example-shared-lib';

export function main() {
  console.log(greet('World'));
  console.log(`1 + 2 = ${add(1, 2)}`);
}
