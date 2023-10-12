<template>
  <header class="w-full container mx-auto">
    <nav class="px-5 xl:px-7 pt-5">
      <div class="md:flex md:justify-between items-center">
        <h1
          class="text-3xl mb-2 md:mb-0 lg:text-4xl text-center font-bold text-[#F8F8FF]"
        >
          Mo<span class="text-green-500">Vue</span>
        </h1>
        <div class="flex items-center md:w-1/2 lg:w-[40%] xl:w-[28%] gap-5">
          <div
            class="flex px-7 py-3 bg-[#1f2533] items-center rounded-lg md:rounded-full w-full justify-between"
          >
            <input
              type="text"
              v-model="searchQuery"
              class="text-white bg-transparent w-full focus:outline-none"
              placeholder="Search movie..."
              @keyup.enter="searchMovie"
              id="search"
            />
            <i class="bx bx-search text-[#F8F8FF] text-2xl"></i>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="pop-img flex justify-center mt-9 items-center relative">
    <div class="z-30 text-center px-5">
      <h1
        class="text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl mb-6 font-semibold text-[#F8F8FF]"
      >
        Streaming Now!
      </h1>
      <p
        class="text-base md:text-lg lg:text-xl 2xl:text-2xl text-[#F8F8FF] mb-10"
      >
        Discover and enjoy your favorite movies on MoVue!
      </p>
      <div class="flex gap-3 justify-center xs:gap-5 lg:gap-7">
        <a
          href="#"
          class="block px-5 xs:px-6 md:px-9 rounded-lg py-3 md:py-4 duration-300 ease-in-out bg-green-500 hover:bg-[#151922] hover:text-green-500 font-semibold bg-secondaryPurple text-[#F8F8FF]"
          >Go watch</a
        >
        <a
          href="#search"
          class="block px-5 xs:px-6 md:px-9 rounded-lg py-3 md:py-4 font-semibold duration-300 hover:text-green-500 ease-in-out text-[#F8F8FF]"
          >Search</a
        >
      </div>
    </div>
  </div>
  <!-- movies results -->
  <div class="container mx-auto mt-16 pb-3">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-7 xl:grid-cols-5 gap-5 justify-center"
    >
      <div v-for="movie in movies" :key="movie.imdbID">
        <router-link :to="`/movie/${movie.imdbID}`">
          <div class="p-4 rounded-lg">
            <div class="relative">
              <img
                v-if="movie.Poster !== 'N/A'"
                :src="movie.Poster"
                :alt="movie.Title"
                class="w-full h-[400px] rounded-lg mb-3 shadow-lg hover:scale-95 duration-150 ease-in-out"
              />
              <div
                v-else
                class="w-full h-[400px] bg-gray-300 flex items-center justify-center hover:scale-95 duration-150 rounded-lg mb-3 shadow-lg"
              >
                <p class="text-gray-600 font-semibold">Image Not Available</p>
              </div>
              <p class="text-[#F8F8FF] font-medium text-xl mb-2 truncate">
                {{ movie.Title }}
              </p>
              <div class="flex items-center justify-between">
                <p class="text-[#F8F8FF] font-medium text-base">
                  <i class="bx bxs-star text-orange-400 text-base"></i>
                  {{ movie.rating }}
                </p>
                <span class="bg-slate-800 px-3 py-px rounded-full">
                  <p class="text-[#F8F8FF] font-medium text-base">
                    {{ movie.Year }}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const searchQuery = ref("");
const movies = ref([]);
const key = import.meta.env.VITE_OMDB_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;
const searchMovie = () => {
  axios.get(`${baseUrl}?apiKey=${key}&s=${searchQuery.value}`).then((res) => {
    movies.value = res.data.Search;
    movies.value.forEach((movie) => {
      axios.get(`${baseUrl}?apiKey=${key}&i=${movie.imdbID}`).then((res) => {
        movie.rating = res.data.imdbRating;
      });
    });
  });
};
</script>
