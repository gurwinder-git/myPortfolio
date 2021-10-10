const initialState = {
    dataFetchLoading: false,
    pageNumber: 1,
    projects: []
}

function adminProjectsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                ...state,
                pageNumber: state.pageNumber + 1,
                projects: state.projects.concat(action.projects),
                dataFetchLoading: false
            }

        case 'START_FETCHING':
            return {
                ...state,
                dataFetchLoading: true
            }
        default:
            return state
    }
}

export default adminProjectsReducer