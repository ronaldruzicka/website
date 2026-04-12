<script lang="ts">
  import { css } from 'styled-system/css';

  const { date_range }: { date_range: string } = $props();
</script>

<p
  class={css({
    margin: 0,
    color: '$muted',
    fontFamily: '$display',
    fontWeight: '$bold',
    fontSize: '$xs',
    lineHeight: '16px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  })}
>
  {date_range}
</p>
