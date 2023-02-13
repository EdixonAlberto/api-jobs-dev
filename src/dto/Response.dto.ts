export class ResponseDto<R = unknown> {
	readonly response: R | null
	readonly error: string[]

	constructor({ response, error = [] }: { response: R | null; error?: string[] }) {
		this.response = response
		this.error = error
	}
}
