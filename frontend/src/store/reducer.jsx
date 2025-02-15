const initialState = {
	navTab_List: [],
	navOrgName:'',
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'textChanged':
			let fName = action.payload.target.name
			let fValue = action.payload.target.value
			return {
				...state,
				[fName]: fValue
			};
		case 'textRemove':
			let fn = action.payload.target.id
			delete state[fn]
			return state;
		case 'navTab':
			return {
				...state,
				navTab_List: [...state.navTab_List, action.payload]
			};
		case 'navTabUpdate':
			return {
				...state,
				navTab_List: []
			};
		case 'submit':
			return {
				...state,
				submitStatus: action.payload.target.id
			};
		case 'orgSelected':
			return {
				...state,
				navOrgName: action.payload
			};
		case 'adminAccess':
			return {
				...state,
				adminAccess: action.payload
			};

		default:
			return state;
	}
}


export default reducer;
