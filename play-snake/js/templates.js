const Templates = {
    scoreboard: function() {
        return {
            tag: 'div',
            classes: ['sb-container'],
            children: [
                { tag: 'div', classes: ['time-label'], children: [{ tag: 'p', content: game.time }] },
                { tag: 'div', classes: ['score-label'], children: [{ tag: 'p', content: game.score }] },
                { tag: 'div', classes: ['highscore-label'], children: [{ tag: 'p', content: game.highscore }] },
                { tag: 'div', classes: ['speed-label'], children: [{ tag: 'p', content: game.speed }] }
            ]
        };
    },
    grid: function() {
        // Create cell objects and append to cells array
        let cells = [];
        const snakeParts = this.snakeParts();
        for (let y = 0; y < game.cc**0.5; y++) {
            for (let x = 0; x < game.cc**0.5; x++) {
                let entities = [];
                // Add snakepart if there is any that matches the cell's position
                const indx = snake.pos.findIndex(p => p.x == x && p.y == y); {
                    if (indx != -1) entities.push(snakeParts[indx]);
                }
                // Add candy if it matches the cell's position
                if (candy.pos.x == x && candy.pos.y == y && game.isOn) entities.push(this.candy());
                const cellObj = {
                    tag: 'div',
                    classes: [].concat('gridcell', (y%2) ? [] : 'odd-row'),
                    attributes: { x: x, y: y },
                    children: entities ?? []
                };
                cells.push(cellObj);
            }
        }
        const overlay = (!game.isOn) ? { tag: 'div', classes: ['overlay'] } : [];
        return { tag: 'div', classes: ['grid'], children: [].concat(cells, overlay, this.pressToStart()) };
    },
    snakeBodyParts: function() {
        // Create snake bodypart objects and append to parts array
        let parts = [];
        for (let i = 1; i < snake.pos.length-1; i++) {
            let object = {
                tag: 'div',
                classes: ['snake', 'snake-body', snake.color, `direction-${snake.direction}`],
                attributes: { x: snake.pos[i].x, y: snake.pos[i].y }
            };
            parts.push(object);
        }
        return parts;
    },
    snakeParts: function() {
        return [].concat({
              tag: 'div',
              classes: ['snake', 'snake-head', snake.color, `direction-${snake.direction}`],
              children: [
                  { tag: 'div', classes: ['snake-eye', 'eye--first'] },
                  { tag: 'div', classes: ['snake-eye', 'eye--second'] }
              ],
              attributes: { x: snake.pos[0].x, y: snake.pos[0].y }
            },
            (snake.pos.length > 2) ? this.snakeBodyParts() : [],
            {
              tag: 'div',
              classes: ['snake', 'snake-end', snake.color, `direction-${snake.direction}`],
              attributes: { 
                  x: snake.pos[snake.pos.length-1].x,
                  y: snake.pos[snake.pos.length-1].y
                }
            }
        );
    },
    candy: function() {
        return {
            tag: 'div',
            classes: ['candy'],
            attributes: { x: candy.pos.x, y: candy.pos.y }
        };
    },
    pressToStart: function() {
        return {
            tag: 'div',
            classes: ['pts-label'],
            children: [
                { tag: 'p', content: 'PRESS ' },
                { tag: 'p', content: 'OR' },
                { tag: 'p', content: 'TO' }
            ]
        };
    },
    gameContainer: function() {
        return {
            tag: 'div',
            classes: ['container'],
            children: [
                this.scoreboard(),
                this.grid()
            ]
        };
    }
}