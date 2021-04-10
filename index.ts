let WIDTH: number = 240;
let HEIGHT: number = 136;
let DEAD: number = 1;
let ALIVE: number = 9;

interface Grid {
    current: Array<number>,
    previous: Array<number>,
}

enum Status {
    pause,
    play,
}

let grid: Grid = {
    current: [],
    previous: [],
}

let status: Status = Status.pause;

function generate() {
    for (let i: number = 0; i < (WIDTH * HEIGHT); i++) {
        grid.current[i] = Math.random() > 0.6 ? 1 : 0;
        grid.previous[i] = grid.current[i];
        poke4(i, grid.current[i] ? ALIVE : DEAD);
    }
}

function update() {
    // Swap arrays
    let new_prev: Array<number> = grid.current;
    grid.current = grid.previous;
    grid.previous = new_prev;
    for (let i: number = 0; i < (WIDTH * HEIGHT); i++) {
        let alive_neighbours = 0;

        alive_neighbours += grid.previous[i - WIDTH - 1]
        alive_neighbours += grid.previous[i - WIDTH]
        alive_neighbours += grid.previous[i - WIDTH + 1]

        alive_neighbours += grid.previous[i - 1]
        alive_neighbours += grid.previous[i + 1]

        alive_neighbours += grid.previous[i + WIDTH - 1]
        alive_neighbours += grid.previous[i + WIDTH]
        alive_neighbours += grid.previous[i + WIDTH + 1]

        if (alive_neighbours === 3) {
            grid.current[i] = 1;
            poke4(i, ALIVE);
        } else if (alive_neighbours === 2 && grid.previous[i]) {
            grid.current[i] = 1;
            poke4(i, ALIVE);
        } else {
            grid.current[i] = 0;
        }
    }
}

generate();

function TIC(): void {
    if (status === Status.pause) {
        rect((WIDTH - 94) / 2, (HEIGHT - 10 - 10) / 2, 94, 10, 0)
        print('Press A to start', (WIDTH - 90) / 2, (HEIGHT - 10 - 6) / 2, 15)

        rect((WIDTH - 94) / 2, (HEIGHT + 10 - 10) / 2, 94, 10, 0)
        print('and B to restart', (WIDTH - 90) / 2, (HEIGHT + 10 - 6) / 2, 15)
    }

    if (status === Status.play) {
        cls(DEAD)
        update()
    }

    if (btnp(4)) {
        status = status === Status.pause ? Status.play : Status.pause;
    }
    if (btnp(5)) {
        generate();
    }
}
