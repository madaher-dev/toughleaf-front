<script lang="ts">
  import type { Pokemon } from '../types';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // Correct import for goto
  import styles from './PokemonPage.module.scss'; // Import the styles

  import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'; // Import FontAwesome component


  let pokemons: Pokemon[] = [];

  // Mapping of types to emojis
  const typeEmojis: { [key: string]: string } = {
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
    criminal: '💼', // For "criminal syndicate"
    bird: '🦅' // Handling "normal / bird[nb 10]"
    // Add more types if needed
  };

  // Function to parse and map complex type strings to emojis
  const getTypeEmoji = (typeString: string): string => {
    const normalizedType = typeString
      .replace(/\s*\[nb\s*\d+\]|\s*\(.+\)/g, '')
      .toLowerCase();
    const types = normalizedType.split(/[\s\/]+and[\s\/]+|\/| and /);
    return types.map(type => typeEmojis[type.trim()]).join(' / ');
  };

  // Function to handle deletion
  const deletePokemon = async (id: number) => {
    const confirmation = confirm('Are you sure you want to delete this Pokémon?');
    if (confirmation) {
      try {
        await fetch(`http://localhost:8000/api/pokemons/${id}`, {
          method: 'DELETE',
        });
        pokemons = pokemons.filter(pokemon => pokemon.id !== id); // Update list after deletion
      } catch (error) {
        console.error('Failed to delete Pokémon:', error);
      }
    }
  };

  // Function to handle editing
  const editPokemon = (id: number) => {
    goto(`/${id}/edit`);
  };

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pokemons'); 
      if (response.ok) {
        pokemons = await response.json();
      } else {
        console.error('Failed to fetch Pokémons:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Pokémons:', error);
    }
  });
</script>

<div class={styles.container}>
  <ul class={styles['pokemon-list']}>
    {#each pokemons as pokemon}
    <li>
      <span class={styles.number}>#{pokemon.number}</span>
      <a class={styles.name} href="/{pokemon.name}">{pokemon.name}</a> <!-- Added link -->
      <span class={styles.type}>{getTypeEmoji(pokemon.type ?? '')}</span>
      <div class={styles.actions}>
        <button class="edit" on:click={() => editPokemon(pokemon.id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button class="delete" on:click={() => deletePokemon(pokemon.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  {/each}
  </ul>

  <div class={styles['type-mapping']}>
    <h3>Type Mapping</h3>
    <ul>
      {#each Object.entries(typeEmojis) as [type, emoji]}
        <li><span>{emoji}</span>{type.charAt(0).toUpperCase() + type.slice(1)}</li>
      {/each}
    </ul>
  </div>
</div>
