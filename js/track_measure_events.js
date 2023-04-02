Java.perform(() => {
    const ViewGroup = Java.use("android.view.ViewGroup")
    const View = Java.use("android.view.View")
    const MeasureSpec = Java.use("android.view.View$MeasureSpec")

    function getSize(measureSpec) {
        return MeasureSpec.getSize(measureSpec)
    }

    function getMode(measureSpec) {
        return MeasureSpec.getMode(measureSpec)
    }

    measureImpl = function(widthSpec, heightSpec) {
        const measureObj = new Object()
        measureObj["type"] = "measure"
        measureObj["from"] = this.getClass().getSimpleName()
        measureObj["width_size"] = getSize(widthSpec)
        measureObj["height_size"] = getSize(heightSpec)
        measureObj["width_mode"] = getMode(widthSpec)
        measureObj["height_mode"] = getMode(heightSpec)
        send(measureObj)
        this.measure(widthSpec, heightSpec)
    }

    onMeasureImpl = function(widthSpec, heightSpec) {
        const measureObj = new Object()
        measureObj["type"] = "onMeasure"
        measureObj["from"] = this.getClass().getSimpleName()
        measureObj["width_size"] = getSize(widthSpec)
        measureObj["height_size"] = getSize(heightSpec)
        measureObj["width_mode"] = getMode(widthSpec)
        measureObj["height_mode"] = getMode(heightSpec)
        send(measureObj)
        this.onMeasure(widthSpec, heightSpec)
    }

    View.measure.implementation = measureImpl
    View.onMeasure.implementation = onMeasureImpl

    ViewGroup.measure.implementation = measureImpl
    ViewGroup.onMeasure.implementation = onMeasureImpl
})
