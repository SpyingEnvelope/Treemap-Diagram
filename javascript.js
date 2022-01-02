$(document).mousemove(function(event) {
    $('#tooltip').css('left', event.clientX + 'px').css('top', event.clientY + 'px')
})

let svg;
let legendSvg;
let yScale;
let vgData;
let treemap;
let bandScale = ['Wii', 'X360', 'XOne', 'PSP', 'XB', 'PS', 'N64', '3DS', 'PS4', 'GBA', 'SNES', 'PS2', 'PS3', 'DS', 'GB', 'NES', '2600', 'PC']

const w = 1100;
const h = 1000;

fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then(response => response.json())
    .then(response => {
        vgData = response;
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
                   .attr('transform', (d) => `translate(${d.x0}, ${d.y0})`);
                   
    let rectCells = cells.append('rect')
                         .attr('class','tile')
                         .attr('fill', (d) => tileFiller(d.data.category))
                         .attr('data-name', (d) => d.data.name)
                         .attr('data-category', (d) => d.data.category)
                         .attr('data-value', (d) => d.data.value)
                         .attr('width', (d) => d.x1 - d.x0)
                         .attr('height', (d) => d.y1 - d.y0)
                         .on('mouseover', (event) => tooltip.style('opacity', '0.8').attr('data-value', event.currentTarget.dataset.value).html(`${event.currentTarget.dataset.name} <br> ${event.currentTarget.dataset.category} <br> <b>Value:</b> ${event.currentTarget.dataset.value}`))
                         .on('mouseout', () => tooltip.style('opacity', '0'));
    
    const textCells = cells.append('text').text((d) => d.data.name).attr('x', '5').attr('y', '20').attr('class', 'small-font');

    legendSvg = d3.select('#legend')
                  .append('svg')
                  .attr('width', 200)
                  .attr('height', 700);

    let yScale = d3.scaleBand().domain(bandScale).range([180, 680]);

    const legendY = d3.axisLeft(yScale);

    legendSvg.append('g').attr('transform', `translate(75, -150)`).call(legendY);

    legendSvg.selectAll('rect')
             .data(bandScale)
             .enter()
             .append('rect')
             .attr('width', 20)
             .attr('height', 20)
             .attr('fill', (d) => tileFiller(d))
             .attr('y',(d) => yScale(d) - 150)
             .attr('x', 85)
             .attr('class', 'legend-item');

     const tooltip = d3.select('#canvas-div').append('div').attr('id', 'tooltip').style('position', 'absolute');
    
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
            return 'teal';
        case 'PS':
            return '#DEB887';
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
        case 'PC':
            return 'gray'
    }
}