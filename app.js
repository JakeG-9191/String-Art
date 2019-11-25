const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
let myCoords;
let myDirs = {
    x1: "neg",
    y1: "neg",
    x2: "pos",
    y2: "pos"
}
let myHue = 180;
let myLight = 50;
let timeoutId;
let count = 0;

initialize();
window.addEventListener("resize", initialize)

initialize = () => {
    clearTimeout(timeoutId);
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    myCoords = {
        x1: Math.floor(Math.random() * canvas.width),
        y1: Math.floor(Math.random() * canvas.height),
        x2: Math.floor(Math.random() * canvas.width),
        y2: Math.floor(Math.random() * canvas.height),
    }
    c.lineWidth = 3;
    c.lineCap = "round";
    drawing();
}

drawing = () => {
    if (count > 500) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        count = 0;
    }
    count ++;
    c.beginPath();
    c.moveTo(myCoords.x1, myCoords.y1);
    c.lineTo(myCoords.x2, myCoords.y2);
    c.strokeStyle = `hsl(${myHue}, ${myLight}%, 85%)`;
    myHue = myHue + 5;
    if (myHue > 360) {
        myHue = 0;
    }
    c.stroke();

    const x1dir = myDirs.x1;
    const y1dir = myDirs.y1;
    const x2dir = myDirs.x2;
    const y2dir = myDirs.y2;

    ["x1", "y1", "x2", "y2"].forEach((point) => {
        if (myDirs[point] === "neg" && myCoords[point] < 0) {
            myDirs[point] = "pos";
        } else if (point[0] === "y" && myCoords[point] > canvas.height) {
            myDirs[point] = "neg";
        } else if (point[0] === "x" && myCoords[point] > canvas.width) {
            myDirs[point] = "neg"
        }
        if (myDirs[point] === "neg") {
            myCoords[point] = myCoords[point] - 25;
        } else {
            myCoords[point] = myCoords[point] + 25;
        }
    })
    timeoutId = setTimeout(() => drawing(), 200);
}
