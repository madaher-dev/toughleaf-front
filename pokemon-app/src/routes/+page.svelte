<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // Correct import for goto
  import styles from './PokemonPage.module.scss'; // Import the styles
  import type { Pokemon } from '../types';

  import PokemonList from './PokemonList.svelte';
  import Legend from './Legend.svelte';
  import { typeEmojis } from '../utils';
  import Loading from './Loading.svelte'; // Import the Loading component

  let pokemons: Pokemon[] = [];
  let query = ''; // Bind this variable to the search input
  let loading = false; // Loading state

  const fetchPokemons = async (searchQuery: string = '') => {
    loading = true; // Set loading to true when the request starts
    const url = searchQuery ? `http://localhost:8000/api/pokemons?search=${searchQuery}` : 'http://localhost:8000/api/pokemons';
    try {
      const response = await fetch(url); 
      if (response.ok) {
        pokemons = await response.json();
      } else {
        console.error('Failed to fetch Pokémons:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Pokémons:', error);
    } finally {
      loading = false; // Set loading to false when the request finishes
    }
  };

  const searchPokemons = () => {
    fetchPokemons(query);
  };

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

  const editPokemon = (id: number) => {
    goto(`/${id}/edit`);
  };

  onMount(() => {
    fetchPokemons(); // Fetch all Pokémon on mount
  });
</script>

<div class={styles.container}>
  <!-- Search Bar -->
  <div class={styles.search}>
    <input type="text" bind:value={query} placeholder="Search Pokémon..." />
    <button on:click={searchPokemons}>Search</button>
  </div>

  <!-- Content Wrapper for List and Legend -->
  <div class={styles['content-wrapper']}>
    {#if loading}
      <!-- Show loading component while fetching -->
      <Loading />
    {:else}
      <!-- Pokemon list and type mapping -->
      <PokemonList {pokemons} {editPokemon} {deletePokemon} />
      <Legend {typeEmojis} />
    {/if}
  </div>
</div>
