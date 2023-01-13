import { install, set } from '$deps';

install();

set('.husky/pre-commit', 'deno task update-lock && deno fmt && deno lint && deno task test');
