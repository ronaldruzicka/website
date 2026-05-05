import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
	className: 'button',
	description: 'A button component with variants',
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '$2',
		minWidth: '$28',
		px: '$3',
		py: '$2',
		borderRadius: '$md',
		fontFamily: '$display',
		fontWeight: '$bold',
		fontSize: '$md',
		lineHeight: '1.5',
		textDecoration: 'none',
		cursor: 'pointer',
		borderWidth: '1px',
		transitionProperty: 'background-color, border-color',
		transitionDuration: '$normal',
		transitionTimingFunction: 'ease-in-out',
		focusVisibleRing: 'outside',

		_motionReduce: {
			transition: 'none',
		},
	},
	variants: {
		variant: {
			primary: {
				bgColor: '$primary',
				color: '$neutral.900',
				borderColor: '$transparent',

				_hover: {
					bgColor:
						'color-mix(in oklch, {$colors.primary}, {$colors.white} 20%)',
				},
			},
			secondary: {
				borderStyle: 'solid',
				borderColor: '$border',
				bgColor: '$foreground',
				color: '$body',

				_hover: {
					bgColor:
						'color-mix(in oklch, {$colors.foreground}, {$colors.body} 3%)',
				},
			},
		},
	},
});
