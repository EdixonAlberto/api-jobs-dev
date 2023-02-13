export interface IJob extends TJobPartial {
	details: TJobDetails
}

export type TJobPartial = {
	title: string
	role: string
	time: string
	postulationFast: boolean
	companyName: string
	location: string
	url: string
	perks: string[]
	isNew: boolean
	hasPublishedSalary: boolean
}

export type TJobDetails = {
	postulations: number
}

export type TResponseAPI<D> = import('$/dto/Response.dto.ts').ResponseDto<D>
