// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: 'views/redirect/index',
      },
    ],
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true,
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true,
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true,
  },
  {
    path: '/',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
]

const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'permission',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'], // or you can only set roles in sub nav
        },
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission',
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin'],
        },
      },
    ],
  },

  {
    path: '/example',
    component: 'layout/Layout',
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: 'views/table/index',
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: 'views/tree/index',
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },

  {
    path: '/nested',
    component: 'layout/Layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: 'views/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' },
          },
        ],
      },
      {
        path: 'menu2',
        component: 'views/nested/menu2/index',
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },

  {
    path: '/ellipsis',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'Ellipsis',
        component: 'views/ellipsis/index',
        meta: { title: 'Ellipsis', icon: 'el-icon-more' },
      },
    ],
  },

  {
    path: '/form',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: 'views/form/index',
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },

  {
    path: '/echarts',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'Echarts',
        component: 'views/echarts/index',
        meta: { title: 'Echarts', icon: 'el-icon-s-data' },
      },
    ],
  },

  {
    path: '/download',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'DownLoad',
        component: 'views/download/index',
        meta: { title: 'Download', icon: 'el-icon-download' },
      },
    ],
  },

  {
    path: '/directives',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'Directives',
        component: 'views/directives/index',
        meta: { title: 'Directives', icon: 'el-icon-data-analysis' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

module.exports = {
  constantRoutes,
  asyncRoutes,
}
