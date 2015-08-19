var FileInfoView = View({
    type: 'FileInfoView',
    render: function () {
        return this.$el.html('FileInfoView');
    }
});

var InstrumentSelectView = View({
    type: 'InstrumentSelectView',
    render: function () {
        return this.$el.html('InstrumentSelectView');
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
        this.create('instrumentSelect', new InstrumentSelectView(app)); // ???
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
