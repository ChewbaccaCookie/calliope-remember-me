function checkZustand (zustand: number) {
    if (alleZustaende[i] == zustand) {
        basic.showIcon(IconNames.Yes)
        music.playTone(toene[zustand], music.beat(BeatFraction.Whole))
    } else {
        basic.showIcon(IconNames.No)
        music.playTone(147, music.beat(BeatFraction.Whole))
        music.playTone(131, music.beat(BeatFraction.Whole))
        isFinished = true
    }
}
function neuerZustand () {
    aktuellerZustand = Math.round(randint(0, 3))
    alleZustaende.push(aktuellerZustand)
}
let punkte = 0
let aktuellerZustand = 0
let i = 0
let isFinished = false
let alleZustaende: number[] = []
let toene: number[] = []
let farben = [Colors.Red, Colors.Yellow, Colors.Blue, Colors.White]
toene = [165, 262, 440, 698]
let bilder = [images.iconImage(IconNames.ArrowWest), images.iconImage(IconNames.ArrowSouthWest), images.iconImage(IconNames.ArrowSouthEast), images.iconImage(IconNames.ArrowEast)]
alleZustaende = []
isFinished = true
// Spiele das aktuelle Schema vor
basic.forever(function () {
    while (isFinished == true) {
        alleZustaende = []
        punkte = 0
        basic.showIcon(IconNames.SmallDiamond)
        if (input.buttonIsPressed(Button.A)) {
            isFinished = false
            basic.showString("3")
            basic.pause(300)
            basic.showString("2")
            basic.pause(300)
            basic.showString("1")
            basic.pause(300)
        }
    }
    neuerZustand()
    basic.setLedColor(farben[aktuellerZustand])
    bilder[aktuellerZustand].showImage(0)
    music.playTone(toene[aktuellerZustand], music.beat(BeatFraction.Whole))
    basic.pause(500)
    i = 0
    for (let index = 0; index < alleZustaende.length; index++) {
        images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `).showImage(0)
        while (true) {
            if (input.pinIsPressed(TouchPin.P0)) {
                checkZustand(0)
                break;
            }
            if (input.pinIsPressed(TouchPin.P1)) {
                checkZustand(1)
                break;
            }
            if (input.pinIsPressed(TouchPin.P2)) {
                checkZustand(2)
                break;
            }
            if (input.pinIsPressed(TouchPin.P3)) {
                checkZustand(3)
                break;
            }
        }
        if (isFinished) {
            break;
        }
        i += 1
    }
    if (!isFinished) {
        punkte += 1
    }
    basic.showString("" + (punkte))
})
