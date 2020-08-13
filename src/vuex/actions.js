//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}
export const setMainAccountDetailUid = (context, uid)=>{ // num为参数
    context.commit('setMainAccountDetailUid',uid)
}