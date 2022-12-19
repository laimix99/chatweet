export const useLogger = (id: string) => {
  return {
    log(...msg: any) {
      console.log(`[${id}]`, ...msg)
    },
  }
}
