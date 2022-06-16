module.exports = {
  bracketSameLine: true,
  plugins: [require("./plugins/prettier-tailwind-sort-fix")],
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
