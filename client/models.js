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
    init: function (start, note, dur) {
        this.start = start;
        this.note = note;
        this.dur = dur;
    },
});

var Song = Model({
    type: 'Song',
    contains: 'Note',

    init: function (bpm, bpb) {
        this.bpm = bpm;
        this.bpb = bpb;
    },

    processChord: function(chord) {
        var measure = chord[0];
        var beat = chord[1];
        var dur = chord[2];
        var notes = chord[3];

        var start = ((measure * this.bpb) + beat);
        dur = dur;

        var self = this;
        notes.forEach(function (midiNoteValue) {
            self.add(new Note(start, midiNoteValue, dur));
        });
    },
    
    load: function (compiledSong, sectionOffset) {
        var song = [
            [0, 0, 4, [60, 64, 67]],
            [1, 0, 2, [60, 65, 67]],
            [1, 2, 2, [65, 69, 72]],
            [2, 0, 4, [60, 64, 67]],
            [3, 0, 2, [60, 65, 67]],
            [3, 2, 2, [65, 69, 72]],
            [4, 0, 4, [60, 64, 67]],
            [5, 0, 2, [60, 65, 67]],
            [5, 2, 2, [65, 69, 72]]
        ];

        song = new Streamer(compiledSong).do();

        this.clear();
        this.time = 0;
        this.measure = song[0][0];
        this.beat = song[0][1];

        var self = this;
        song.forEach(function (chord) {
            self.processChord(chord);
        });
        return this;
    }
});

var Player = Model({
    type: 'Player',
    init: function () {
        this.create('volume', .25);
        this.create('muted', false);
        this.create('playing', false);
        this.create('songInfo')
        this.create('bpm')
        this.create('bpb')
        this.create('tpb')
        this.create('song')
        this.create('measure', 0);
        this.create('beat', 0);
        this.create('transpose', 0);
        this.create('instrument', 'sine');

        this.on('change:songInfo', function (e) {
            this.set('bpm', Number(this.songInfo().beatsPerMinute()));
            this.set('bpb', Number(this.songInfo().beatsPerMeasure())); // beats per bar
            this.set('tpb', (60000/this.bpm())); // time per beat in ms
            this.set('song', new Song(this.bpm(), this.bpb()).load(this.songInfo().rawSong));

        });

        this.on('change:volume', function (e) {
            this.master.gain.value = this.volume();
        });

        this.on('change:bpm', function (e) {
            this.tpb(60000/this.bpm());
        });

        this.audio = new AudioContext();
        this.master = this.audio.createGain();
        this.master.gain.value = this.volume();
        this.master.connect(this.audio.destination);

        this.engine();
    },

    midi2freq: function (midiNoteValue) {
        var lut = [ 8.175798,8.661958,9.177024,9.722718,10.300861,10.913383,11.5623255,12.249857,12.9782715,13.75,14.567618,15.433853,16.351597,17.323915,18.354048,19.445436,20.601723,21.826765,23.124651,24.499714,25.956543,27.5,29.135237,30.867706,32.703194,34.64783,36.708096,38.890873,41.203445,43.65353,46.249302,48.999428,51.913086,55.0,58.270473,61.735413,65.40639,69.29566,73.41619,77.781746,82.40689,87.30706,92.498604,97.998856,103.82617,110.0,116.54095,123.470825,130.81277,138.59132,146.83238,155.56349,164.81378,174.61412,184.99721,195.99771,207.65234,220.0,233.0819,246.94165,261.62555,277.18265,293.66476,311.12698,329.62756,349.22824,369.99442,391.99542,415.3047,440.0,466.1638,493.8833,523.2511,554.3653,587.3295,622.25397,659.2551,698.4565,739.98883,783.99084,830.6094,880.0,932.3276,987.7666,1046.5022,1108.7306,1174.659,1244.5079,1318.5103,1396.913,1479.9777,1567.9817,1661.2188,1760.0,1864.6552,1975.5332,2093.0044,2217.4612,2349.318,2489.0159,2637.0205,2793.826,2959.9553,3135.9634,3322.4375,3520.0,3729.3103,3951.0664,4186.009,4434.9224,4698.636,4978.0317,5274.041,5587.652,5919.9106,6271.927,6644.875,7040.0,7458.6206,7902.133,8372.018,8869.845,9397.272,9956.063,10548.082,11175.304,11839.821,12543.854 ];
        return lut[midiNoteValue];
    },

    engine: function () {
        if(this.playing() && this.song()) {
            var notes = this.song().filter(function (note) {
                return note.start === (this.measure()*this.bpb())+this.beat();
            }, this);
            
            var self = this;
            notes.forEach(function (note) {
                var osc = self.audio.createOscillator();
                osc.connect(self.master)

                var octave = Math.floor(note.note / 12);
                var residue = Math.floor(note.note % 12);
                var upper = (octave+1)*12;
                var lower = octave*12;

                var n = note.note - self.transpose();
                if(self.transpose > 0) {
                    var residue2 = upper - note;
                    if(residue2 < 0) {
                        n = lower + residue2;
                    }
                } else {
                    var residue2 = lower - n;
                    if(residue2 < 0) {
                        n = upper + residue2;
                    }
                }
                
                osc.frequency.value = self.midi2freq(n);
                osc.type = self.instrument();
                osc.start(0);
                setTimeout(function () {
                    osc.stop();
                }, note.dur*self.tpb());
            });
            self.beat(self.beat()+1);
            this.trigger('beat', self.beat());
            if(self.beat() === self.bpb()) {
                self.beat(0);
                self.measure(this.measure()+1);
                this.trigger('measure', self.measure());
            }
        }

        var self = this;
        setTimeout(function() {
            self.engine();
        }, this.tpb());
    },

    play: function () {
        this.beat(0);
        this.start(0);
        this.playing(true);
        this.unmute();
    },

    pause: function () {
        if(this.playing()) {
            this.mute();
        } else {
            this.unmute();
        }
        this.playing(!this.playing());
    },

    stop: function () {
        this.mute();
        this.playing(false);
        this.beat(0);
        this.measure(0);
    },

    mute: function (value) {
        this.master.gain.value = 0;
    },
    unmute: function () {
        this.master.gain.value = this.volume();
    },
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
        this.rawSong = rawSong;
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
    init: function (instruments) {
        this.create('songInfo');
        this.create('player', new Player());
        this.create('instruments', instruments);
        this.create('tempo');
        this.create('muted', false);
        this.create('paused', false);
        this.create('volume', 50);

    },

    load: function(file) {
        var fileName = file.name;
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

        // TODO: load file as a string and pass to parser
        var parser = new Parser(songFileData);
        var parsedSong = parser.do();
        var songInfo = new SongInfo().load(parsedSong);

        this.set('tempo', Number(songInfo.beatsPerMinute()));
        this.player().songInfo(songInfo);
        return songInfo;
    },

    play: function () {
        this.player().play();
    },

    pause: function () {
        this.player().pause();
        return this.paused(!this.paused());
    },

    stop: function () {
        this.paused(false);
        this.player().stop();
    },

    setVolume: function () {
        this.player().volume(this.volume()/100.0);
        return this.volume();
    },

    volumeUp: function () {
        if(this.muted())
            this.volumeMuted();

        if(this.volume() < 100)
            this.volume(this.volume()+10);
        return this.setVolume();
    },

    volumeDown: function () {
        if(this.muted())
            this.volumeMuted();

        if(this.volume() > 0)
            this.volume(this.volume()-10);
        return this.setVolume()
    },

    volumeMute: function () {
        this.muted(!this.muted());
        if(this.muted())
            this.player().volume(0);
        else
            this.player().volume(this.volume()/100);
        return this.muted();
    },

    tempoUp: function () {
        this.tempo(this.tempo()+1);
        return this.player().bpm(this.tempo());
    },

    tempoDown: function () {
        this.tempo(this.tempo()-1);
        return this.player().bpm(this.tempo());
    },

    transposeUp: function () {
        if(this.player().transpose() < 12)
            this.player().transpose(this.player().transpose()+1);
        this.trigger('change:transpose', this.player().transpose());
        
    },

    transposeDown: function () {
        if(this.player().transpose() > -12)
            this.player().transpose(this.player().transpose()-1);
        this.trigger('change:transpose', this.player().transpose());
    },

    setInstrument: function (instrument) {
        this.player().instrument(instrument.name());
    }
});
