<script lang="ts">
	import { cx } from 'styled-system/css';
	import { button } from 'styled-system/recipes';

	type BaseProps = {
		class?: string;
		variant: 'primary' | 'secondary';
		children?: import('svelte').Snippet;
	};

	type LinkProps = BaseProps & {
		href: string;
		onclick?: never;
		rel?: string;
		target?: string;
		type?: never;
	};

	type ButtonProps = BaseProps & {
		href?: never;
		onclick?: (event: MouseEvent) => void;
		rel?: never;
		target?: never;
		type?: 'button' | 'submit' | 'reset';
	};

	type Props = LinkProps | ButtonProps;

	let {
		class: className = '',
		variant,
		children,
		href,
		onclick,
		rel,
		target,
		type = 'button',
	}: Props = $props();

	const class_list = $derived(cx(button({ variant }), className));

	const safeRel = $derived(
		href && target === '_blank' && !rel ? 'noopener noreferrer' : rel,
	);
</script>

{#if href !== undefined}
	<a {href} class={class_list} rel={safeRel} {target}>
		{@render children?.()}
	</a>
{:else}
	<button {type} class={class_list} {onclick}>
		{@render children?.()}
	</button>
{/if}
