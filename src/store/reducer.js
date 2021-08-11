import actions from './actions'

const initialState = {
	logged: (localStorage.getItem('logged') === 'true') || false,
	user: {},
	wishlist: [],
	compares: (JSON.parse(localStorage.getItem('compares'))) || [],
	path: [],
	list: false,
	faved: {}
}

export default function reducer(currentState=initialState, action){
	let c;
	switch (action.type) {
		case actions.LOG_USER:
			localStorage.setItem('logged', action.payload)
			return {
				...currentState,
				logged: !!(localStorage.getItem('logged') === 'true')
			}
			break;
		case actions.SET_DATA:
			return {
				...currentState,
				user:action.payload
			}
			break;
		case actions.ADD_COMPARE:
			c = JSON.parse(localStorage.getItem('compares')) || []
			c.push(action.payload)
			localStorage.setItem('compares', JSON.stringify(c))
			return {
				...currentState,
				compares: c
			}
			break;
		case actions.REMOVE_COMPARE:
			c = JSON.parse(localStorage.getItem('compares')) || []
			c = c.filter(pr => pr._id !== action.payload._id)
			localStorage.setItem('compares', JSON.stringify(c))
			return {
				...currentState,
				compares: c
			}
			break;
		case actions.REMOVE_ALL:
			localStorage.setItem('compares', null)
			return {
				...currentState,
				compares: []
			}
			break;
		case actions.ADD_PATH:
			return {
				...currentState,
				path: action.payload
			}
			break;
		case actions.COMPARE_LIST:
			return {
				...currentState,
				list: action.payload
			}
			break;
		case actions.SHOW_FAVED:
			return {
				...currentState,
				faved: action.payload
			}
			break;
		case actions.UP_COMPARES:
			return {
				...currentState,
				compares: action.payload
			}

	}
	return {...currentState}
}