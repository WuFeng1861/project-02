<template>
  <div class="h-[300px] mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00ff00]/30 scrollbar-track-[#00ff00]/5">
    <div class="space-y-2 p-4 text-center">
      <p
        v-for="(line, index) in lyrics"
        :key="index"
        class="text-[#00ff00]/90 hover:text-[#00ff00] transition-colors cursor-default drop-shadow-[0_0_2px_rgba(0,255,0,0.5)]"
      >
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  lyrics: string[]
  currentTime: string
}>()
</script>