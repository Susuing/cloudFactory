import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManage from "../views/UserManage";
import UserUpdate from "../views/UserUpdate";
import ProductTypeManage from "../views/ProductTypeManage";
import Factory from "../views/Factory";
import index from "../views/index";
import ProductManage from "../views/ProductManage";
import DeviceManage from "../views/DeviceManage";
import DeviceTypeManage from "../views/DeviceTypeManage";
import OrderManage from "../views/OrderManage";
import addUser from "../views/addUser";
import DeviceUpdate from "../views/DeviceUpdate";
import DeviceTypeUpdate from "../views/DeviceTypeUpdate";
import DeviceTypeAdd from "../views/DeviceTypeAdd";
import login from "../views/login";
import Register from "../views/Register";
import CloudFactory from "../views/CloudFactory";
import Distributor from "../views/Distributor";
import FactoryManage from "../views/FactoryManage";
import ReceiveOrder from "../views/ReceiveOrder";
import Scheduling from "../views/Scheduling";
import DeviceAdd from "../views/DeviceAdd";
import ProTypeAdd from "../views/ProTypeAdd";
import ProductUpdate from "../views/ProductUpdate";
import ProTypeUpdate from "../views/ProTypeUpdate";
import ProductAdd from "../views/ProductAdd";
import MyDeviceUpdate from "../views/MyDeviceUpdate";
import MyDeviceAdd from "../views/MyDeviceAdd";
import RentDevice from "../views/RentDevice"
import FinishOrder from "../views/FinishOrder";
import Bid from "../views/Bid";
import MyOrder from "../views/MyOrder";
import AddOrder from "../views/AddOrder";
import BidChoice from "../views/BidChoice";
import OrderUpdate from "../views/OrderUpdate";
import FactoryUpdate from "../views/FactoryUpdate";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '登录',
    component: login
  },
  {
    path: '/register',
    name: '注册',
    component: Register
  },
  {
    path: '/nav1',
    name: '用户管理',
    redirect:'UserManage',
    component: index,
    show:true,
    children: [
      {
        path: '/UserManage',
        name: '用户信息',
        component: UserManage
      },
      {
        path: '/addUser',
        name: '添加用户',
        component: addUser
      }
    ]
  },
  {
    path: '/nav2',
    name: '云工厂管理',
    component: index,
    show:true,
    children: [
      {
        path: '/Factory',
        name: '云工厂',
        component: Factory
      }
    ]
  },
  {
    path: '/nav3',
    name: '产品管理',
    component: index,
    show:true,
    children: [
      {
        path: '/ProductTypeManage',
        name: '产品类别管理',
        component: ProductTypeManage
      },
      {
        path: '/ProductManage',
        name: '产品信息管理',
        component: ProductManage
      },
    ]
  },
  {
    path: '/nav4',
    name: '产能中心',
    component: index,
    show:true,
    children: [
      {
        path: '/DeviceTypeManage',
        name: '设备类别管理',
        component: DeviceTypeManage
      },
      {
        path: '/DeviceManage',
        name: '设备管理',
        component: DeviceManage
      }
    ]
  },
  {
    path: '/nav5',
    name: '订单信息',
    component: index,
    show:true,
    children: [
      {
        path: '/OrderManage',
        name: '订单信息管理',
        component: OrderManage
      }
    ]
  },
  {
    path: '/UserUpdate',
    name: '修改用户信息',
    show:false,
    component: UserUpdate
  },
  {
    path: '/FactoryUpdate',
    name: '修改工厂信息',
    show: false,
    component: FactoryUpdate
  },
  {
    path: '/DeviceUpdate',
    name: '修改设备信息',
    show:false,
    component: DeviceUpdate
  },
  {
    path: '/DeviceTypeUpdate',
    name: '修改设备类别',
    show: false,
    component: DeviceTypeUpdate
  },
  {
    path: '/DeviceAdd',
    name: '增加设备',
    show: false,
    component: DeviceAdd
  },
  {
    path: '/DeviceTypeAdd',
    name: '添加设备类别',
    show: false,
    component: DeviceTypeAdd
  },
  {
    path: '/ProductAdd',
    show: false,
    component: ProductAdd
  },
  {
    path: '/ProTypeAdd',
    show: false,
    component: ProTypeAdd
  },
  {
    path: '/ProductUpdate',
    show: false,
    component: ProductUpdate
  },
  {
    path: '/ProTypeUpdate',
    show: false,
    component: ProTypeUpdate
  },
  {
    path: '/MyDeviceUpdate',
    name: '修改我的设备',
    show: false,
    component: MyDeviceUpdate
  },
  {
    path: '/MyDeviceAdd',
    name: '添加我的设备',
    show: false,
    component: MyDeviceAdd
  },
  {
    path: '/RentDevice',
    name: '租用设备',
    show: false,
    component: RentDevice
  },
  {
    path: '/Bid',
    name: '竞标',
    show: false,
    component: Bid
  },
  {
    path: '/Scheduling',
    name: '订单排产',
    show: false,
    component: Scheduling
  },
  {
    path: '/CloudFactory',
    name: '云工厂管理员',
    redirect: 'FactoryManage',
    component: CloudFactory
  },
  {
    path: '/cnav1',
    name: '工厂管理',
    component: CloudFactory,
    redirect: 'FactoryManage',
    children: [
      {
        path: '/FactoryManage',
        name: '我的设备',
        component: FactoryManage
      }
    ]
  },
  {
    path: '/cnav2',
    name: '订单管理',
    component: CloudFactory,
    children: [
      {
        path: '/ReceiveOrder',
        name: '订单接单',
        component: ReceiveOrder
      },
      // {
      //   path: '/Scheduling',
      //   name: '订单排产',
      //   component: Scheduling
      // },
      {
        path: '/FinishOrder',
        name: '订单已中标',
        component: FinishOrder
      }
    ]
  },
  {
    path: '/Distributor',
    name: '经销商',
    component: Distributor,
    redirect:"/MyOrder",
    children:[
      {
        path: '/MyOrder',
        name: '我的订单',
        component: MyOrder
      },
      {
        path: '/AddOrder',
        name: '新建订单',
        component: AddOrder
      }
    ]
  },
  {
    path: '/BidChoice',
    name: '选标',
    show: false,
    component: BidChoice
  },
  {
    path: '/OrderUpdate',
    name: '编辑订单',
    show:false,
    component: OrderUpdate
  }
]

const routes2 = [
  {
    path: '/cnav1',
    name: '工厂管理',
    show:true,
    component: CloudFactory,
    children: [
      {
        path: '/FactoryManage',
        name: '我的设备',
        component: FactoryManage
      }
    ]
  },
  {
    path: '/cnav2',
    name: '订单管理',
    show:true,
    component: CloudFactory,
    children: [
      {
        path: '/ReceiveOrder',
        name: '订单接单',
        component: ReceiveOrder
      },
      // {
      //   path: '/Scheduling',
      //   name: '订单排产',
      //   component: Scheduling
      // },
      {
        path: '/FinishOrder',
        name: '订单已中标',
        component: FinishOrder
      }
    ]
  }
]

const routes3 = [
  {
    path: '/Distributor',
    name: '经销商',
    show:true,
    component: Distributor,
    children:[
      {
        path: '/MyOrder',
        name: '我的订单',
        component: MyOrder
      },
      {
        path: '/AddOrder',
        name: '新建订单',
        component: AddOrder
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  routes2,
  routes3
})

export default router
