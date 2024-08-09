export const typeEmojis: { [key: string]: string } = {
	grass: '🌿',
	poison: '☠️',
	fire: '🔥',
	flying: '🕊️',
	water: '💧',
	bug: '🐛',
	normal: '⭐',
	electric: '⚡',
	ground: '🌍',
	fairy: '✨',
	fighting: '🥊',
	psychic: '🔮',
	rock: '🪨',
	ice: '❄️',
	ghost: '👻',
	dragon: '🐉',
	steel: '⚙️',
	dark: '🌑',
	criminal: '💼',
	bird: '🦅'
};

export const getTypeEmoji = (typeString: string): string => {
	const normalizedType = typeString.replace(/\s*\[nb\s*\d+\]|\s*\(.+\)/g, '').toLowerCase();
	const types = normalizedType.split(/[\s/]+and[\s/]+|\/| and /);
	return types.map((type) => typeEmojis[type.trim()]).join(' / ');
};
