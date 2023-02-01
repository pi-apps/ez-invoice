import { MenuItemsType } from '@phamphu19498/pibridge_uikit';


export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: () => MenuItemsType[] = () => [
    {
        label: "Home",
        icon: 'Home',
        href: '/',
    },
    {
        label: "Invoice",
        icon: 'Invoice',
        href: '/invoice',
    },
    {
        label: "Account",
        icon: 'Account',
        href: '/account',
    },
]

export default config 
