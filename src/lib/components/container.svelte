<script lang="ts">
	import { css } from '@styled-system/css';

	let { children } = $props();
</script>

<div
	class={css({
		width: '100%',
		maxWidth: '500px',
		px: '$6',
	})}
>
	{@render children?.()}
</div>
