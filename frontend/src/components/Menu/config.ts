import { MenuItemsType } from '@phamphu19498/pibridge_uikit';


export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: () => MenuItemsType[] = () => [
]

export default config 
