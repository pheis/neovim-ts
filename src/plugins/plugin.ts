export type Plugin = {
  name: string,
  setup(): void
}

export const plugin = (name: string,
setup: () => void
                      ): Plugin => ({
                        name,
                        setup

                      })

