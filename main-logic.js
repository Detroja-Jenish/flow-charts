document.addEventListener("DOMContentLoaded", () => {
    drawLineBtn.addEventListener("click", () => {
        isDrawLine = !isDrawLine;
    })

    const lineRegister = {}
    const addShape = () => {
  
        
        const div = genrateShape(shape.value)
        main.appendChild(div);
        msg.value = ""
        anchor_link.value = ""
        div.addEventListener("mousedown", (e) => {
            if (isDrawLine) {
                if(selectedDivs.includes(div)){return}
                div.classList.add("selected")
                selectedDivs.push(div);
                if (selectedDivs.length == 2) {
                    const line = new LeaderLine(
                        selectedDivs[0],
                        selectedDivs[1],
               
                    )
                    line.path = "fluid";
                    line.color = "black"
                    console.log(msg.value);
                    if(msg.value !== ""){
                        console.log("here");
                        line.middleLabel = LeaderLine.captionLabel(msg.value, { color: 'black', offset: [-50,-30] })
                    }

                    line.show();


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
            } else {
                target = div.getAttribute("id");
            }

        })

    }

    document.addEventListener("mousemove", (e) => {
        if (target != 0) {
            document.getElementById(target).style.top = `${ e.clientY }px`
            document.getElementById(target).style.left = `${ e.clientX }px`
            if (document.getElementById(target) in lineRegister) {
                lines = lineRegister[document.getElementById(target)]
                for (line of lines) {
                    line.position()
                }
            }
        }
    })
    document.addEventListener("mouseup", (e) => {
        target = 0
    })
    addBtn.addEventListener("click", addShape)


    const writeDownHtml = () => {
        const flowChartName = prompt("enter-flowchart name")
        const htmlContent = createHtmlTemplate(document.body.innerHTML, flowChartName)
        const blob = new Blob([htmlContent], { type: 'text/html' })
        const dataURL = URL.createObjectURL(blob)
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = `${flowChartName.replaceAll(" ","_")}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    download.addEventListener("click", writeDownHtml)
})

function createHtmlTemplate(data, documentName = "flow-cahrt") {
    return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentName}</title>
    <style>
    :root{
    font-size: 16px;
}

.process {
    background-color: rgba(75, 0, 130, 0.439);
    border: 5px solid rgb(75, 0, 130);
    padding: 1em;
    border-radius: 1em;
    width: "min-content";
    min-width: 20px;
    min-height: 20px;
    max-width: 30ch;
    text-align: center;
    position: absolute;
}

.start {
    height: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: black;
    position: absolute;
}

.end {
    height: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 5px solid black;
    position: absolute;
    background: radial-gradient(black 50%, white 50% 100%);
}

.desicion {
    padding: 1em;
    min-width: 20px;
    min-height: 20px;
    border-radius: 1em;
    width: "min-content";
    max-width: 30ch;
    text-align: center;
    position: absolute;
    background-color: rgba(0, 255, 0, 0.31);
    border: 5px solid lime;
    /* rotate: 45deg; */
    
}

.input-output {}
       #control-panel{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: max-content;
        gap: 16px;
       }
        #main{
            height: 100vh;
            width: 100vw;
            /* position: relative; */
        }
    </style>
    <script src="./leader-line.min.js"></script>
    
</head>

<body>
  ${data}
  </body>
  `
}