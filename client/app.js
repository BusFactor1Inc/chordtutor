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

var songFileData = " \
:title=My first song: \
:author=Steely Dan: \
:beatsPerMinute=120: \
:beatsPerMeasure=4: \
:key=C: \
:section=Intro: \
:|Dm|C|Dm|C|: \
:section=Verse1: \
:|C|Em C| \
 |Em|G C| \
 |C|Em|C G|C| \
 |C F|C G|: \
:section=Interlude: \
:|C|C|C G|G C| \
 |C F|C G|: \
:section=Verse2: \
:|C F|C G| \
 |C F|C G|: \
:section=End: \
:|Dm|C|Dm|C|: ";

var parser = new Parser(songFileData);
var parsedSong = parser.do();
var songInfo = new SongInfo().load(parsedSong);
var app = new App(songInfo, instruments);
var appView = new AppView(app);

$(document).ready(function () {
    $('body').html(appView.$el);
});
