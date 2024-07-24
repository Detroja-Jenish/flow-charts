function dragInit(div) {
    target = div
}

function drag(e) {
    if (target) {
        consoleDiv.innerHTML = window.scrollX
        const { x, y } = getMouseCoridinates(e)
        target.style.top = `${window.scrollY+y}px`
        target.style.left = `${window.scrollX+x}px`
        if (target in lineRegister) {
            lines = lineRegister[target]
            for (line of lines) {
                line.position()
            }
        }
    }
}

function getMouseCoridinates(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else {
        return { x: e.clientX, y: e.clientY }
    }
}