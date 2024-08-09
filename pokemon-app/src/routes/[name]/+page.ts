import type { PageLoad } from './$types';
import type { Pokemon } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

export const load: PageLoad = async ({ params, fetch }) => {
	const { name } = params;
	const url = `${API_URL}/pokemons/name/${name}`;
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch data for Pokémon: ${name}`);
		}

		const pokemon: Pokemon = await response.json();

		return {
			pokemon
		};
	} catch (error) {
		console.error('Error during fetch operation:', error);
		throw error; // Re-throw the error to be handled by SvelteKit
	}
};
