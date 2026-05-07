<script lang="ts">
	import { css } from '@styled-system/css';
	import { hstack } from '@styled-system/patterns';
	import Container from './container.svelte';
	import ThemeToggle from './theme-toggle.svelte';
</script>

<header
	class={hstack({
		width: '$full',
		justifyContent: 'center',
		py: '$4',
		borderBlockEnd: '1px solid',
		borderColor: '{$colors.border}',
	})}
>
	<Container>
		<div
			class={hstack({
				width: '$full',
				justifyContent: 'space-between',
			})}
		>
			<span
				class={css({
					fontFamily: '$mono',
					fontWeight: '$bold',
				})}
			>
				ronaldruzicka<span
					class={css({
						color: '$primary',
						fontSize: '$xl',
						animationName: 'pulse',
						animationDuration: '3s',
						animationIterationCount: 'infinite',
						animationTimingFunction: 'ease-in-out',
						_motionReduce: {
							animationName: 'none',
						},
					})}>.</span
				>me</span
			>
			<ThemeToggle />
		</div>
	</Container>
</header>
