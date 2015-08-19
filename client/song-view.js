var SectionNameView = View({
    type: 'SectionNameView',
    model: 'section',
    render: function () {
        this.$el.text(this.section.name());
    }
});

var SectionChordView = View({
    type: 'SectionChordView',
    model: 'chord',
    render: function () {
        this.$el.text(this.chord);
    }
});

var SectionChordsView = View({
    type: 'SectionChordsView',
    contains: 'SectionChordView',
    model: 'section',
    init: function (model) {
        var chords = this.section.chords();
        for(var i = 0; i < chords.length; i++) {
            this.add(new SectionChordView(chords[i]));
        }
    },
    render: function () {
        return this.$el.html(this.map(function (chordView) {
            return chordView.$el;
        }));
    }
});

var SongSectionView = View({
    type: 'SongSectionView',
    model: 'section',
    init: function () {
        this.create('name', new SectionNameView(this.section));
        this.create('chords', new SectionChordsView(this.section));
    },
    render: function () {
        var html = [
            this.name().$el,
            this.chords().$el
        ];
        return this.$el.html(html);
    }
});

var SongView = View({
    type: 'SongView',
    model: 'song',
    contains: 'SongSectionView',
    init: function (model) {
        song.each(function (section) {
            this.add(new SongSectionView(section));
        }, this);
    },
    render: function () {
        this.$el.html(this.map(function (songSection) {
            return songSection.$el;
        }));
    }
});

