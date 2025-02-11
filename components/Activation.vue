<script setup lang="ts">
import { VCodeBlock } from '@wdns/vue-code-block'
import { ref } from 'vue'

const activation = ref()

async function activateService(data?: Record<string, any>) {
  try {
    const response = await fetch('https://tools.wrxinyue.org/api/activation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()
    activation.value = result.activationContent
  }
  catch (error) {
    console.error('Activation Error:', error)
    throw error
  }
}

activateService().catch(console.error)
</script>

<template>
  <ClientOnly>
    <VCodeBlock
      :code="activation"
      prismjs
      lang="text"
      theme="neon-bunny"
    />
  </ClientOnly>
</template>
