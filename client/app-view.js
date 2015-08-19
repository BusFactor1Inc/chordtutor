var AppView = View({
    type: 'AppView',
    model: 'app',
    init: function (model) {
        this.create('controls', new ControlsView(this.app));
        this.create('songInfo', new SongView(this.app.songInfo()));
    },
    render: function () {
        var html = [
            this.controls().$el,
            this.songInfo().$el
        ];
        // TODO: set html title
        this.$el.html(html);
    }
});
