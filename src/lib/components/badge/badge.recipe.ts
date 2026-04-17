import { defineRecipe } from '@pandacss/dev';

export const badgeRecipe = defineRecipe({
	className: 'badge',
	description: 'A badge component with color variants',
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		px: '$2',
		py: '$1',
		fontFamily: '$mono',
		fontSize: '$xs',
		lineHeight: '$none',
		border: '1px solid {$colors.border}',
		borderRadius: '$md',
	},
	variants: {
		color: {
			neutral: {
				color: '$muted',
				bgColor:
					'color-mix(in oklch, {$colors.foreground}, {$colors.transparent} 94%)',
				borderColor: '$border',
			},
			primary: {
				color: 'color-mix(in oklch, {$colors.primary}, {$colors.black} 10%)',
				bgColor:
					'color-mix(in oklch, {$colors.primary}, {$colors.transparent} 90%)',
				borderColor:
					'color-mix(in oklch, {$colors.primary}, {$colors.transparent} 60%)',
			},
		},
	},
	defaultVariants: {
		color: 'neutral',
	},
});
