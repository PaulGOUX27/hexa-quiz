export function fromEntries<K extends string | number | symbol, V>(
	entries: [K, V][],
): Record<K, V> {
	return Object.fromEntries(entries) as Record<K, V>;
}
