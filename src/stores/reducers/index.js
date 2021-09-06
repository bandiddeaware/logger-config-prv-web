import initialState from './state'

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN':
      return Object.assign({}, state, {
        AccessToken: action.payload
      })
    case "DEVICE":
      return Object.assign({}, state, {
        Device: action.payload
      })
    case "PROVINCE": 
      return Object.assign({}, state, {
        Province: action.payload
      })
    case "USERINFO":
      return Object.assign({}, state, {
        UserInfo: action.payload
      })
    case "DETAIL":
      return Object.assign({}, state, {
        Detail: action.payload
      })
    case "MODBUS": 
      return Object.assign({}, state, {
        Modbus: action.payload
      })
    case "CONFIG": 
      return Object.assign({}, state, {
        Config: action.payload
      })
    case "QUERY":
      return Object.assign({}, state, {
        Query: action.payload
      })
    case "ISSEARCH":
      return Object.assign({}, state, {
        isSearch: action.payload
      })
      case "POINTINSTALL": 
      return Object.assign({}, state, {
        PointInstall: action.payload
      })
    case "DMA": 
      return Object.assign({}, state, {
        DMA: action.payload
      })
    default:
      return state
  }
}
