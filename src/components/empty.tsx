import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="my-2 px-6 py-4 text-md bg-red-50 flex justify-center border border-red-300 text-red-500 rounded-lg gap-1">
      <Slot />
    </div>
  );
});
