export type ExperienceEntry = {
	id: string;
	date_range: string;
	company: string;
	location: string;
	job_title: string;
	duties: string[];
	skills: string[];
	is_current?: boolean;
};
