import _ from 'lodash'

type sidebarListType = {
  id: number;
  title: string;
  route: string;
  isActive: boolean;
}

type State = {
  sidebar_items: sidebarListType[];
  is_open_on_mobile: boolean;
};

type Action =
| { type: "SetActiveSidebar"; payload?: sidebarListType[]; selectedItem?: sidebarListType }
| { type: "SetOpenOnMobile"; isOpen: boolean };

function simpleSidebarReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SetActiveSidebar":
      const clone_sidebar_items = _.cloneDeep(state.sidebar_items)
      _.filter(clone_sidebar_items, (item) => {
        if (item.id === action.selectedItem?.id) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      
      return {
        ...state,
        sidebar_items: clone_sidebar_items,
      };
    case "SetOpenOnMobile":
      return {
        ...state,
        is_open_on_mobile: action.isOpen,
      };
    default:
      return state;
  }
}

export default simpleSidebarReducer