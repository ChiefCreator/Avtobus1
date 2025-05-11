import MiniCssExtractPlugin from "mini-css-extract-plugin";
export default function buildLoaders(options) {
  const idDev = options.mode === "development";
  const { paths } = options;

  const cssLoader = {
    test: /\.css$/i,
    use: [
      idDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
    ],
  };
  const expansionLoader = {
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  };
  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][hash][ext][query]',
    },
  };
  const imgLoader = {
    test: /\.(jpeg|jpg|png|webp|svg)$/,
    type: 'asset/resource',
    generator: {
      filename: 'img/[name][hash][ext][query]',
    },
  };


  return [cssLoader, expansionLoader, fontsLoader, imgLoader];
}
