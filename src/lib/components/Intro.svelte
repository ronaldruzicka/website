<script lang="ts">
  import { css } from 'styled-system/css';
  import { hstack, vstack } from 'styled-system/patterns';
  import Button from './Button.svelte';
</script>

<section
  aria-labelledby="profile-heading"
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
        overflow: 'hidden',
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
      gap: '$1',
    })}
  >
    <h1
      id="profile-heading"
      class={css({
        margin: 0,
        color: '$body',
        fontFamily: '$display',
        fontWeight: '$bold',
        fontSize: '$3xl',
        lineHeight: '1.2',
        textAlign: 'center',
      })}
    >
      Ronald Ružička
    </h1>

    <p
      class={css({
        margin: 0,
        paddingBottom: '$6',
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
