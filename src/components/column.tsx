import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="w-full md:w-1/2 p-4">
      <div class="p-6 rounded-2xl border border-gray-100 shadow shadow-gray-100" style="min-height: 30rem;">
        <Slot />
      </div>
    </div>
  );
});
