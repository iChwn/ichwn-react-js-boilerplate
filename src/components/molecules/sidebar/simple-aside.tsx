import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import SimpleSidebarContext from "utility/context/simpleSidebar"

const SimpleAside = () => {
  const location = useLocation()
  const {sidebar_items, is_open_on_mobile, dispatch}:any = useContext(SimpleSidebarContext)

  return (
		<aside
			id='logo-sidebar'
			className={`fixed top-0 left-0 z-40 md:w-64 h-screen w-full pt-[100px] transition-transform ${!is_open_on_mobile && '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0`}
			aria-label='Sidebar'
		>
      <div></div>
			<div className='h-full px-3 pb-4 overflow-y-auto bg-white'>
				<ul className='space-y-2 font-medium'>
          {sidebar_items.map((item:any, index:number) => {
            const isActive = location.pathname === item.route
            return (
              <li key={`menu-${index}`}>
                <Link
                  to={item.route}
                  className={`flex items-center p-2 ${isActive ? 'text-dark-green' : 'text-black'} rounded-lg hover:bg-gray-100`}
                  onClick={() => dispatch({type: "SetOpenOnMobile", isOpen: !is_open_on_mobile})}
                >
                  <span className={`pl-3 ${isActive && 'border-l-[3px] border-dark-green font-semibold'}`}>{item.title}</span>
                </Link>
              </li>
            )
          })}
				</ul>
			</div>
		</aside>
	)
}

export default SimpleAside
