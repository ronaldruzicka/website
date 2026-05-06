import { defineRecipe } from '@pandacss/dev';

export const iconButtonRecipe = defineRecipe({
	className: 'iconButton',
	description: 'Icon-only control (link or button)',
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxSizing: 'border-box',
		minWidth: '$9',
		minHeight: '$9',
		padding: '$1',
		borderRadius: '$md',
		border: '1px solid {$colors.transparent}',
		bgColor: '$transparent',
		color: '$body',
		textDecoration: 'none',
		transitionProperty: 'background-color, border-color, color',
		transitionDuration: '$normal',
		transitionTimingFunction: 'ease-in-out',

		'& :is(svg)': {
			flexShrink: 0,
		},

		focusVisibleRing: 'outside',

		_motionReduce: {
			transition: 'none',
		},
	},
	variants: {
		variant: {
			ghost: {
				_hover: {
					bgColor:
						'color-mix(in oklch, {$colors.foreground}, {$colors.white} 20%)',
				},
			},
		},
	},
	defaultVariants: {
		variant: 'ghost',
	},
});
