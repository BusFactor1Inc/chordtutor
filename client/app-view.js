var AppView = View({
    type: 'AppView',
    model: 'app',
    init: function (model) {
        this.create('controls', new ControlsView(this.app));
        this.create('song', new SongView());

        // route
        this.app.on('beat', function (e) {
            this.controls().beat(e.value);
            this.song().beat(e.value);
        }, this);;
        this.app.on('measure', function (e) {
            this.controls().measure(e.value);
            this.song().measure(e.value);
        }, this);
        
        this.on('load', function (e) {
            var songInfo = this.app.load(e.value);
            this.song(new SongView(songInfo));
            this.render();
        }, this);

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
