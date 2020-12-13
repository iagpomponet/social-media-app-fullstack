import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string
    borderRadius: string,
    colors: {
      primary: string,
      secondary: string,
    }
  }
}