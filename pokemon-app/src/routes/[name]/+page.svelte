<script lang="ts">
  import type { Pokemon } from '../../types';
  import Loading from '../Loading.svelte';
  import styles from './PokemonDetails.module.scss'; // Import the styles

  // Access the data returned from the load function
  export let data: {
    pokemon: Pokemon;
  };

  // Function to navigate back to the previous page
  const goBack = () => {
    window.history.back(); // Use history.back() to go back to the previous page
  };
</script>

{#if data.pokemon}
  <div class={styles['pokemon-details']}>
    <h1 class={styles['pokemon-title']}>{data.pokemon.name} - #{data.pokemon.number}</h1>

    {#if data.pokemon.image}
      <img src={data.pokemon.image} alt={data.pokemon.name} class={styles['pokemon-image']} />
    {/if}

    <!-- Centered Back Button -->
    <div class={styles['back-button-container']}>
      <button on:click={goBack} class={styles['back-button']}>Back</button>
    </div>
  </div>
{:else}
  <Loading />
{/if}
