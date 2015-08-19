var FileInfoTitleView = View({
    type: 'FileInfoTitleView',
    render: function () {
        return this.$el.html('FileInfoTitleView');
    }
});

var FileInfoAuthorView = View({
    type: 'FileInfoAuthorView',
    render: function () {
        return this.$el.html('FileInfoAuthorView');
    }
});

var FileInfoSelectView = View({
    type: 'FileInfoUploadView',
    tagName: "input type='button' value='Select...'",
    className: 'Button',
});

var FileInfoUploadView = View({
    type: 'FileInfoUploadView',
    tagName: "input type='button' value='Upload'",
    className: 'Button',
});

var FileInfoView = View({
    type: 'FileInfoView',
    model: 'song',
    init: function (model) {
        this.create('title', new FileInfoTitleView(this.song));
        this.create('author', new FileInfoAuthorView(this.song));
        this.create('select', new FileInfoSelectView(this.song));
        this.create('upload', new FileInfoUploadView(this.song));
    },
    render: function () {
        var html = [
            this.title().$el,
            this.author().$el,
            this.select().$el,
            this.upload().$el
        ];
                        
        return this.$el.html(html);
    }
});

var InstrumentSelectNameView = View({
    type: 'InstrumentSelectNameView',
    model: 'instrument',
    init: function (model) {
    },
    render: function () {
        this.$el.html('InstrumentSelectNameView');
    }
});

var InstrumentSelectNextButtonView = View({
    type: 'TinyButton InstrumentSelectNextButtonView'
});

var InstrumentSelectPrevButtonView = View({
    type: 'TinyButton InstrumentSelectPrevButtonView'
});

var InstrumentSelectView = View({
    type: 'InstrumentSelectView',
    model: 'instruments',
    init: function () {
        this.create('current', this.instruments.at(0));
        this.create('name', new InstrumentSelectNameView(this.current()));
        this.create('next', new InstrumentSelectNextButtonView(this.current()));
        this.create('prev', new InstrumentSelectPrevButtonView(this.current()));
    },
    render: function () {
        var html = [
            this.name().$el,
            this.next().$el,
            this.prev().$el
        ];
        return this.$el.html(html);
    }
});

var PlaybackView = View({
    type: 'PlaybackView',
    render: function () {
        return this.$el.html('PlaybackView');
    }
});

var VolumeView = View({
    type: 'VolumeView',
    render: function () {
        return this.$el.html('VolumeView');
    }
});

var ControlsView = View({
    type: 'ControlsView',
    model: 'app',
    init: function (model) {
        this.create('fileInfo', new FileInfoView(app));
        this.create('instrumentSelect', new InstrumentSelectView(app.instruments()));
        this.create('playbackView', new PlaybackView(app));
        this.create('volumeView', new VolumeView(app));
    },
    render: function () {
        var html = [
            this.fileInfo().$el,
            this.instrumentSelect().$el,
            this.playbackView().$el,
            this.volumeView().$el
        ]
        this.$el.html(html);
    }
});
