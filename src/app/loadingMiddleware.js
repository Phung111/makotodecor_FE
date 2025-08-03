const loadingMiddleware = (store) => {
  let pendingActions = new Set()
  let timeoutId = null

  return (next) => (action) => {
    if (action.type.endsWith('/pending')) {
      pendingActions.add(action.type)

      // Nếu không có timeoutId, nghĩa là chưa có timeout đang hoạt động
      if (!timeoutId) {
        // Set timeout để set loading sau 1 giây
        timeoutId = setTimeout(() => {
          store.dispatch({ type: 'baseSlice/setLoading', payload: true })
        }, 1000) // 1 giây
      }
    }

    if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
      pendingActions = new Set()
      pendingActions.delete(action.type)

      // Nếu không còn action nào pending, xóa timeout và set loading false
      if (pendingActions.size === 0) {
        clearTimeout(timeoutId)
        timeoutId = null // Reset timeoutId
        store.dispatch({ type: 'baseSlice/setLoading', payload: false })
      }
    }

    return next(action)
  }
}

export default loadingMiddleware
