import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import KelePoolStatistics from './views/nav1/KelePoolStatistics.vue'
import KelePoolIncomeStatistics from './views/nav1/KelePoolIncomeStatistics.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import MainAccountstatistics from './views/nav2/MainAccountstatistics.vue'
import Accountstatistics from './views/nav2/Accountstatistics.vue'
import AccountstatisticsDetail from './views/nav2/AccountstatisticsDetail.vue'
import echarts from './views/charts/echarts.vue'
import ExternalConnectionstatistics from './views/nav3/ExternalConnectionstatistics.vue';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: 'kele矿池统计',
        iconCls: 'el-icon-menu',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/kelePoolStatistics', component: KelePoolStatistics, name: '矿池整体信息汇总' },
            { path: '/kelePoolIncomeStatistics', component: KelePoolIncomeStatistics, name: '矿池收益信息汇总' },
            { path: '/page5', component: Page5, name: '按币种汇总信息' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '矿工信息',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/mainAccountstatistics', component: MainAccountstatistics, name: '主账户总体统计' },
            { path: '/accountstatistics', component: Accountstatistics, name: '子账户信息列表' },
            { path: '/accountstatisticsdetail', component: AccountstatisticsDetail, name: '账户详情', hidden: true },
            { path: '/page5', component: Page5, name: '矿机详情' , hidden: true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '外接矿池统计',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/externalconnectionstatistics', component: ExternalConnectionstatistics, name: '外接矿池统计' },
            { path: '/page5', component: Page5, name: '详情页',hidden: true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '工具集',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/page6', component: Page6, name: '生成观察者地址' },
            { path: '/page4', component: Page6, name: '配置项设置' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '账户管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '新增账户' },
            { path: '/echarts', component: echarts, name: '重置密码' },
            { path: '/echarts', component: echarts, name: '权限配置' }
        ]
    },
     {
        path: '/',
        component: Home,
        name: '其他',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '使用介绍' },
            { path: '/table', component: Table, name: 'Table'},
            { path: '/form', component: Form, name: 'Form'},
            { path: '/user', component: user, name: '列表'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;