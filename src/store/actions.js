export const GET_SCHOOLS = 'GET_SCHOOLS';

const baseURL = 'https://khulaassessmentserver.herokuapp.com/api';

export const getSchools = (page) => {
    try {
        return async dispatch => {
            const response = await fetch(`${baseURL}/schools`);
            const schools = await response.json();
            
            dispatch({
                type: GET_SCHOOLS,
                payload: schools.data
            });
        }
    } catch (error) {
        console.log(error);
    }
}