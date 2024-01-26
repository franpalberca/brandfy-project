import {SET_COMPANY_NAME, SET_FILE} from './actions';

type State = {
    companyName: string;
    file: File | null;
};

const initialState: State = {
    companyName: '',
    file: null,
};
interface SetCompanyNameAction {
	type: typeof SET_COMPANY_NAME;
	payload: string;
}

interface SetFileAction {
	type: typeof SET_FILE;
	payload: File;
}

type ActionTypes = SetCompanyNameAction | SetFileAction;

const reducer = (state: State = initialState, action: ActionTypes): State => {
	switch (action.type) {
		case SET_COMPANY_NAME:
			return {
				...state,
				companyName: action.payload,
			};
		case SET_FILE:
			return {
				...state,
				file: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
