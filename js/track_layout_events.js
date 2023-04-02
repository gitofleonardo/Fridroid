Java.perform(() => {
    const ViewGroup = Java.use("android.view.ViewGroup")
    const View = Java.use("android.view.View")

    layoutImpl = function(l, t, r, b) {
        const layoutObj = new Object()
        layoutObj["type"] = "layout"
        layoutObj["from"] = this.getClass().getSimpleName()
        layoutObj["layoutRect"] = "[" + l + ", " + t + ", " + r + ", " + b + "]"
        send(layoutObj)
        this.layout(l, t, r, b)
    }

    onLayoutImpl = function(changed, l, t, r, b) {
        const layoutObj = new Object()
        layoutObj["type"] = "onLayout"
        layoutObj["from"] = this.getClass().getSimpleName()
        layoutObj["layoutRect"] = "[" + l + ", " + t + ", " + r + ", " + b + "]"
        layoutObj["changed"] = changed
        send(layoutObj)
        this.onLayout(changed, l, t, r, b)
    }

    View.layout.implementation = layoutImpl
    View.onLayout.implementation = onLayoutImpl

    ViewGroup.layout.implementation = layoutImpl
    ViewGroup.onLayout.implementation = onLayoutImpl
})
