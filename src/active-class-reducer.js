const activeClass = (state = '', action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_CLASS':
      return {...state, activeClass: payload.activeClass}
    default:
      return state;
  }
}

export default activeClass
