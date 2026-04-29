export type Project = {
	name: string;
	image: string;
	skills: string[];
	description: string;
	url: string;
	github_url: string;
};

export const PROJECTS: Project[] = [
	{
		name: 'Shopping list (Listmate)',
		image: 'https://picsum.photos/id/0/600/450',
		skills: ['Svelte', 'TypeScript'],
		description: 'A shopping list app built with Svelte and TypeScript.',
		url: '#',
		github_url: 'https://github.com/ronaldruzicka/listmate',
	},
	{
		name: 'Admin dashboard (Next.js)',
		image: 'https://picsum.photos/id/20/600/450',
		skills: [
			'React',
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'Supabase',
			'React Query',
			'Zustand',
			'Shadcn UI',
		],
		description: 'An admin dashboard built with Next.js and Tailwind CSS.',
		url: '#',
		github_url: '#',
	},
	{
		name: 'Gym tracker app',
		image: 'https://picsum.photos/id/119/600/450',
		skills: ['Svelte', 'TypeScript', 'Tailwind CSS'],
		description: 'A gym tracker app built with Svelte and TypeScript.',
		url: '#',
		github_url: '#',
	},
];
