import { component$ } from '@builder.io/qwik';
import { Logo } from '~/components/logo';

export default component$(() => {
  return (
    <footer class="text-gray-600 body-font border-t border-gray-100">
      <div class="container px-5 py-8 flex items-center sm:flex-row flex-col max-w-7xl mx-auto">
        <a href="https://owlengine.com/" target="_blank" class="flex font-medium items-center md:justify-start justify-center text-gray-900">
          <Logo />
        </a>
        <p class="text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          Made with <a href="https://qwik.builder.io/" class="text-blue-500" target="_blank">Qwik</a> & <a href="https://tailwindcss.com/" class="text-blue-500" target="_blank">Tailwind</a>
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="https://owlengine.com/" target="_blank" class="text-orange-400">The Owl Engine</a>
        </span>
      </div>
    </footer>
  );
});
