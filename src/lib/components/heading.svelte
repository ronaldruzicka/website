<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { css, cx } from '@styled-system/css';

	export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

	type Props = {
		tag: HeadingTag;
		class?: string;
		children: Snippet;
	} & Omit<HTMLAttributes<HTMLHeadingElement>, 'class' | 'children'>;

	let { tag, class: class_name = '', children, ...rest }: Props = $props();

	const base_class = css({
		fontFamily: '$display',
		fontWeight: '$black',
		letterSpacing: '$tight',
	});

	const heading_class_by_tag: Record<HeadingTag, string> = {
		h1: css({
			fontSize: '$4xl',
			lineHeight: '$tight',
		}),
		h2: css({
			fontSize: '$3xl',
			lineHeight: '$snug',
		}),
		h3: css({
			fontSize: '$2xl',
			lineHeight: '$snug',
		}),
		h4: css({
			fontSize: '$xl',
			lineHeight: '$normal',
		}),
	};
</script>

<svelte:element
	this={tag}
	class={cx(base_class, heading_class_by_tag[tag], class_name)}
	{...rest}
>
	{@render children()}
</svelte:element>
