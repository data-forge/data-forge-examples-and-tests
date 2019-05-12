import { DataFrame } from 'data-forge';


let df = new DataFrame({
    columnNames: ['rgb'],
    rows: [[255, 0, 0], [0, 255, 0], [0, 0, 255]].map(el => [el]),
    index: [0, 10, 20],
});
df = df.generateSeries({
    hex: row => rgbToHex(row.rgb),
});

const interpolatedDf = df.fillGaps(
    (pairA, pairB) => pairB[0] - pairA[0] > 1,
    (pairA, pairB) => {
        const [ indexA, { rgb: rgbA } ] = pairA;
        const [ indexB, { rgb: rgbB } ] = pairB;
        const gapSize = indexB - indexA;
        const output = [];
        for (let i = 1; i < gapSize; i++) {
            const rgb = interpolateColor(rgbA, rgbB, i / gapSize);
            const hex = rgbToHex(rgb);
            output.push([indexA + i, {rgb, hex}]);
        }
        return output;
    }
);

drawDf('colors', df);
drawDf('interpolated_colors', interpolatedDf);


function drawDf(containerId, df) {
    const container = document.getElementById(containerId);
    const size = 50;
    let x = 0;
    for (const { hex } of df) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'height', size);
        rect.setAttributeNS(null, 'width', size);
        rect.setAttributeNS(null, 'fill', hex);
        container.appendChild(rect);
        x += size;
    }
}

function interpolateColor(rgbA, rgbB, factor=0.5) {
    const result = [];
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(rgbA[i] + factor * (rgbB[i] - rgbA[i]));
    }
    return result;
}

function rgbToHex(rgb) {
    return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
}
