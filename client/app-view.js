var AppView = View({
    type: 'AppView',
    model: 'app',
    init: function (model) {
        this.create('controls', new ControlsView(model));
        this.create('song', new SongView(model));
    },
    render: function () {
        var html = [
            this.controls().$el,
            this.song().$el
        ];
        this.$el.html(html);
    }
});
