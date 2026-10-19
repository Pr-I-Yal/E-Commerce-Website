import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constant"

export default function TestimonialReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_TESTIMONIAL_RED:
            return [...state, action.payload]

        case GET_TESTIMONIAL_RED:
            return Array.isArray(action.payload) ? action.payload : [];

        case UPDATE_TESTIMONIAL_RED:
            return state.map((item) => item.id === action.payload.id ? { ...item, ...action.payload } : item);

        case DELETE_TESTIMONIAL_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
