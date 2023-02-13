export class DataListDto<D> {
	readonly data: D[]
	readonly total: number

	constructor(data: D[]) {
		this.data = data
		this.total = data.length
	}
}
