<script lang="ts">
  import { hstack, vstack } from 'styled-system/patterns';
  import Heading from '../heading.svelte';
  import ExperienceTimelineItem from './experience-timeline-item.svelte';
  import { EXPERIENCE_ENTRIES } from './experience-timeline.data';

  import { WorkHistoryIcon } from '@hugeicons/core-free-icons';
  import { HugeiconsIcon } from '@hugeicons/svelte';
</script>

<section class={vstack({ width: '$full', gap: '$8' })}>
  <header
    class={hstack({
      gap: '$2',
      alignItems: 'center',
      width: '$full',
    })}
  >
    <HugeiconsIcon
      aria-hidden="true"
      color="currentColor"
      icon={WorkHistoryIcon}
      size={24}
      strokeWidth={1.5}
    />
    <Heading tag="h2">Work Experience</Heading>
  </header>

  <div
    class={vstack({
      position: 'relative',
      gap: '$20',
      borderInlineStart: '1px solid',
      borderColor: '{$colors.primary}/35',
    })}
  >
    {#each EXPERIENCE_ENTRIES as entry (entry.id)}
      <ExperienceTimelineItem {entry} />
    {/each}
  </div>
</section>
