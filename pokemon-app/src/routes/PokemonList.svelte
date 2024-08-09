<script lang="ts">
  import type { Pokemon } from '../types';
  import { getTypeEmoji } from '../utils'; // Utility function for type emojis
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'; // Import FontAwesome component
  import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons
  import styles from './PokemonPage.module.scss'; 

  export let pokemons: Pokemon[] = [];
  export let editPokemon: (id: number) => void;
  export let deletePokemon: (id: number) => void;
</script>

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


