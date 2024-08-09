<script lang="ts">
    import styles from './PokemonPage.module.scss'; 
  export let typeEmojis: { [key: string]: string };
</script>

<div class={styles['type-mapping']}>
  <h3>Legend</h3>
  <ul>
    {#each Object.entries(typeEmojis) as [type, emoji]}
      <li><span>{emoji}</span>{type.charAt(0).toUpperCase() + type.slice(1)}</li>
    {/each}
  </ul>
</div>

