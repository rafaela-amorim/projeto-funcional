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
}