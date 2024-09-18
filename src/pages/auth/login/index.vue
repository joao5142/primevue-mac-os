<template>
  <div class="h-screen flex items-center justify-center">
    <div class="max-w-[300px] flex flex-col items-center gap-6">
      <Avatar
        image="https://portfolio-chakra-ui-five.vercel.app/images/me.webp"
        size="xlarge"
        shape="circle"
      />

      <Password
        placeholder="Insira a Senha"
        :feedback="false"
        class="w-full"
        input-class="w-full"
        toggle-mask
        @keyup.enter="handleNavigateToHome"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleNavigateToHome() {
  router.push('/app/home')
}
</script>
