<script lang="ts">
	import { css } from 'styled-system/css';

	const cursor_class = css({
		display: 'inline-block',
		width: '$2',
		height: '1.2em',
		backgroundColor: '$primary',
		ml: '-$1',
		mt: '-$0.5',
		verticalAlign: 'middle',
		animation: 'pulse 1.5s infinite ease-in-out',

		_motionReduce: {
			animationName: 'none',
		},
	});
</script>

<span class={cursor_class} aria-hidden="true"></span>
