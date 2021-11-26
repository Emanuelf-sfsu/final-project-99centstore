const INITIAL_STATE = {
    listing: []
  };
  
  const listingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'UPDATE_LISTING':
        return {
          ...state,
          listing: action.listing,
        };
      default:
        return state;
    }
  };
  
  export default listingReducer;