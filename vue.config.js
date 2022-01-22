/*
 * @Description: message
 * @LastEditTime: 2019-10-09 10:22:45
 */
module.exports = {
	publicPath: './',
	outputDir: 'h_buy', // 打包的目录
	// lintOnSave: true, // 在保存时校验格式
	// productionSourceMap: true, // 生产环境是否生成 SourceMap
	devServer: {
		host: '0.0.0.0',
		port: 8086,
		disableHostCheck: false,
	},
  
	// css: {
  //   loaderOptions: {
  //     less: {
  //       // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
  //       lessOptions: {
  //         modifyVars: {
  //           // 直接覆盖变量
  //           'text-color': '#111',
  //           'border-color': '#eee',
  //           // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
  //           hack: `true; @import "your-less-file-path.less";`,
  //         },
  //       },
  //     },
  //   },
  // },
};
