export type PackedCircle = {
	x: number;
	y: number;
	radius: number;
	index: number;
};

export type PackedCloudDimensions = {
	min_x: number;
	max_x: number;
	min_y: number;
	max_y: number;
	width: number;
	height: number;
};

function get_tangent_positions(
	first_circle: PackedCircle,
	second_circle: PackedCircle,
	radius: number,
	gap: number,
): { x: number; y: number }[] {
	const delta_x = second_circle.x - first_circle.x;
	const delta_y = second_circle.y - first_circle.y;
	const center_distance = Math.hypot(delta_x, delta_y);

	const reach_from_first = first_circle.radius + radius + gap;
	const reach_from_second = second_circle.radius + radius + gap;

	if (
		center_distance > reach_from_first + reach_from_second ||
		center_distance < Math.abs(reach_from_first - reach_from_second) ||
		center_distance === 0
	) {
		return [];
	}

	const along =
		(reach_from_first * reach_from_first -
			reach_from_second * reach_from_second +
			center_distance * center_distance) /
		(2 * center_distance);
	const height_sq = reach_from_first * reach_from_first - along * along;

	if (height_sq < 0) {
		return [];
	}

	const height = Math.sqrt(height_sq);

	const mid_x = first_circle.x + (along * delta_x) / center_distance;
	const mid_y = first_circle.y + (along * delta_y) / center_distance;

	return [
		{
			x: mid_x + (height * delta_y) / center_distance,
			y: mid_y - (height * delta_x) / center_distance,
		},
		{
			x: mid_x - (height * delta_y) / center_distance,
			y: mid_y + (height * delta_x) / center_distance,
		},
	];
}

const TOLERANCE = 1e-6;

function has_overlap(
	x: number,
	y: number,
	radius: number,
	circles: PackedCircle[],
	gap: number,
): boolean {
	const min_distance_factor = 1 - TOLERANCE;

	return circles.some((existing_circle) => {
		const delta_x = x - existing_circle.x;
		const delta_y = y - existing_circle.y;

		return (
			Math.hypot(delta_x, delta_y) <
			(radius + existing_circle.radius + gap) * min_distance_factor
		);
	});
}

function find_closest_position(
	packed: PackedCircle[],
	radius: number,
	gap: number,
): { x: number; y: number } | null {
	let best: { x: number; y: number } | null = null;
	let best_dist = Infinity;

	for (let first_index = 0; first_index < packed.length; first_index++) {
		for (
			let second_index = first_index + 1;
			second_index < packed.length;
			second_index++
		) {
			const candidates = get_tangent_positions(
				packed[first_index],
				packed[second_index],
				radius,
				gap,
			);

			for (const candidate of candidates) {
				const dist = Math.hypot(candidate.x, candidate.y);
				const is_closer_valid =
					dist < best_dist &&
					!has_overlap(candidate.x, candidate.y, radius, packed, gap);

				if (is_closer_valid) {
					best = candidate;
					best_dist = dist;
				}
			}
		}
	}

	return best;
}

/**
 * Packs circles tightly, placing larger ones near the center.
 * Returns positioned circles with their original index preserved.
 */
export function pack_circles(radii: number[], gap = 6): PackedCircle[] {
	const items = radii
		.map((radius, index) => ({ radius, index }))
		.sort((item_a, item_b) => item_b.radius - item_a.radius);

	const packed: PackedCircle[] = [];

	for (const item of items) {
		if (packed.length === 0) {
			packed.push({ x: 0, y: 0, radius: item.radius, index: item.index });
			continue;
		}

		if (packed.length === 1) {
			packed.push({
				x: packed[0].radius + item.radius + gap,
				y: 0,
				radius: item.radius,
				index: item.index,
			});
			continue;
		}

		const position = find_closest_position(packed, item.radius, gap);

		if (!position) {
			throw new Error(
				`Failed to find position for circle at index ${item.index} with radius ${item.radius}`,
			);
		}
		packed.push({ ...position, radius: item.radius, index: item.index });
	}

	return packed;
}

function get_cloud_width_for_scale(
	base_radii: number[],
	base_gap: number,
	scale: number,
): number {
	const scaled_radii = base_radii.map((radius) => radius * scale);
	const scaled_gap = base_gap * scale;

	const packed = pack_circles(scaled_radii, scaled_gap);

	return get_packed_cloud_dimensions(packed).width;
}

/** Bounding box of a packed layout (axis-aligned). */
export function get_packed_cloud_dimensions(
	packed: PackedCircle[],
): PackedCloudDimensions {
	const min_x = Math.min(...packed.map((circle) => circle.x - circle.radius));
	const max_x = Math.max(...packed.map((circle) => circle.x + circle.radius));
	const min_y = Math.min(...packed.map((circle) => circle.y - circle.radius));
	const max_y = Math.max(...packed.map((circle) => circle.y + circle.radius));

	const width = max_x - min_x;
	const height = max_y - min_y;

	return { min_x, max_x, min_y, max_y, width, height };
}

const MIN_LAYOUT_SCALE = 0.12;
const SCALE_SEARCH_ITERATIONS = 30;

/**
 * Largest linear scale (≤ 1) such that the packed cloud width fits `max_content_width`.
 * Radii and gap are multiplied by the scale before packing so spacing stays proportional.
 */
export function get_max_pack_scale_within_width(
	base_radii: number[],
	base_gap: number,
	max_content_width: number,
): number {
	if (
		!Number.isFinite(max_content_width) ||
		max_content_width <= 0 ||
		base_radii.length === 0
	) {
		return 1;
	}

	const natural_width = get_cloud_width_for_scale(base_radii, base_gap, 1);

	if (natural_width <= max_content_width) {
		return 1;
	}

	let scale_low = MIN_LAYOUT_SCALE;
	let scale_high = 1;

	for (let iteration = 0; iteration < SCALE_SEARCH_ITERATIONS; iteration++) {
		const scale_mid = (scale_low + scale_high) / 2;
		const width_at_mid = get_cloud_width_for_scale(
			base_radii,
			base_gap,
			scale_mid,
		);

		if (width_at_mid <= max_content_width) {
			scale_low = scale_mid;
		} else {
			scale_high = scale_mid;
		}
	}

	return scale_low;
}
