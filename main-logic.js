document.addEventListener("DOMContentLoaded", () => {
    drawLineBtn.addEventListener("click", () => {
        isDrawLine = !isDrawLine;
    })

    const addShape = () => {

        const div = genrateShape(shape.value)
        main.appendChild(div);
        msg.value = ""
        anchor_link.value = ""
        div.addEventListener("mousedown", (e) => {
            if(isDrawLine){
                drawLine(div)
            }else{
                dragInit(div)
            }
        })
        div.addEventListener("touchstart", (e) => {
            if (isDrawLine) {
                drawLine(div)
            } else {
                dragInit(div)
            }
        })

    }

    document.addEventListener("mousemove", drag)
    document.addEventListener("touchmove", drag)
    document.addEventListener("mouseup", (e) => {
        target = null
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

:root {
    font-size: 16px;
}

body {
    width: 300vw;
    height: 300vh;
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

    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0% 50%);

    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 255, 0, 0.31);
        border: 5px solid lime;
        top: -5px;
        left: -5px;
    }

    /* rotate: 45deg; */

}

.input-output {
    padding: 1em;
    min-width: 20px;
    min-height: 20px;
    width: "min-content";
    max-width: 30ch;
    text-align: center;
    position: absolute;
    clip-path: polygon(0 0, 90% 0, 100% 100%, 10% 100%);
    background-color: rgba(95, 158, 160, 0.312);
    /* border: 5px solid cadetblue; */
}

.selected {
    outline: 2px solid red;
    outline-offset: 5px;
}
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