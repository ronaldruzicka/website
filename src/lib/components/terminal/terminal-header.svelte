<script lang="ts">
	import { css } from '@styled-system/css';
	import { hstack } from '@styled-system/patterns';
</script>

<div
	class={hstack({
		width: '$full',
		gap: '$4',
		alignItems: 'center',
		px: '$4',
		py: '$2.5',
		bgColor: '$terminal.header',
		transition:
			'background-color {$animations.theme.duration} {$animations.theme.easing}',
		_motionReduce: {
			transition: 'none',
		},
	})}
>
	<div
		class={hstack({
			gap: '$1.5',
		})}
	>
		<span
			class={css({
				boxSize: '$3',
				borderRadius: '$full',
				bgColor: '{$colors.red.500/70}',
			})}
		></span>
		<span
			class={css({
				boxSize: '$3',
				borderRadius: '$full',
				bgColor: '{$colors.amber.500/70}',
			})}
		></span>
		<span
			class={css({
				boxSize: '$3',
				borderRadius: '$full',
				bgColor: '{$colors.green.500/70}',
			})}
		></span>
	</div>
</div>
