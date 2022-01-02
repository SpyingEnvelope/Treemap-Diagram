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
                   .append('g');
}