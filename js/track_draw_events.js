Java.perform(() => {
    const ViewGroup = Java.use("android.view.ViewGroup")
    const View = Java.use("android.view.View")

    onDrawImpl = function(canvas) {
        const drawObj = new Object()
        drawObj["type"] = "onDraw"
        drawObj["from"] = this.getClass().getSimpleName()
        send(drawObj)
        this.onDraw(canvas)
    }

    dispatchDrawImpl = function(canvas) {
        const drawObj = new Object()
        drawObj["type"] = "dispatchDraw"
        drawObj["from"] = this.getClass().getSimpleName()
        send(drawObj)
        this.dispatchDraw(canvas)
    }

    View.onDraw.implementation = onDrawImpl
    View.dispatchDraw.implementation = dispatchDrawImpl

    ViewGroup.onDraw.implementation = onDrawImpl
    ViewGroup.dispatchDraw.implementation = dispatchDrawImpl
})
