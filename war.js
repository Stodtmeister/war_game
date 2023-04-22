const chalk = require('chalk')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

console.log(chalk.italic.cyan('\n!!!~ Rules: A battle risks the card you play, a war risks the card you play, plus an additional 3 cards ~!!!\n'))

console.log(chalk.red.bold("-------------------"))
console.log(chalk.red.bold("PREPARE FOR BATTLE!"))
console.log(chalk.red.bold("-------------------\n"))

const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
const deck = {}

let count = 0
while (count < 4) {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      deck[suits[i] + ' ' + String(cards[j])] = cards[j];
    }
  }
  count++
}
const armies = shuffle(deck)
let gondor = armies[0]
let mordor = armies[1]

function play() {
  console.log(chalk.green(`Troops remaining: Soldiers => ${gondor.length}, Orcs => ${mordor.length}`))
  console.log(chalk.green('++++++++++++++++++++++++++++++++++++++++++++\n'))

  if (gondor.length !== 52 || mordor.length !== 52) {
    rl.question(chalk.grey.underline('To battle: press 1\nFor war  : press 2\n'), (answer) => {
      if (answer === '1') {
        war()
      } else if (answer === '2') {
        if (gondor.length <= 3) {
          console.log(chalk.bgMagenta('\nMORDOR WINS!!!!!'));
          rl.close();
          return
        } else if (mordor.length <= 3) {
          console.log(chalk.bgMagenta('\nGONDOR WINS!!!!!'));
          rl.close;
          return
        }
        soldiers = gondor.splice(0, 3)
        orcs = mordor.splice(0, 3)
        war(soldiers,orcs)
      } else {
        console.log(`*** ${answer} is invalid ***`)
        play()
      }
    })
  } else {
    if (gondor.length === 52) {
      console.log('MORDOR WINS')
      rl.close()
      return
    } else if (mordor.length === 52) {
      console.log('GONDOR WINS')
      rl.close()
      return
    }
  }
}

function war(soldiers,orcs) {
  let obj = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14}
  p1 = gondor.shift();
  p2 = mordor.shift();
  console.log(chalk.magenta('\n~~~~~~~~!~~~~~~~~'))
  console.log(chalk.magenta(`Gondor played: ${p1}`))
  console.log(chalk.magenta(`Mordor played: ${p2}`))
  console.log(chalk.magenta('~~~~~~~~!~~~~~~~~\n'))

  if (obj[p1] > obj[p2]) {
    console.log(chalk.bold.underline('*** Gondor has won the battle ***'))
    if (soldiers) {
      console.log(chalk.underline(`:) => Mordor lost [${p2}] and [${orcs}]\n`))
      console.log(chalk.green('++++++++++++++++++++++++++++++++++++++++++++'));
      gondor.push(...soldiers, ...orcs, p1, p2);
    } else {
      console.log(`:) => Mordor lost [${p2}]\n`)
      console.log(chalk.green('++++++++++++++++++++++++++++++++++++++++++++'));
      gondor.push(p1, p2)
    }
    play();
  } else if (obj[p1] < obj[p2]) {
    console.log(chalk.bold.underline('*** Mordor has won the battle ***'));
      if (soldiers) {
        console.log(chalk.underline(`:( => Gondor lost [${p1}] and [${soldiers}]\n`))
        console.log(chalk.green('++++++++++++++++++++++++++++++++++++++++++++'));
        mordor.push(...orcs, ...soldiers, p2, p1)
      } else {
        console.log(chalk.underline(`:( => Gondor lost [${p1}]\n`))
        console.log(chalk.green('++++++++++++++++++++++++++++++++++++++++++++'));
        mordor.push(p2, p1)
      }
    play();
  } else {
    console.log('*** Tie! ***');
    if (gondor.length < 3) {
      console.log(chalk.yellow('MORDOR WINS'))
      rl.close()
      return
    } else if (mordor.length < 3) {
      console.log(chalk.yellow('GONDOR WINS'))
      rl.close
      return
    }
    if (soldiers) {
      soldiers.push(p1, ...gondor.splice(0, 3))
      orcs.push(p2, ...mordor.splice(0, 3))
      war(soldiers, orcs)
    } else {
      let gg = [p1, ...gondor.splice(0, 3)]
      let mg = [p2, ...mordor.splice(0, 3)]
      war(gg, mg)
    }
  }
}

function shuffle(deck) {
  let arr = []
  for (let card in deck) {
    let randomIdx = ~~(Math.random() * 52)
    if (!arr[randomIdx]) {
      arr[randomIdx] = deck[card]
    } else {
      for (let i = 0; i < arr.length - 1; i++) {
        if (!arr[i]) {
          arr[i] = deck[card]
          break
        }
      }
    }
  }

  return split(arr)
}

function split(arr) {
  let p1 = []
  let p2 = []

  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      p1.push(arr[i])
    } else {
      p2.push(arr[i])
    }
  }

  return [p1, p2]
}

play()
