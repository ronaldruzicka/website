export type ExperienceEntry = {
	id: string;
	date_range: string;
	company: string;
	location: string;
	job_title: string;
	highlights: string[];
	stack: string[];
	is_current?: boolean;
};
