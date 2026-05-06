<script lang="ts">
	const instance_id = $props.id();
	const mask_id = `${instance_id}-mask`;
	const circle_gradient_id = `${instance_id}-circle`;
	const letter_gradient_id = `${instance_id}-letter`;
</script>

<svg role="img" aria-label="Next.js icon" viewBox="0 0 180 180"
	><mask
		height="180"
		id={mask_id}
		maskUnits="userSpaceOnUse"
		width="180"
		x="0"
		y="0"
		style="mask-type:alpha"><circle cx="90" cy="90" fill="black" r="90" /></mask
	><g mask={`url(#${mask_id})`}
		><circle cx="90" cy="90" data-circle="true" fill="black" r="90" /><path
			d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
			fill={`url(#${circle_gradient_id})`}
		/><rect
			fill={`url(#${letter_gradient_id})`}
			height="72"
			width="12"
			x="115"
			y="54"
		/></g
	><defs
		><linearGradient
			gradientUnits="userSpaceOnUse"
			id={circle_gradient_id}
			x1="109"
			x2="144.5"
			y1="116.5"
			y2="160.5"
			><stop stop-color="white" /><stop
				offset="1"
				stop-color="white"
				stop-opacity="0"
			/></linearGradient
		><linearGradient
			gradientUnits="userSpaceOnUse"
			id={letter_gradient_id}
			x1="121"
			x2="120.799"
			y1="54"
			y2="106.875"
			><stop stop-color="white" /><stop
				offset="1"
				stop-color="white"
				stop-opacity="0"
			/></linearGradient
		></defs
	></svg
>
