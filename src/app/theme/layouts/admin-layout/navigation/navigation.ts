export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: '',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Trang chủ',
        type: 'item',
        classes: 'nav-item',
        url: 'dashboard',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'management',
    title: 'Quản lý',
    type: 'group',
    icon: 'setting',
    children: [
      {
        id: 'post',
        title: 'Quản lý bài viết',
        type: 'item',
        classes: 'nav-item',
        url: 'posts',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'doctor',
        title: 'Quản lý bác sĩ',
        type: 'item',
        classes: 'nav-item',
        url: 'doctors',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'seller',
        title: 'Quản lý cửa hàng',
        type: 'item',
        classes: 'nav-item',
        url: 'sellers',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'pet-owner',
        title: 'Quản lý chủ vật nuôi',
        type: 'item',
        classes: 'nav-item',
        url: 'pet-owner',
        icon: 'profile',
        breadcrumbs: false
      }
    ]
  }
];
