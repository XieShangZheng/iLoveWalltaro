export default {
  pages: [ 'pages/index/index', 'pages/mine/mine', 'pages/post/post', 'pages/users/users', 'pages/publish/publish' ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
		list: [
			{
				pagePath: 'pages/index/index',
				text: '首页',
				iconPath: './asset/images/home.png',
				selectedIconPath: './asset/images/homeSelected.png',
			},
			{
				pagePath: 'pages/mine/mine',
				text: '我的',
				iconPath: './asset/images/mine.png',
				selectedIconPath: './asset/images/mineSelected.png',
			},
		],
	},
}
