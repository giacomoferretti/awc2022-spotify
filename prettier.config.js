module.exports = {
  plugins: [require("./plugins/prettier-tailwind-sort-fix")],
  bracketSameLine: true,
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
