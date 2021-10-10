import axios from '../../axios'

const setProjects = (data) => {
    return {
        type: 'SET_PROJECTS',
        projects: data
    }
}

const fetchProjects = (redirectFunc) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'START_FETCHING' })
        const page = getState().adminProjects.pageNumber

        try {
            const result = await axios.get(`/admin/get/projectsAPI?page=${page}&limit=5`)
            if (result.data.error) {
                redirectFunc('/admin/login')
            } else {
                dispatch(setProjects(result.data))
            }
        }
        catch (error) {
            redirectFunc('/admin/login')
            console.log('[Admin projects] catch', error)
        }
    }
}

export { fetchProjects }