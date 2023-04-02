Java.perform(() => {
    const ViewGroup = Java.use("android.view.ViewGroup")
    const View = Java.use("android.view.View")
    const vgDispatchTouchEvent = ViewGroup.dispatchTouchEvent.overload("android.view.MotionEvent")
    const viewDispatchTouchEvent = View.dispatchTouchEvent.overload("android.view.MotionEvent")

    dispatchFunImpl = function(event) {
        const dispatchObj = new Object()
        dispatchObj["event_type"] = event.getActionMasked()
        dispatchObj["event_id"] = event.getId()
        dispatchObj["dispatched_class"] = this.getClass().getSimpleName()
        send(dispatchObj)

        const dispatched = this.dispatchTouchEvent(event)

        return dispatched
    }

    vgDispatchTouchEvent.implementation = dispatchFunImpl
    viewDispatchTouchEvent.implementation = dispatchFunImpl
})
