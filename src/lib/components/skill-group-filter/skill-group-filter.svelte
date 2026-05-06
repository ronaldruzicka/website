<script lang="ts">
	import { css, cx } from '@styled-system/css';
	import { hstack } from '@styled-system/patterns';

	type Props = {
		groups: string[];
		selected: string | null;
		onchange: (group: string | null) => void;
	};

	const { groups, selected, onchange }: Props = $props();

	let focused_index = $state(0);

	// Reset focused_index when groups changes:
	$effect(() => {
		if (focused_index >= groups.length && groups.length > 0) {
			focused_index = 0;
		}
	});

	function get_next_index(event: KeyboardEvent) {
		const total = groups.length;

		if (total === 0) {
			return;
		}

		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				return (focused_index + 1) % total;
			case 'ArrowLeft':
			case 'ArrowUp':
				return (focused_index - 1 + total) % total;
			case 'Home':
				return 0;
			case 'End':
				return total - 1;
			default:
				return;
		}
	}

	function handle_keydown(event: KeyboardEvent) {
		const next_index = get_next_index(event);

		if (next_index === undefined) {
			return;
		}

		event.preventDefault();
		focused_index = next_index;

		const toolbar = (event.currentTarget as HTMLElement).closest(
			'[role="toolbar"]',
		);

		const buttons = toolbar?.querySelectorAll<HTMLButtonElement>('button');
		buttons?.[next_index]?.focus();
	}

	function handle_focus_out(event: FocusEvent) {
		const toolbar = event.currentTarget as HTMLElement;
		const next = event.relatedTarget as Node | null;

		if (!next || !toolbar.contains(next)) {
			onchange(null);
		}
	}

	function handle_toolbar_leave(event: MouseEvent) {
		const toolbar = event.currentTarget as HTMLElement;

		if (!toolbar.contains(document.activeElement)) {
			onchange(null);
		}
	}

	function handle_pill_enter(group: string, index: number) {
		focused_index = index;
		onchange(group);
	}

	const base_pill = css({
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingInline: '$3',
		paddingBlock: '$1.5',
		borderRadius: '$full',
		fontSize: '$sm',
		fontWeight: '$medium',
		fontFamily: '$display',
		cursor: 'pointer',
		border: '1px solid',
		borderColor: '$border',
		bgColor: '$foreground',
		color: '$body',
		textTransform: 'capitalize',
		transitionProperty: 'background-color, border-color, color',
		transitionDuration: '$normal',
		transitionTimingFunction: 'ease-in-out',
		whiteSpace: 'nowrap',
		userSelect: 'none',
		focusVisibleRing: 'outside',

		_hover: {
			color: 'color-mix(in oklch, {$colors.primary}, {$colors.black} 10%)',
			bgColor:
				'color-mix(in oklch, {$colors.primary}, {$colors.transparent} 90%)',
			borderColor:
				'color-mix(in oklch, {$colors.primary}, {$colors.transparent} 60%)',
		},
	});

	const active_pill = css({
		color: 'color-mix(in oklch, {$colors.primary}, {$colors.black} 10%)',
		bgColor:
			'color-mix(in oklch, {$colors.primary}, {$colors.transparent} 90%)',
		borderColor:
			'color-mix(in oklch, {$colors.primary}, {$colors.transparent} 60%)',
	});
</script>

<div
	role="toolbar"
	aria-label="Filter skills by group — tap a pill, hover or use arrow keys"
	tabindex="-1"
	class={hstack({
		gap: '$2',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		width: '$full',
	})}
	onkeydown={handle_keydown}
	onfocusout={handle_focus_out}
	onmouseleave={handle_toolbar_leave}
>
	{#each groups as group, index}
		<button
			type="button"
			class={cx(base_pill, selected === group ? active_pill : '')}
			tabindex={index === focused_index ? 0 : -1}
			aria-pressed={selected === group}
			onmouseenter={() => handle_pill_enter(group, index)}
			onfocus={() => handle_pill_enter(group, index)}
		>
			{group}
		</button>
	{/each}
</div>
