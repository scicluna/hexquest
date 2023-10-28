export function getAdjacentDirections(y: number): { x: number, y: number }[] {
    if (y % 2 === 0) {
        return [
            { x: -0.5, y: -0.5 }, // Above left for even rows
            { x: +0.5, y: -0.5 }, // Above right for even rows
            { x: 1, y: 0 },  // Directly to the right
            { x: -1, y: 0 },  // Directly to the left
            { x: -0.5, y: 0.5 }, // Below left for even rows
            { x: 0.5, y: 0.5 } // Below right for even rows
        ];
    } else {
        return [
            { x: +0.5, y: -0.5 }, // Above right for odd rows
            { x: -0.5, y: -0.5 }, // Above left for odd rows
            { x: 1, y: 0 },  // Directly to the right
            { x: -1, y: 0 },  // Directly to the left
            { x: 0.5, y: 0.5 }, // Below right for odd rows
            { x: -0.5, y: 0.5 } // Below left for odd rows
        ];
    }
};