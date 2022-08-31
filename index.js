const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const height = Math.floor(Math.random() * 9) + 2
const width = Math.floor(Math.random() * 9) + 2

class Field {
  board = [[]]
  constructor(height, width) {
    this.boardHeight = height;
    this.boardWidth = width;
    this.mode = 'normal';
    this.board = [];
    this.hatPosition = [0, 0]; // (y, x)
    this.playerPosition = [0, 0]; // (y, x)
    this.status = 'playing';
  }

  // player movement
  mvRight() {
    if (this.board[this.playerPosition[0]][this.playerPosition[1] + 1] === pathCharacter) {
      this.status = 'Lose'
    } else if (this.board[this.playerPosition[0]][this.playerPosition[1] + 1] === hat) {
      this.status = 'Win'
    } else if (this.board[this.playerPosition[0]][this.playerPosition[1] + 1] === hole) {
      this.status = 'Lose'
    } else if (this.playerPosition[1] + 1 < this.board[0].length) {
      this.playerPosition[1]++;
      this.updateMap();
    } else {
      this.status = 'Lose'
    }

  }

  mvLeft() {
    if (this.board[this.playerPosition[0]][this.playerPosition[1] - 1] === pathCharacter) {
      this.status = 'Lose'
    } else if (this.board[this.playerPosition[0]][this.playerPosition[1] - 1] === hat) {
      this.status = 'Win'
    } else if (this.board[this.playerPosition[0]][this.playerPosition[1] - 1] === hole) {
      this.status = 'Lose'
    } else if (this.playerPosition[1] - 1 >= 0) {
      this.playerPosition[1]--;
      this.updateMap()
    } else {
      this.status = 'Lose'
    }

  }

  mvUp() {
    if (this.board[this.playerPosition[0] - 1][this.playerPosition[1]] === pathCharacter) {
      this.status = 'Lose'
    } else if (this.board[this.playerPosition[0] - 1][this.playerPosition[1]] === hat) {
      this.status = 'Win'
    } else if (this.board[this.playerPosition[0] - 1][this.playerPosition[1]] === hole) {
      this.status = 'Lose'
    } else if (this.playerPosition[0] - 1 >= 0) {
      this.playerPosition[0]--;
      this.updateMap()
    } else {
      this.status = 'Lose'
    }

  }

  mvDown() {
    if (this.board[this.playerPosition[0] + 1][this.playerPosition[1]] === pathCharacter) {
      this.status = 'Lose'
    } else if (this.board[this.playerPosition[0] + 1][this.playerPosition[1]] === hat) {
      this.status = 'Win'
    } else if (this.board[this.playerPosition[0] + 1][this.playerPosition[1]] === hole) {
      this.status = 'Lose'
    } else if (this.playerPosition[0] + 1 < this.board.length) {
      this.playerPosition[0]++;
      this.updateMap()
    } else {
      this.status = 'Lose'
    }

  }

  // Update map for each round
  updateMap() {
    this.board[this.playerPosition[0]][this.playerPosition[1]] = pathCharacter
  }

  //generate map
  generateMap(percentage) {
    let checkPercentage = true;
    const char = [];
    while (checkPercentage) {
      percentage = prompt('Add percentage of hole (0-100): ')
      if (percentage >= 0 && percentage <= 100) {
        for (let i = 0; i < percentage; i++) {
          char.push(hole)
        }
        while (char.length <= 100) {
          char.push(fieldCharacter)
        }
        checkPercentage = false
      }else {
        console.log('Invalid valuse for perentage')
      }
    }


    for (let i = 0; i < this.boardHeight; i++) {
      this.board.push([])
      for (let j = 0; j < this.boardWidth; j++) {
        const ranNum = Math.floor(Math.random() * char.length);
        this.board[i].push(char[ranNum]);
      }
    }


    while (this.hatPosition[0] === 0 && this.hatPosition[1] === 0) {
      let xHat = Math.floor(Math.random() * this.board[0].length);
      this.hatPosition[1] = xHat
      let yHat = Math.floor(Math.random() * this.board.length);
      this.hatPosition[0] = yHat
    }

    this.board[this.hatPosition[0]][this.hatPosition[1]] = hat


    do {
      let xPlayer = Math.floor(Math.random() * this.board[0].length);
      this.playerPosition[1] = xPlayer
      let yPlayer = Math.floor(Math.random() * this.board.length);
      this.playerPosition[0] = yPlayer
    } while (this.playerPosition[0] === this.hatPosition[0] && this.playerPosition[1] === this.hatPosition[1])


    this.board[this.playerPosition[0]][this.playerPosition[1]] = pathCharacter
  }


  // Additional for hard mode
  hardMode() {
    let xHard
    let yHard
    do {
      xHard = Math.floor(Math.random() * this.board[0].length);
      yHard = Math.floor(Math.random() * this.board.length);
    } while (this.board[yHard][xHard] !== fieldCharacter)
    this.board[yHard][xHard] = hole
  }

  // Print board
  print() {
    console.log(this.board.map(r => r.join('')).join('\n'));
  }
}


// กรณีอยากให้ user ใส่ขนาดบอร์ด --> ไป comment out แถว 8-9 ด้วย
// const height = prompt('Input field hight: ');
// const width = prompt('Input field width: ');



const myField = new Field(height, width);

myField.generateMap()
myField.print()

let mode = prompt('Game mode normal or hard: ')

while (myField.status === 'playing') {
  if (mode === 'normal') {
    const move = prompt('r(right) l(left) u(up) d(down) : ');
    console.clear()
    try {
      switch (move) {
        case 'r': myField.mvRight(); break;
        case 'l': myField.mvLeft(); break;
        case 'u': myField.mvUp(); break;
        case 'd': myField.mvDown(); break;
        default: console.log('Invalid input for move')
      }
    } catch (e) {
      myField.status = 'Lose'
      //console.log(`You Lose`)

    }

    myField.print()
  } else if (mode === 'hard') {
    const move = prompt('r(right) l(left) u(up) d(down) : ');
    console.clear()
    try {
      switch (move) {
        case 'r': myField.mvRight();
          myField.hardMode();
          break;
        case 'l': myField.mvLeft();
          myField.hardMode();
          break;
        case 'u': myField.mvUp();
          myField.hardMode();
          break;
        case 'd': myField.mvDown();
          myField.hardMode();
          break;
        default: console.log('Invalid input for move')
      }
    } catch (e) {
      myField.status = 'Lose'
      //console.log(`You Lose`)

    }

    myField.print()

  } else {
    console.log('Invalid mode input')
    mode = prompt('Game mode normal or hard: ')
  }
}

console.log(`You ${myField.status}`)



// Map validation --> check รอบ * กับ ^ ว่ามีอย่างน้อย 1 field
// Map validation --> chek ต่อไปเรื่อยๆ ว่าไม่ชม O หรือ เจอ ^ มั้บ
