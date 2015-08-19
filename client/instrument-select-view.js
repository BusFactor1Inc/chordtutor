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

