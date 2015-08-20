var FileInfoTitleView = View({
    type: 'FileInfoTitleView',
    model: 'song',
    render: function () {
        return this.$el.text('Title: ' + (this.song && this.song.title() || ""));
    }
});

var FileInfoAuthorView = View({
    type: 'FileInfoAuthorView',
    model: 'song',
    render: function () {
        return this.$el.text('Author: ' + (this.song && this.song.author() || ""));
    }
});

var FileInfoHiddenSelectView = View({
    type: 'FileInfoHiddenSelectView',
    tagName: "input type='file' value='Select...' style='visibility:hidden;'",
    className: 'FileInfoHiddenSelectView',
    events: {
        'change': function (e) {
            console.log(e.target.files[0]);
            this.trigger('load', e.target.files[0]);
        }
    }
});

var FileInfoSelectView = View({
    type: 'FileInfoSelectView',
    events: {
        'click': function (e) {
            $('.FileInfoHiddenSelectView').click();
        }
    },
});

var FileInfoView = View({
    type: 'FileInfoView',
    model: 'song',
    init: function (model) {
        this.create('title', new FileInfoTitleView(this.song));
        this.create('author', new FileInfoAuthorView(this.song));
        this.create('select', new FileInfoSelectView(this.song));
        this.create('selectHidden', new FileInfoHiddenSelectView(this.song));
    },
    render: function () {
        var html = [
            this.title().$el,
            this.author().$el,
            this.select().$el,
            this.selectHidden().$el,
        ];
                        
        return this.$el.html(html);
    }
});
