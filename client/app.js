var sin = new Instrument('Sin Wave');
var triangle = new Instrument('Triangle Wave');
var square = new Instrument('Square Wave');
var saw = new Instrument('Saw Wave');
var instruments = new Instruments();
instruments.add(sin);
instruments.add(triangle);
instruments.add(square);
instruments.add(saw);

/*
var rawSong = {
    title: 'my first song',
    author: 'xxx',
    beatsPerMinute: 120,
    beatsPerMeasure: 4,
    key: 'C',
    sections: [
        {
            name: 'Intro',
            measure: 0,
            chords: ['C', 'F', 'F', 'C']
        },
        {
            name: 'Verse1',
            measure: 5,
            chords: ['Am', 'E', 'Am', 'Am']
        }
    ]
}
*/

var app = new App(instruments);
var appView = new AppView(app);

$(document).ready(function () {
    $('body').html(appView.$el);
});
