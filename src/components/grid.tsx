import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="flex flex-wrap w-full items-start justify-center py-2 md:pt-14 md:pb-28 max-w-7xl mx-auto">
      <Slot />
    </div>
  );
});
