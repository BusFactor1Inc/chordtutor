var AppView = View({
    type: 'AppView',
    model: 'app',
    init: function (model) {
        this.create('controls', new ControlsView(this.app));
        this.create('song', new SongView(this.app.song()));
    },
    render: function () {
        var html = [
            this.controls().$el,
            this.song().$el
        ];
        // TODO: set html title
        this.$el.html(html);
    }
});
