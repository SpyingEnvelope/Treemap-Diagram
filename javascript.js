let svg;
let xScale;
let yScale;
let vgData;
let treemap;

const w = 1000;
const h = 700;

const testArr = ['Wii', 'GB', 'Playstation', 'N64', 'Wii U', 'J'];

const sortedArr = testArr.sort((a, b) => {
    if (a < b) {
        return -1
    } else {
        return 1
    }
})

fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then(response => response.json())
    .then(response => {
        vgData = response;
        console.log(response);
        generateSvg();
    })

const generateSvg = () => {
    svg = d3.select('#canvas-div').append('svg').attr('width', w).attr('height', h);

    treemap = d3.treemap().size([1000, 700])

    const hierarchy = d3.hierarchy(vgData, (d) => d.children).sum((d) => d.value).sort((a, b) => {
        if (a.data.category < b.data.category) {
            return -1
        } else {
            return 1
        }
    })

    treemap(hierarchy);

    const vgLeaves = hierarchy.leaves();

    let cells = svg.selectAll('g')
                   .data(vgLeaves)
                   .enter()
                   .append('g')
                   .attr('transform', (d) => `translate(${d.x0}, ${d.y0})`)
                   .append('rect')
                   .attr('class','tile')
                   .attr('fill', (d) => tileFiller(d.data.category))
                   .attr('data-name', (d) => d.data.name)
                   .attr('data-category', (d) => d.data.category)
                   .attr('data-value', (d) => d.data.value)
                   .attr('datapoint', (d) => console.log(d))
}

const tileFiller = (name) => {
    switch (name) {
        case 'Wii':
            return '#FF7F50';
        case 'X360':
            return '#00FFFF';
        case 'XOne':
            return '#F0F8FF';
        case 'PSP':
            return '#A52A2A';
        case 'XB':
            return '#7FFFD4';
        case 'PS':
            return '#DEB8887';
        case 'N64':
            return '#8B008B';
        case '3DS':
            return '#00FF00';
        case 'PS4':
            return '#D2691E';
        case 'GBA':
            return '#7CFC00';
        case 'SNES':
            return '#D3D3D3';
        case 'PS2':
            return '#BDB76B';
        case 'PS3':
            return '#B8860B';
        case 'DS':
            return '#32CD32';
        case 'GB':
            return 'green';
        case 'NES':
            return '#708090';
        case '2600':
            return '#4682B4';
    }
}