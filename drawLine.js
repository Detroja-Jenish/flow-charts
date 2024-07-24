function drawLine(div) {
    if (selectedDivs.includes(div)) { return }
    div.classList.add("selected")
    selectedDivs.push(div);
    if (selectedDivs.length == 2) {
        const line = new LeaderLine(
            selectedDivs[0],
            selectedDivs[1],
            {
                path: "fluid",
                color: "black",
            }
        )
        if (msg.value !== "") {

            line.middleLabel = LeaderLine.captionLabel(msg.value, { color: 'black', offset: [-50, -30] })
        }

        line.show("draw", {animOptions: {
            duration: 3000,
            timing: "linear"
        }});
        if (selectedDivs[0] in lineRegister) {
            lineRegister[selectedDivs[0]].push(line);
        } else {
            lineRegister[selectedDivs[0]] = [line];
        }
        if (selectedDivs[1] in lineRegister) {
            lineRegister[selectedDivs[1]].push(line);
        } else {
            lineRegister[selectedDivs[1]] = [line];
        }
        selectedDivs[0].classList.remove("selected")
        selectedDivs[1].classList.remove("selected")
        selectedDivs = [];
        isDrawLine = false;
    }
}