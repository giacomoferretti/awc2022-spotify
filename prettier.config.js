module.exports = {
  plugins: [require("./plugins/prettier-tailwind-sort-fix")],
  bracketSameLine: true,
  quoteProps: "consistent",
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
