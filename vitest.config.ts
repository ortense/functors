import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: false,
      provider: 'v8',
    },
  },
})
