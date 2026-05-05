type PackedCircle = {
	x: number;
	y: number;
	radius: number;
	index: number;
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
	if (height_sq < 0) return [];
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
