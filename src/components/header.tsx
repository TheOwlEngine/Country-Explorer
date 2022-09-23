import { component$ } from '@builder.io/qwik';
import { Logo } from '~/components/logo';

export default component$(() => {
  return (
    <header class="text-gray-500 body-font border-b border-gray-100 bg-white shadow-lg shadow-gray-100">
      <div class="container flex flex-wrap p-5 flex-col md:flex-row items-center max-w-7xl mx-auto">
        <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <a href="#" class="mr-6 hover:text-gray-700">Home</a>
          <a href="https://github.com/TheOwlEngine/Country-Explorer" target="_blank" class="mr-6 hover:text-gray-700">GitHub Repository</a>
          <a href="https://pagespeed.web.dev/report?url=https://demo.owlengine.com/country-explorer" target="_blank" class="hover:text-gray-700">PageSpeed Insight</a>
        </nav>
        <a href="https://owlengine.com/" target="_blank" class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <Logo />
        </a>
        <div class="lg:w-2/5 inline-flex lg:justify-end">
          <a href="https://owlengine.com/" target="_blank" class="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded-lg text-base mt-4 md:mt-0">
            The Owl Engine
          </a>
        </div>
      </div>
    </header>
  );
});
