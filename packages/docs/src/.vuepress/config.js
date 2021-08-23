const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    base: isProd ? '/mamba/' : '/',
    plugins: [
        // ['@vuepress/search', {
        //     searchMaxSuggestions: 10
        // }],
        '@vuepress/register-components',
        '@vuepress/nprogress',
        '@vuepress/back-to-top',
        '@vuepress/active-header-links'
    ],
    lang: 'zh-CN',
    title: 'Mamba',
    description: '聚合框架&平台同构解决方案',
    themeConfig: {
        navbar: [
            { text: '指南', link: '/guide/' },
            { text: '基础类', link: '/clients/' },
            { text: '内置组件', link: '/components/' },
            { text: 'Git', link: 'https://github.com/LengYXin/mamba' },
        ],
        sidebar: {
            '/guide/': [
                {
                    isGroup: true,
                    // text: '指南',
                    children: [
                        '/guide/README.md',
                        '/guide/dependencies.md',
                        '/guide/specification.md',
                        '/guide/architecture.md',
                        '/guide/packages.md',

                    ],
                },
            ],
            '/clients/': [
                '/clients/README.md',
                {
                    isGroup: true,
                    text: 'Controller',
                    children: [
                        '/clients/controller/basesOptions.md',
                        '/clients/controller/baseModel.md',
                        '/clients/controller/basesController.md',
                        '/clients/controller/basesDetails.md',
                        '/clients/controller/basesPagination.md',
                        '/clients/controller/system.md',
                    ],
                },
                {
                    isGroup: true,
                    text: 'Helpers',
                    children: [
                        '/clients/helpers/ajaxBasics.md',
                        '/clients/helpers/encryption.md',
                        '/clients/helpers/regulars.md',
                    ],
                },
            ],
            '/components/': [
                {
                    isGroup: true,
                    // text: 'Reference',
                    children: [
                        '/components/README.md',
                        '/components/react.md',
                        '/components/vue.md',
                        '/components/taro.md',
                    ],
                },
            ],
        },
    }
}