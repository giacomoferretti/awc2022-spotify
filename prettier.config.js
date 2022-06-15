module.exports = {
  bracketSameLine: true,
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@trivago/prettier-plugin-sort-imports"),
  ],
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
