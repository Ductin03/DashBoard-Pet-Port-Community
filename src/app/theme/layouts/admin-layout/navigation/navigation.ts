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
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
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
    title: 'Management',
    type: 'group',
    icon: 'setting',
    children: [
      {
        id: 'pet',
        title: 'Pet Management',
        type: 'item',
        classes: 'nav-item',
        url: 'pet',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'product',
        title: 'Product Management',
        type: 'item',
        classes: 'nav-item',
        url: 'product',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'post',
        title: 'Post Management',
        type: 'item',
        classes: 'nav-item',
        url: 'posts',
        icon: 'profile',
        breadcrumbs: false
      }
    ]
  }
];