import { install, set } from '../src/deps.ts';

install();

set('.husky/pre-commit', 'deno task update-lock && deno fmt && deno lint');
