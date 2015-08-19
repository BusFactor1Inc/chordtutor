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

var Note = Model({
    type: 'Note',
    init: function (time, freq) {
        this.time = time;
        this.freq = freq;
    },
    play: function () {
        // ???
    }
});

var Notes = Model({
    type: 'Notes',
    contains: 'Note'
});

var Song = Model({
    type: 'Song'
});

var SongInfo = Model({
    type: 'SongInfo',
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
    init: function (songInfo, instruments) {
        this.create('songInfo', songInfo);
        this.create('instruments', instruments);
        this.create('tempo', 90);
        this.create('transpose', 0);
        this.create('mute', false);
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

    volumeMute: function () {
        return this.mute(!this.mute());
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
