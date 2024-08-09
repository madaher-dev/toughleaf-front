

<script lang="ts">
  import type { Pokemon } from '../../types';


  // Access the data returned from the load function
  export let data: {
    pokemon: Pokemon;
  };
</script>

{#if data.pokemon}
  <article>
    <h1>{data.pokemon.name} - #{data.pokemon.number}</h1>

    {#if data.pokemon.image}
      <img src={data.pokemon.image} alt={data.pokemon.name} />
    {/if}


  </article>
{:else}
  <p>Loading Pokémon data...</p>
{/if}
