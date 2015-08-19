var Instrument = Model({
    type: 'Instrument',
    init: function(name) {
        this.create('name', name);
    }
});

var Instruments = Model({
    type: 'Instruments'
});

var Song = Model({
    type: 'Song',
    init: function (title, author) {
        this.create('title', title);
        this.create('author', author);
    }
});

var App = Model({
    type: 'App',
    init: function (song, instruments) {
        this.create('song', song);
        this.create('instruments', instruments);
        this.create('tempo', 90);
    }
    
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

var song = new Song("Code Blast", "Hack Reactor");

var app = new App(song, instruments);
var appView = new AppView(app);

$(document).ready(function () {
    $('body').html(appView.$el);
});
