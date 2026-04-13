<script lang="ts">
	import { vstack } from 'styled-system/patterns';

	let { children } = $props();
</script>

<div
	class={vstack({
		overflow: 'clip',
		bgColor: '$terminal.bg',
		borderColor: '$border',
		borderWidth: '1px',
		borderRadius: '$lg',
		gap: 0,
		fontFamily: '$mono',
		width: '$full',
		transitionProperty: 'background-color, border-color',
		transitionDuration: '{$animations.theme.duration}',
		transitionTimingFunction: '{$animations.theme.easing}',
		_motionReduce: {
			transition: 'none',
		},
	})}
>
	{@render children?.()}
</div>
