module.exports = {
  extends: 'dependency-cruiser/configs/recommended-strict',
  options: {
    tsConfig: {
      fileName: './tsconfig.json',
    },
    tsPreCompilationDeps: true,
    moduleSystems: ['cjs', 'es6'],
    progress: { type: 'cli-feedback' },
    exclude: '(node_modules|webpack.+?.js)',
    reporterOptions: {
      dot: {
        theme: {
          replace: false,
          graph: {
            splines: 'ortho',
            rankdir: 'LR',
          },
          edge: {
            arrowhead: 'vee',
            arrowsize: '0.5',
            penwidth: '1.0',
            color: 'black',
            fontcolor: 'black',
          },
        },
      },
    },
  },
};
