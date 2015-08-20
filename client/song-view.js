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
    init: function (model) {
        this.chord.on('change', this.render, this);
    },
    render: function () {
        this.$el.text(this.chord.value);
    }
});

var SectionChordsView = View({
    type: 'SectionChordsView',
    contains: 'SectionChordView',
    model: 'section',
    init: function (model) {
        var chords = this.section.chords();
        for(var i = 0; i < chords.length; i++) {
            this.add(new SectionChordView(chords.at(i)));
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
    model: 'songInfo',
    contains: 'SongSectionView',
    init: function (model) {
        this.create('fileInfo', new FileInfoView(this.songInfo));
        this.songInfo && this.songInfo.each(function (section) {
            this.add(new SongSectionView(section));
        }, this);
    },
    render: function () {
        var html = this.map(function (songSection) {
            return songSection.$el;
        });

        html.unshift(this.fileInfo().$el);
        return this.$el.html(html);
    },

    beat: function (e) {
    },
    measure: function (e) {
    },
    chordFinished: function (e) {

    }
});
