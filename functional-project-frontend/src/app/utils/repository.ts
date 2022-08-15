export interface IRepository {
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