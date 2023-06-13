import { icon_list } from 'assets/image';
import routeUrl from './routeUrl';
import route_list from './routeUrl';


type Child = {
  title: string;
  route: string;
}

type MenuItem = {
  title: string;
  icon: string;
  route: string;
  isOrdinaryMenu?: boolean;
  child?: Child[];
}

type SidebarMenuItem = {
  label: string;
  menu: MenuItem[];
};

const sidebarMenu: SidebarMenuItem[] = [
  {
    label: 'Overview',
    menu: [
      {
        title: 'Dashboard',
        icon: icon_list.sidebar_dashboard,
        route: route_list.home
      },
    ]
  },
  {
    label: 'ORDER',
    menu: [
      {
        title: 'SMM',
        icon: '',
        route: route_list.home,
        child: [
          {
            title: 'All',
            route: route_list.home,
          },
          {
            title: 'Order Selesai',
            route: route_list.home,
          },
          {
            title: 'Order Baru',
            route: route_list.home,
          },
          {
            title: 'Order Tertahan',
            route: route_list.home,
          },
          {
            title: 'Order Overload',
            route: route_list.home,
          },
          {
            title: 'Order Batal/Ditolak',
            route: route_list.home,
          },
        ]
      },
      // {
      //   title: 'KOL',
      //   icon: '',
      //   route: routeUrl.order_kol,
      //   child: [
      //     {
      //       title: 'All',
      //       route: routeUrl.order_kol_all
      //     },
      //   ]
      // },
     
    ]
  },
  {
    label: 'Jadwal Campaign',
    menu: [
      {
        title: 'Kalender',
        icon: '',
        route: routeUrl.home,
        isOrdinaryMenu: true
      },
      {
        title: 'Pengaturan Jadwal',
        icon: '',
        route: routeUrl.home,
        isOrdinaryMenu: true
      },
      {
        title: 'Managemen Campaign',
        icon: '',
        route: routeUrl.home,
        isOrdinaryMenu: true
      },
    ]
  },
  // {
  //   label: 'Feature',
  //   menu: [
  //     {
  //       title: 'Statistik',
  //       icon: '',
  //       route: routeUrl.feature_statistik,
  //       child: [
  //         {
  //           title: 'View Statistik',
  //           route: routeUrl.feature_statistik_view_statistik
  //         },
  //       ]
  //     },
  //     {
  //       title: 'Schedule',
  //       icon: '',
  //       route: routeUrl.feature_schedule,
  //       child: [
  //         {
  //           title: 'View Schedule List',
  //           route: routeUrl.feature_schedule_view_schedule_list
  //         },
  //       ]
  //     },
  //     {
  //       title: 'Lead List',
  //       icon: '',
  //       route: routeUrl.feature_lead_lists,
  //       child: [
  //         {
  //           title: 'View Leads List',
  //           route: routeUrl.feature_lead_lists_all_lead_lists
  //         },
  //       ]
  //     },
  //   ]
  // },
  {
    label: 'Pengaturan',
    menu: [
      {
        title: 'Peran & Izin',
        icon: '',
        route: routeUrl.home,
        isOrdinaryMenu: true
      },
      {
        title: 'Pengaturan Akun',
        icon: '',
        route: routeUrl.home,
        isOrdinaryMenu: true
      },
       
    ]
  },
]

export default sidebarMenu;