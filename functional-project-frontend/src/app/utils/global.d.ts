export {}
declare global {
    interface User {
        login: string
        name: string
        bio: string
        followers: number
        following: number
        location: string
        email: string
        avatar_url: string
        url: string
        html_url: string
    }

    interface Fork {
        html_url: string,
        id: number,
        description: string,
        user: User,
        full_name: string,
        created_at: Date,
        updated_at: Date,
        stargazers_count: number,
        watchers: number,
        has_issues: boolean,
        has_downloads: boolean,
        open_issues: string,
        forks: number
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