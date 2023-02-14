import { loadEnv } from '$deps'

export class ConfigService {
	private static ENV: Record<string, string> = { ['']: '' }

	public async load(): Promise<void> {
		ConfigService.ENV = await loadEnv()
	}

	public get(env: string): string | undefined {
		return ConfigService.ENV[env] || Deno.env.get(env)
	}
}
