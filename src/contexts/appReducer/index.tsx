
const AppReducer = (state:any, action:any) => {
    switch (action.type) {
      case "TOGGLE_SIDEBAR": {
        return {
          ...state,
          showSidebar: !state.showSidebar,
        };
      }
      case "CHANGE_THEME":{
        return {
          ...state,
          theme:action.payload
        }
      }
    }
  };
  
  export default AppReducer;
  