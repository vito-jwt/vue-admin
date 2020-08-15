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

export const setAccountDetailAct = (context, miner_act)=>{ // num为参数
    context.commit('setAccountDetailAct',miner_act)
}