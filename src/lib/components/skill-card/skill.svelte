<script lang="ts" module>
	import type { Component } from 'svelte';

	type SkillGroup = 'frontend' | 'backend' | 'tooling' | 'testing' | 'design';

	export type SkillProps = {
		name: string;
		icon: Component;
		weight: number;
		group: SkillGroup[];
	};
</script>

<script lang="ts">
	import { css } from '@styled-system/css';
	import { hstack } from '@styled-system/patterns';

	type Props = {
		name: string;
		icon: Component;
		size: number;
	};

	const { name, icon: Icon, size }: Props = $props();

	const icon_size = $derived(Math.round(size * 0.45));
	const slug = $derived(name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
	const anchor_name = $derived(`--skill-${slug}`);
	const tooltip_id = $derived(`skill-tooltip-${slug}`);

	let popover_el = $state<HTMLElement | null>(null);
	let has_popover = $state(false);

	const starting_styles = {
		opacity: 0,
		translate: '0 {$spacing.1}',
	};

	$effect(() => {
		has_popover = popover_el !== null && 'showPopover' in popover_el;
	});

	function show_tooltip() {
		try {
			popover_el?.showPopover();
		} catch {
			/* popover not supported */
		}
	}

	function hide_tooltip() {
		try {
			popover_el?.hidePopover();
		} catch {
			/* popover not supported */
		}
	}
</script>

<button
	type="button"
	class={hstack({
		borderRadius: '$full',
		bgColor: '$foreground',
		justifyContent: 'center',
		transition: 'transform 0.2s ease, box-shadow 0.2s ease',
		cursor: 'default',
		border: 'none',
		padding: 0,
		_hover: {
			transform: 'scale(1.08)',
			zIndex: 1,
		},
		focusVisibleRing: 'outside',
	})}
	style:width="{size}px"
	style:height="{size}px"
	style:anchor-name={anchor_name}
	aria-label={name}
	aria-describedby={has_popover ? tooltip_id : undefined}
	title={has_popover ? undefined : name}
	onmouseenter={show_tooltip}
	onmouseleave={hide_tooltip}
	onfocus={show_tooltip}
	onblur={hide_tooltip}
>
	<span
		class={hstack({
			justifyContent: 'center',
		})}
		style:width="{icon_size}px"
		style:height="{icon_size}px"
	>
		<Icon />
	</span>
</button>

<div
	bind:this={popover_el}
	popover="manual"
	role="tooltip"
	id={tooltip_id}
	class={css({
		position: 'fixed',
		inset: 'unset',
		margin: 0,
		positionArea: 'block-start center',
		marginBlockEnd: '$2',
		bgColor: '$body',
		color: '$background',
		paddingInline: '$2.5',
		paddingBlock: '$1',
		borderRadius: '$md',
		fontSize: '$xs',
		fontWeight: '$medium',
		whiteSpace: 'nowrap',
		border: 'none',
		pointerEvents: 'none',
		opacity: 1,
		translate: 0,
		transitionProperty: 'opacity, translate, overlay, display',
		transitionDuration: '$fast',
		transitionTimingFunction: 'ease-in-out',
		transitionBehavior: 'allow-discrete',

		'&:not(:popover-open)': starting_styles,
		'@starting-style': starting_styles,
	})}
	style:position-anchor={anchor_name}
>
	{name}
</div>
