<template>
  <div class="container px-4 mx-auto mt-3 md:mt-6">
    <router-link to="/">
      <button
        class="px-7 mt-5 py-2 xl:ml-10 2xl:ml-20 mb-8 md:mb-20 hover:scale-95 duration-150 ease-in-out bg-gray-600 rounded-md text-[#F8F8FF]"
      >
        Back
      </button>
    </router-link>
    <div class="flex-col md:flex-row md:flex items-start justify-center">
      <div class="md:w-1/2 xl:w-[43%] 2xl:w-[40%]">
        <img
          v-if="movieDetails.Poster !== 'N/A'"
          :src="movieDetails.Poster"
          :alt="movieDetails.Title"
          class="w-[330px] lg:w-[440px] md:h-[500px] 2xl:w-[500px] 2xl:h-[700px] h-[400px] rounded-lg mb-5 shadow-lg"
        />
        <div
          v-else
          class="w-[330px] lg:w-[440px] md:h-[500px] 2xl:w-[500px] 2xl:h-[700px] h-[400px] rounded-lg mb-5 shadow-lg"
        >
          <p class="text-gray-600 font-semibold">Image Not Available</p>
        </div>
      </div>
      <div class="md:w-1/2 mb-16 lg:mb-36 md:mb-24">
        <div
          class="flex md:flex-col items-center md:items-start mb-4 lg:mb-5 justify-between"
        >
          <h5
            class="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl text-[#F8F8FF] mb-3 font-semibold"
          >
            {{ movieDetails.Title }}
          </h5>
          <span class="bg-slate-800 -mt-3 md:-mt-0 px-3 py-[3px] rounded-full">
            <p
              class="text-[#F8F8FF] font-medium text-center text-base lg:text-lg xl:text-xl"
            >
              {{ movieDetails.Year }}
            </p>
          </span>
        </div>
        <span class="flex gap-3">
          <i
            class="bx bxs-time text-slate-400 text-base md:text-lg lg:text-xl 2xl:text-2xl"
          ></i>
          <p
            class="text-[#F8F8FF] font-medium text-base md:text-lg lg:text-xl mb-4"
          >
            {{ movieDetails.Runtime }}
          </p>
        </span>
        <span class="flex gap-3">
          <i
            class="bx bxs-video-recording text-slate-400 md:text-lg lg:text-xl 2xl:text-2xl text-base"
          ></i>
          <p
            class="text-[#F8F8FF] font-medium text-base md:text-lg lg:text-xl mb-4"
          >
            {{ movieDetails.Genre }}
          </p>
        </span>
        <span class="flex gap-3">
          <i
            class="bx bx-globe text-slate-400 md:text-lg lg:text-xl 2xl:text-2xl text-base"
          ></i>
          <p
            class="text-[#F8F8FF] font-medium text-base md:text-lg lg:text-xl mb-4"
          >
            {{ movieDetails.Country }}
          </p>
        </span>
        <span class="flex gap-3">
          <i
            class="bx bxs-group text-slate-400 md:text-lg lg:text-xl text-base"
          ></i>
          <p
            class="text-[#F8F8FF] font-medium text-base md:text-lg lg:text-xl mb-4"
          >
            {{ movieDetails.Actors }}
          </p>
        </span>

        <span class="flex gap-3">
          <i
            class="bx bxs-star text-orange-500 text-base md:text-lg 2xl:text-2xl lg:text-xl"
          ></i>
          <p
            class="text-[#F8F8FF] mb-6 font-medium text-base md:text-lg lg:text-xl"
          >
            {{ movieDetails.rating }}
          </p>
        </span>
        <p
          class="text-[#F8F8FF] font-medium max-w-xl leading-loose md:leading-loose lg:leading-loose text-base md:text-lg lg:text-xl"
        >
          {{ movieDetails.Plot }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const movieDetails = ref({});
const key = import.meta.env.VITE_OMDB_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;
const route = useRoute();

onMounted(async () => {
  loadMovieData(route.params.imdbID);
});

watch(
  () => route.params.imdbID,
  (newImdbID) => {
    loadMovieData(newImdbID);
  }
);

async function loadMovieData(imdbID) {
  try {
    const res = await axios.get(`${baseUrl}?apiKey=${key}&i=${imdbID}`);
    movieDetails.value = res.data;
    if (movieDetails.value.imdbRating) {
      movieDetails.value.rating = movieDetails.value.imdbRating;
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
