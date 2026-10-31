import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      options: {
        light: { name: "Claro", value: "#ffffff" },
        dark: { name: "Marca", value: "#23384d" },
      },
    },
  },
};
export default preview;
