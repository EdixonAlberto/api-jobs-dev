import { loadEnv } from '../deps.ts';

export class ConfigService {
	private static ENV: Record<string, string> = { ['']: '' };

	public async load(): Promise<void> {
		ConfigService.ENV = await loadEnv();
	}

	public get(env: string): string {
		return ConfigService.ENV[env];
	}
}
