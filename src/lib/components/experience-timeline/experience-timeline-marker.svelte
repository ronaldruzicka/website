<script lang="ts">
  import { css } from 'styled-system/css';
</script>

<div
  class={css({
    position: 'absolute',
    left: 0,
    top: 0,
    boxSize: '$4',
    borderRadius: '$full',
    translate: '-50% 0',
    backgroundColor: 'var(--dot-bg)',
    border: '2px solid {$colors.primary}',
    animation: 'fill linear both',
    animationTimeline: 'view(block 0% 30%)',
    animationRange: 'entry 0% exit 100%',
  })}
  aria-hidden="true"
></div>
