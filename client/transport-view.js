var ControlsView = View({
    type: 'ControlsView',
    model: 'app',
    init: function (model) {
        this.create('fileInfo', new FileInfoView(app.song()));
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
