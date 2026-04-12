<script lang="ts">
  import { css } from 'styled-system/css';
  import { hstack, vstack } from 'styled-system/patterns';
  import Button from './button/button.svelte';
  import Heading from './heading.svelte';
</script>

<section
  class={vstack({
    width: '$full',
    alignItems: 'center',
    gap: '$6',
  })}
>
  <div
    class={css({
      position: 'relative',
      width: '$44',
      height: '$44',
      _before: {
        content: '""',
        position: 'absolute',
        inset: 0,
        bgColor: '{$colors.primary}/20',
        filter: 'blur(40px)',
      },
    })}
  >
    <div
      class={css({
        width: '100%',
        height: '100%',
        bgColor: '$primary',
        position: 'relative',
        overflow: 'clip',
        border: '2px solid {$colors.primary}',
        borderRadius: '34% 66% 30% 70% / 70% 39% 61% 30% ',
      })}
    >
      <img
        src="/images/profile-photo.webp"
        alt="Portrait of Ronald Ružička"
        class={css({
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        })}
      />
    </div>
  </div>

  <div
    class={vstack({
      alignItems: 'center',
      gap: '$5',
    })}
  >
    <div class={vstack({ gap: '$1' })}>
      <Heading tag="h1">Ronald Ružička</Heading>
      <p
        class={css({
          margin: 0,
          color: '$primary',
          fontFamily: '$display',
          fontWeight: '$medium',
          fontSize: '$lg',
          lineHeight: '1.56',
          textAlign: 'center',
        })}
      >
        Senior Frontend Developer
      </p>
    </div>

    <div
      class={hstack({
        gap: '$3',
        flexWrap: 'wrap',
        justifyContent: 'center',
      })}
    >
      <Button variant="primary" onclick={() => console.log('hire me')}>Hire Me</Button>
      <Button variant="secondary" href="/cv.pdf">CV</Button>
    </div>
  </div>
</section>
