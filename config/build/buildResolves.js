export default function buildResolves(options) {
  const { paths } = options;

  return {
    extensions: [".js"],
    alias: {
      "@fonts": paths.fonts,
    },
  };
}
