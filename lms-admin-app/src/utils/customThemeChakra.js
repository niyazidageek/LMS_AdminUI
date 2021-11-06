import { extendTheme } from "@chakra-ui/react"

export const customThemeChakra = extendTheme({
    styles: {
      global: {
        ul:{
            all:'none'
        }
      },
    },
  })