// import { useState } from 'react'
import { SimpleAside, SimpleNavbar } from 'components'
import simple_sidebar_menu from 'constant/simpleSidebarMenu'
import { useReducer } from 'react'
import SimpleSidebarContext from 'utility/context/simpleSidebar'
import simpleSidebarReducer from 'utility/context/simpleSidebar/reducer'


const SimpleTemplate = ({children}) => {
	// const [collapsed, setCollapsed] = useState(false)
	// const [toggled, setToggled] = useState(false)

	// const handleCollapsed = () => {
	// 	setCollapsed(!collapsed)
	// }
	// const handleToggle = (value: boolean) => {
	// 	setToggled(value)
	// }

	const [{ 
    sidebar_items,
		is_open_on_mobile
  }, dispatch] = useReducer(simpleSidebarReducer, {
    sidebar_items: simple_sidebar_menu,
		is_open_on_mobile: false
  })

	return (
		<SimpleSidebarContext.Provider value={{sidebar_items, is_open_on_mobile, dispatch}}>
			<div className='h-full w-full'>
				<SimpleNavbar />
				<SimpleAside />
				<div className='p-4 sm:ml-64 h-full'>
					<div className='pt-[90px] h-full'>
						{children}
					</div>
				</div>
			</div>
		</SimpleSidebarContext.Provider>
	)
}

export default SimpleTemplate
