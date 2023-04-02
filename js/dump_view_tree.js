Java.perform(() => {
    const DecorViewClass = "com.android.internal.policy.DecorView"
    const ViewGroup = Java.use("android.view.ViewGroup")
    const View = Java.use("android.view.View")

    const FIELDS = [
        "mPrivateFlags",
        "mSuppressLayout",
        "mCurrentPage"
    ]

    function dumpViewProperties(view) {
        const viewObject = new Object()
        dumpFields(view, FIELDS, viewObject)
        const isViewGroup = ViewGroup.class.isInstance(view)
        if (isViewGroup) {
            viewObject["children"] = []
            const vg = Java.cast(view, ViewGroup)
            const childCount = vg.getChildCount()
            for (var i = 0; i <= childCount; ++i) {
                const child = vg.getChildAt(i)
                if (child == null) {
                    continue
                }
                const childObject = dumpViewProperties(child)
                viewObject["children"][i] = childObject
            }
        }
        return viewObject
    }

    function dumpFields(view, fields, object) {
        object["object"] = view.toString()
        for (var i = 0; i < fields.length; ++i) {
            dumpClassField(view, fields[i], object)
        }
    }

    function dumpClassField(view, fieldName, outObject) {
        var clazz = view.getClass()
        while (View.class.isAssignableFrom(clazz)) {
            try {
                const field = clazz.getDeclaredField(fieldName)
                field.setAccessible(true)
                const value = field.get(view)
                outObject[field.getName()] = value == null ? null : value.toString()
                break
            } catch (error) {
                clazz = clazz.getSuperclass()
            }
        }
    }

    Java.choose(DecorViewClass, {
        onMatch: function(instance) {
            const viewTree = dumpViewProperties(instance)
            const viewTreeStr = JSON.stringify(viewTree)
            send(viewTreeStr)
        },
        onComplete: function() {
        }
    })
})
