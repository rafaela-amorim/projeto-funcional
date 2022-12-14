export { }
declare global {

	interface Fork {
		html_url: string,
		id: number,
		description: string,
		user: string,
		full_name: string,

		created_at: Date,
		updated_at: Date,
		date_string?: string,

		stargazers_count: number,
		watchers: number,
		has_issues: boolean,
		has_downloads: boolean,
		open_issues: string,
		forks: number,
		language: string
	}

	interface forkAux {
		ano?: number,
		full_name?: string,
		created_at?: Date,
	}

	interface IRepository {
		id: number
		owner: object
		language: string

		visibility: string
		private: boolean

		forks_count: number
		open_issues_count: number
		stargazers_count: number
		watchers_count: number

		// vamos usar?
		has_downloads: boolean
		has_issues: boolean
		has_pages: boolean
		has_projects: boolean
		has_wiki: boolean
	}
}