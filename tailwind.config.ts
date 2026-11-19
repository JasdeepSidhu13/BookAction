import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F7F4",
        ink: "#18181B",
        muted: "#6B6B73",
        soft: "#52525B",
        line: "#E6E5E0",
        line2: "#D9D8D2",
        wash: "#EEEEEA",
        track: "#EDEDE8",
        brand: {
          DEFAULT: "#3730A3",
          dark: "#1E1B4B",
          deep: "#272079",
          soft: "#EEF0FB",
          mist: "#C7C9F5",
          pale: "#DADCF7",
          mid: "#8B87D6",
        },
        gold: "#F5B947",
        success: {
          DEFAULT: "#166534",
          soft: "#EAF6EE",
          ink: "#14361F",
        },
        amber: {
          DEFAULT: "#B45309",
          soft: "#FDF4E3",
          ink: "#92400E",
          deep: "#451A03",
          mid: "#78350F",
        },
        rose: {
          DEFAULT: "#BE123C",
          soft: "#FCEDEF",
          ink: "#9F1239",
          deep: "#881337",
          mid: "#5F1527",
          tint: "#6B1A2C",
        },
        teal: {
          DEFAULT: "#155E75",
          soft: "#E8F4F7",
          ink: "#0E3F4F",
          mid: "#1F4E5C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cover: "0 12px 24px -12px rgba(30,27,75,0.45)",
        tab: "0 1px 2px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        card: "20px",
        panel: "18px",
        tile: "16px",
        control: "12px",
        chip: "10px",
      },
    },
  },
  plugins: [],
} satisfies Config;
