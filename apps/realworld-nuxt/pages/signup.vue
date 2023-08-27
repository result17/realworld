<template>
  <div py-16>
    <div mx-auto max-w-sm>
      <div text-4xl text-center py-8>Sign Up</div>
      <div flex flex-col items-center>
        <input v-model="username" px-4 py-2 my-4 rounded w-full border-1 focus:outline-0 type="text" placeholder="username" />
        <input v-model="email" px-4 py-2 my-3 rounded w-full border-1 focus:outline-0 type="email" placeholder="email" />
        <input v-model="password" px-4 py-2 my-4 rounded w-full border-1 focus:outline-0 type="password" placeholder="password" />
      </div>
      <div flex justify-end><button rounded bg-black w-24 text-white py-2>Sign Up</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')

watchEffect(() => console.log(username.value))

</script>