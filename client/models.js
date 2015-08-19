var Instrument = Model({
    type: 'Instrument',
    init: function(name) {
        this.create('name', name);
    }
});

var Instruments = Model({
    type: 'Instruments'
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
    type: 'Song',
    load: function (songInfo, sectionOffset) {
        // TODO: compile song info into this.song()
    }
});

var Player = Model({
    type: 'Player',
    init: function (songInfo) {
        this.create('songInfo', songInfo);
        this.create('song', new Song().load(songInfo));
    },

    play: function () {
    },

    pause: function () {
    },

    stop: function () {
    }
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
        this.create('player', new Player(songInfo));
        this.create('instruments', instruments);
        this.create('tempo', 90);
        this.create('transpose', 0);
        this.create('mute', false);
        this.create('paused', false);
    },

    play: function () {
        this.player().play();
    },

    pause: function () {
        this.player().pause();
        return this.paused(!this.paused());
    },

    stop: function () {
        this.player().stop();
    },

    volumeUp: function () {
        if(this.volume() < 100)
            this.volume(this.volume()+10);
    },

    volumeDown: function () {
        if(this.volume() > 0)
            this.volume(this.volume()-10);
    },

    volumeMute: function () {
        return this.mute(!this.mute());
    },

    tempoUp: function () {
        this.tempo(this.tempo()+1);
    },

    tempoDown: function () {
        this.tempo(this.tempo()-1);
    },

    transposeUp: function () {
        if(this.transpose() < 12)
            this.transpose(this.transpose()+1);
    },

    transposeDown: function () {
        if(this.transpose() > -12)
            this.transpose(this.transpose()-1);
    },

    
});
