<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-black/90 rounded-lg w-full max-w-lg backdrop-blur-md border border-[#00ff00]/10">
      <div class="p-4 border-b border-[#00ff00]/10 flex items-center justify-between">
        <h2 class="text-xl font-semibold flex items-center gap-2 text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">
          <Wand2 class="h-5 w-5" />
          AI 音乐生成
        </h2>
        <button
          @click="$emit('close')"
          class="p-2 text-[#00ff00] hover:text-[#00ff00]/80 transition-colors"
        >
          <X class="h-5 w-5" />
        </button>
      </div>
      
      <div class="p-4 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2 text-[#00ff00]">输入歌词或描述</label>
          <textarea
            v-model="prompt"
            placeholder="输入歌词或描述你想要的音乐风格..."
            class="w-full h-40 px-3 py-2 bg-black/20 rounded-lg border border-[#00ff00]/10 focus:border-[#00ff00]/30 focus:ring-1 focus:ring-[#00ff00]/30 transition-colors resize-none text-[#00ff00] placeholder-[#00ff00]/50"
          />
        </div>
        
        <button
          @click="handleGenerate"
          :disabled="!prompt.trim() || isGenerating"
          class="w-full py-2 bg-[#00ff00]/10 rounded-lg hover:bg-[#00ff00]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]"
        >
          {{ isGenerating ? '生成中...' : '100枚MERC支付' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X, Wand2 } from 'lucide-vue-next'
import type { Song } from '../types'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'generate', song: Song): void
}>()

const prompt = ref('')
const isGenerating = ref(false)

const handleGenerate = async () => {
  isGenerating.value = true
  // 模拟 AI 生成过程
  setTimeout(() => {
    const generatedSong: Song = {
      id: Date.now(),
      title: `AI 生成: ${prompt.value.slice(0, 20)}...`,
      artist: 'MERC AI',
      coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop',
      duration: '3:30',
      rank: 0,
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/22/audio_038b53dd0f.mp3',
      lyrics: prompt.value.split('\n').filter(line => line.trim()),
    }
    emit('generate', generatedSong)
    isGenerating.value = false
    prompt.value = ''
  }, 2000)
}
</script>