<script lang="ts">
	import { cx } from 'styled-system/css';
	import { iconButton } from 'styled-system/recipes';
	import type { Snippet } from 'svelte';

	type BaseProps = {
		'aria-label': string;
		children?: Snippet;
		class?: string;
		variant?: 'ghost';
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
		'aria-label': ariaLabel,
		children,
		class: className = '',
		href,
		onclick,
		rel,
		target,
		type = 'button',
		variant = 'ghost',
	}: Props = $props();

	const class_list = $derived(cx(iconButton({ variant }), className));

	const safeRel = $derived(
		href && target === '_blank' && !rel ? 'noopener noreferrer' : rel,
	);
</script>

{#if href !== undefined}
	<a {href} class={class_list} rel={safeRel} {target} aria-label={ariaLabel}>
		{@render children?.()}
	</a>
{:else}
	<button {type} class={class_list} {onclick} aria-label={ariaLabel}>
		{@render children?.()}
	</button>
{/if}
