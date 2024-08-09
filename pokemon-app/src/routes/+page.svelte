<script lang="ts">
  import type { Pokemon } from '../types';
  import { onMount } from 'svelte';

  let pokemons: Pokemon[] = [];

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pokemons'); 
      if (response.ok) {
        pokemons = await response.json(); // Assign the fetched data to pokemons
      } else {
        console.error('Failed to fetch Pokémons:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Pokémons:', error);
    }
  });
</script>

<style lang="scss">
  .pokemon-list {
    list-style: none;
    padding: 0;

    li {
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ccc;
    }
  }
</style>

<ul class="pokemon-list">
  {#each pokemons as pokemon}
    <li>{pokemon.name} - {pokemon.type}</li>
  {/each}
</ul>

