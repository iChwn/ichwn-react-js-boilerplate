import { useNavigate, useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import {
	Sidebar,
	Menu,
	MenuItem,
	SubMenu,
} from 'react-pro-sidebar'
// import { icon_list } from 'assets/image'
import sidebarMenu from 'constant/sidebarMenu'

type SidebarProps = {
	collapsed: boolean
	toggled: boolean
	handleToggleSidebar: (e: boolean) => void
	handleCollapsedChange: () => void
}

const setMenuHandler = (
	currentRoute: string,
	nextRoute: string,
	isOpen: boolean
) => {
	if (currentRoute === nextRoute) {
		return isOpen
	} else if (currentRoute !== nextRoute) {
		return true
	} else {
		return false
	}
}

const SidebarComponent: React.FC<SidebarProps> = ({
	collapsed,
	toggled,
	handleToggleSidebar,
	handleCollapsedChange,
}) => {
	const [item_route, setItemRoute] = useState('/')
	const [is_menu_open, setMenuOpen] = useState<boolean>(false)
	const navigate = useNavigate()
	const location = useLocation()
	const splited_location = `/${location.pathname.split('/')[2]}`

	const setActiveMenu = (route: string) => {
		if (route !== '/') {
			return location.pathname.includes(route) ? 'active' : ''
		} else {
			return location.pathname === route ? 'active' : ''
		}
	}

	return (
		<Sidebar
			collapsed={collapsed}
			toggled={toggled}
			breakPoint='md'
			// onToggle={handleToggleSidebar}
		>
			{sidebarMenu.map((result, index) => {
				return (
					<div key={`sidebar-parent-${index}`}>
						<div className='px-6 mt-4'>
							<span className='font-[600] text-xs uppercase'>
								{result.label}
							</span>
							{result.menu.map((item, index) => {
								return !item.child ? (
									<Menu
										key={`menu-lv1-${index}`}
										className={`${
											item.isOrdinaryMenu ? 'pb-0i' : 'bordered-menu'
										}`}
										// iconShape='circle'
									>
										<MenuItem
											onClick={() => navigate(item.route)}
											icon={<img className='w-[18px]' src={item.icon} alt='' />}
											className={`standalone-menu ${setActiveMenu(item.route)}`}
										>
											<span className='ml-2'>{item.title}</span>
										</MenuItem>
									</Menu>
								) : (
									<Menu
										key={`menu-lv1-${index}`}
										// iconShape='circle'
										className='parent-standalone-menu'
									>
										<SubMenu
											label={<span className='ml-2'>{item.title}</span>}
											icon={<img className='w-[18px]' src={item.icon} alt='' />}
											className={`standalone-menu ${
												item.route
													.toLowerCase()
													.includes(splited_location.toLowerCase()) && 'active'
											}`}
											// defaultOpen={splited_location === item.route}
											open={item_route === item.route && is_menu_open}
											onOpenChange={() => {
												const isOpen = setMenuHandler(
													item_route,
													item.route,
													!is_menu_open
												)
												setMenuOpen(isOpen)
												setItemRoute(item.route)
											}}
										>
											{item.child.map((child, index) => {
												return (
													<MenuItem
														onClick={() => {
															setItemRoute(item.route)
															navigate(child.route)
														}}
														key={`menu-lv2-${index}`}
														className={`standalone-dropdown ${
															location.pathname
																.toLowerCase()
																.includes(child.route.toLowerCase()) && 'active'
														}`}
													>
														{child.title}
													</MenuItem>
												)
											})}
										</SubMenu>
									</Menu>
								)
							})}
						</div>
					</div>
				)
			})}
		</Sidebar>
	)
}

export default SidebarComponent
