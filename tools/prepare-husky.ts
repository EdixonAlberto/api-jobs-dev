import { install, set } from 'husky';

install();

set('.husky/pre-commit', 'deno fmt && deno lint && deno task test && deno task update-lock');
