import routeUrl from './routeUrl';

type SidebarMenuItem = {
  id: number;
  title: string;
  route: string;
  isActive: boolean;
};

const simple_sidebar_menu: SidebarMenuItem[] = [
  {
    id: 1,
    title: 'Peran & Izin',
    route: routeUrl.peranIzin,
    isActive: true
  },
  {
    id: 2,
    title: 'Data Klien',
    route: routeUrl.dataKlien,
    isActive: false
  },
  {
    id: 3,
    title: 'Social Media Account',
    route: routeUrl.socialMediaAccount,
    isActive: false
  },
  {
    id: 4,
    title: 'Marketplace',
    route: routeUrl.marketplace,
    isActive: false
  },
  {
    id: 5,
    title: 'Data Usaha',
    route: routeUrl.dataUsaha,
    isActive: false
  },
  {
    id: 6,
    title: 'Latar Belakang Perusahaan',
    route: routeUrl.latarBelakangPerusahaan,
    isActive: false
  },
  {
    id: 7,
    title: 'Product atau Services',
    route: routeUrl.productOfService,
    isActive: false
  },
  {
    id: 8,
    title: 'Market & Segmentation',
    route: routeUrl.marketSegmentation,
    isActive: false
  },
  {
    id: 9,
    title: 'SWOT Analysis',
    route: routeUrl.swotAnalysis,
    isActive: false
  },
  {
    id: 10,
    title: 'Preferensi Talent',
    route: routeUrl.preferensiTalent,
    isActive: false
  },
  {
    id: 11,
    title: 'Content Guidelines',
    route: routeUrl.contentGuidelines,
    isActive: false
  },
  {
    id: 12,
    title: 'Terms & Conditions',
    route: routeUrl.termsCondition,
    isActive: false
  },
  {
    id: 13,
    title: 'Talent Assignment',
    route: routeUrl.talentAssigment,
    isActive: false
  },
];


export default simple_sidebar_menu;