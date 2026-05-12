<script lang="ts">
	import type { SkillProps } from '@components/skill-card/skill.svelte';

	import { BinaryCodeIcon } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';

	import Heading from '@components/heading.svelte';
	import IconAstro from '@components/icons/icon-astro.svelte';
	import IconBiome from '@components/icons/icon-biome.svelte';
	import IconBun from '@components/icons/icon-bun.svelte';
	import IconChromatic from '@components/icons/icon-chromatic.svelte';
	import IconCss from '@components/icons/icon-css.svelte';
	import IconDeno from '@components/icons/icon-deno.svelte';
	import IconEslint from '@components/icons/icon-eslint.svelte';
	import IconFigma from '@components/icons/icon-figma.svelte';
	import IconGit from '@components/icons/icon-git.svelte';
	import IconGraphql from '@components/icons/icon-graphql.svelte';
	import IconHono from '@components/icons/icon-hono.svelte';
	import IconHtml from '@components/icons/icon-html.svelte';
	import IconNextjs from '@components/icons/icon-nextjs.svelte';
	import IconOxc from '@components/icons/icon-oxc.svelte';
	import IconPandacss from '@components/icons/icon-pandacss.svelte';
	import IconPrettier from '@components/icons/icon-prettier.svelte';
	import IconReactRouter from '@components/icons/icon-react-router.svelte';
	import IconReact from '@components/icons/icon-react.svelte';
	import IconStorybook from '@components/icons/icon-storybook.svelte';
	import IconSvelte from '@components/icons/icon-svelte.svelte';
	import IconTailwind from '@components/icons/icon-tailwind.svelte';
	import IconTanstack from '@components/icons/icon-tanstack.svelte';
	import IconTurborepo from '@components/icons/icon-turborepo.svelte';
	import IconTypescript from '@components/icons/icon-typescript.svelte';
	import IconVite from '@components/icons/icon-vite.svelte';
	import IconVitest from '@components/icons/icon-vitest.svelte';
	import Skill from '@components/skill-card/skill.svelte';
	import SkillGroupFilter from '@components/skill-group-filter/skill-group-filter.svelte';
	import {
		get_max_pack_scale_within_width,
		get_packed_cloud_dimensions,
		pack_circles,
	} from '@utils/pack-circles';
	import { css } from '@styled-system/css';
	import { hstack, vstack } from '@styled-system/patterns';

	const MIN_RADIUS = 18;
	const RADIUS_SCALE = 7;
	const GAP = 6;
	const VIEWPORT_MARGIN_X = 48;

	const skills: SkillProps[] = [
		{ name: 'Astro', icon: IconAstro, weight: 1, group: ['frontend'] },
		{ name: 'Biome', icon: IconBiome, weight: 2, group: ['tooling'] },
		{ name: 'Bun', icon: IconBun, weight: 1, group: ['backend', 'tooling'] },
		{ name: 'Chromatic', icon: IconChromatic, weight: 2, group: ['testing'] },
		{ name: 'CSS', icon: IconCss, weight: 4, group: ['frontend'] },
		{ name: 'Deno', icon: IconDeno, weight: 1, group: ['backend'] },
		{ name: 'ESlint', icon: IconEslint, weight: 2, group: ['tooling'] },
		{ name: 'Figma', icon: IconFigma, weight: 3, group: ['design'] },
		{ name: 'Git', icon: IconGit, weight: 3, group: ['tooling'] },
		{ name: 'GraphQL', icon: IconGraphql, weight: 2, group: ['frontend'] },
		{ name: 'Hono', icon: IconHono, weight: 2, group: ['backend'] },
		{ name: 'HTML', icon: IconHtml, weight: 4, group: ['frontend'] },
		{
			name: 'Next.js',
			icon: IconNextjs,
			weight: 4,
			group: ['frontend', 'backend'],
		},
		{ name: 'Oxc', icon: IconOxc, weight: 2, group: ['tooling'] },
		{ name: 'PandaCSS', icon: IconPandacss, weight: 3, group: ['frontend'] },
		{ name: 'Prettier', icon: IconPrettier, weight: 3, group: ['tooling'] },
		{
			name: 'React Router',
			icon: IconReactRouter,
			weight: 4,
			group: ['frontend'],
		},
		{ name: 'React', icon: IconReact, weight: 5, group: ['frontend'] },
		{ name: 'Storybook', icon: IconStorybook, weight: 4, group: ['testing'] },
		{ name: 'Svelte', icon: IconSvelte, weight: 2, group: ['frontend'] },
		{ name: 'Tailwind', icon: IconTailwind, weight: 3, group: ['frontend'] },
		{
			name: 'TanStack',
			icon: IconTanstack,
			weight: 3,
			group: ['frontend', 'tooling'],
		},
		{ name: 'Turborepo', icon: IconTurborepo, weight: 2, group: ['tooling'] },
		{
			name: 'TypeScript',
			icon: IconTypescript,
			weight: 5,
			group: ['frontend', 'backend'],
		},
		{ name: 'Vite', icon: IconVite, weight: 3, group: ['tooling'] },
		{ name: 'Vitest', icon: IconVitest, weight: 3, group: ['testing'] },
	];

	const base_radii = skills.map(
		(skill) => MIN_RADIUS + skill.weight * RADIUS_SCALE,
	);

	let viewport_inner_width = $state(1200);

	const max_cloud_width = $derived(
		Math.max(160, (viewport_inner_width ?? 1200) - VIEWPORT_MARGIN_X * 2),
	);

	const layout_scale = $derived(
		get_max_pack_scale_within_width(base_radii, GAP, max_cloud_width),
	);

	const scaled_gap = $derived(GAP * layout_scale);
	const scaled_radii = $derived(
		base_radii.map((radius) => radius * layout_scale),
	);

	const packed = $derived(pack_circles(scaled_radii, scaled_gap));

	const cloud_bounds = $derived(get_packed_cloud_dimensions(packed));

	const cloud_width = $derived(cloud_bounds.width);
	const cloud_height = $derived(cloud_bounds.height);

	const positioned = $derived(
		packed.map((circle) => ({
			skill: skills[circle.index],
			x: circle.x - circle.radius - cloud_bounds.min_x,
			y: circle.y - circle.radius - cloud_bounds.min_y,
			size: circle.radius * 2,
		})),
	);

	// Focus order follows weight (desc), then name; layout stays absolute-positioned.
	const positioned_by_tab_order = $derived(
		[...positioned].sort((item_a, item_b) => {
			const weight_diff = item_b.skill.weight - item_a.skill.weight;

			if (weight_diff !== 0) {
				return weight_diff;
			}

			return item_a.skill.name.localeCompare(item_b.skill.name);
		}),
	);

	const unique_groups = [...new Set(skills.flatMap((skill) => skill.group))];

	let active_group = $state<string | null>(null);

	function is_in_active_group(groups: string[]) {
		return active_group !== null && groups.includes(active_group);
	}
</script>

<svelte:window bind:innerWidth={viewport_inner_width} />

<section class={vstack({ width: '$full', gap: '$8' })}>
	<header
		class={hstack({
			gap: '$2',
			alignItems: 'center',
			width: '$full',
		})}
	>
		<HugeiconsIcon
			aria-hidden="true"
			color="currentColor"
			icon={BinaryCodeIcon}
			size={24}
			strokeWidth={1.5}
		/>
		<Heading tag="h2">Skills</Heading>
	</header>

	<SkillGroupFilter
		groups={unique_groups}
		selected={active_group}
		onchange={(group) => (active_group = group)}
	/>

	<div
		role="list"
		class={css({
			position: 'relative',
			mx: 'auto',
			maxWidth: '100%',
			transformOrigin: 'center top',
			animation: 'reveal ease-in-out both',
			animationTimeline: 'view()',
			animationRange: 'entry',

			'&[data-filtering] > [data-skill]:not([data-active])': {
				opacity: 0.25,
			},
		})}
		style:width="{cloud_width}px"
		style:height="{cloud_height}px"
		data-filtering={active_group !== null ? '' : undefined}
	>
		{#each positioned_by_tab_order as item (item.skill.name)}
			<div
				class={css({ position: 'absolute', transition: 'opacity 0.2s ease' })}
				style:left="{item.x}px"
				style:top="{item.y}px"
				data-skill
				data-active={is_in_active_group(item.skill.group) ? '' : undefined}
				role="listitem"
				onmouseenter={() => (active_group = item.skill.group[0])}
				onmouseleave={() => (active_group = null)}
				onfocusin={() => (active_group = item.skill.group[0])}
				onfocusout={() => (active_group = null)}
			>
				<Skill name={item.skill.name} icon={item.skill.icon} size={item.size} />
			</div>
		{/each}
	</div>
</section>
