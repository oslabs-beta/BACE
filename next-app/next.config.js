module.exports = {
  basePath: '',
  generateEtags: false,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/searchobj': { page: '/searchobj' },
      // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      // '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/searchobj',
  //       destination: '/',
  //     }
  //   ]
  // },
}