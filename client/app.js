var Instrument = Model({
    type: 'Instrument',
    init: function(name) {
        this.create('name', name);
    }
});

var Instruments = Model({
    type: 'Instruments'
});

var Section = Model({
    type: 'Section',
    init: function (name, measure, chords) {
        this.create('name', name);
        this.create('measure', measure);
        this.create('chords', chords);
    },
    
    load: function(rawSection) {
        this.name(rawSection.name);
        this.measure(rawSection.name);
        this.chords(rawSection.chords);
        return this;
    }
});

var Song = Model({
    type: 'Song',
    contains: 'Section',
    init: function (title, author,
                    beatsPerMinute,
                    beatsPerMeasure,
                    key) {
        this.create('title', title);
        this.create('author', author);
        this.create('beatsPerMinute', beatsPerMinute);
        this.create('beatsPerMeasure', beatsPerMeasure);
        this.create('key', key);
    },

    load: function(rawSong) {
        this.title(rawSong.title);
        this.author(rawSong.author);
        this.beatsPerMinute(rawSong.beatsPerMinute);
        this.beatsPerMeasure(rawSong.beatsPerMeasure);
        this.key(rawSong.key);

        var sections = rawSong.sections;
        for(var i = 0; i < sections.length; i++) {
            this.add(new Section().load(sections[i]));
        }

        return this;
    }
});

var App = Model({
    type: 'App',
    init: function (song, instruments) {
        this.create('song', song);
        this.create('instruments', instruments);
        this.create('tempo', 90);
        this.create('transpose', 0);
    },

    play: function () {
        alert('play');
    },

    stop: function () {
        alert('stop');
    },

    volumeUp: function () {
        alert('volumeUp');
    },

    volumeDown: function () {
        alert('volumeDown');
    },

    mute: function () {
        alert('mute');
    },

    tempoUp: function () {
        alert('tempoUp');
    },

    tempoDown: function () {
        alert('tempoDown');
    },

    transposeUp: function () {
        alert('transposeUp');
    },

    transposeDown: function () {
        alert('transposeDown');
    },

    
});

var sin = new Instrument('Sin Wave');
var triangle = new Instrument('Triangle Wave');
var square = new Instrument('Square Wave');
var saw = new Instrument('Saw Wave');
var instruments = new Instruments();
instruments.add(sin);
instruments.add(triangle);
instruments.add(square);
instruments.add(saw);

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

var song = new Song().load(rawSong);

var app = new App(song, instruments);
var appView = new AppView(app);

$(document).ready(function () {
    $('body').html(appView.$el);
});
