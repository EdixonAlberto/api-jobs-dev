import { Context, renderToString } from '$deps'
import { Docs } from '$/components/Docs.tsx'

// deno-lint-ignore no-explicit-any
function render(jsx: any, props?: any) {
	return renderToString(jsx(props))
}

// Server side render using Preact to show
export async function getDocs(ctx: Context, next: () => Promise<unknown>): Promise<void> {
	const resp = ctx.response
	resp.status = 200
	resp.headers.append('Content-Type', 'text/html; charset=UTF-8')
	resp.body = render(Docs)

	// Expose static files
	await ctx.send({
		root: `${Deno.cwd()}/docs`,
	})

	await next()
}
