(function() {
  define(['jquery-zebraTable', 'moment', 'backbone', 'listjs', 'placeholder'], function($, moment, Backbone, List, Placeholder) {
    var TableView;
    return TableView = Backbone.View.extend({
      template: _.template($('#procedures-table').html()),
      events: {
        'change #topic-select': 'onTopicSelect'
      },
      initialize: function() {
        return _.bindAll(this, 'render', 'onTopicSelect');
      },
      render: function() {
        var _this = this;
        this.$el.html(this.template({
          procedures: this.options.procedures.toJSON(),
          topics: this.options.topics.toJSON()
        }));
        this.$el.appendTo('#procedures-all').find('.search').show();
        if (!Modernizr.input.placeholder) {
          window.placeholder = new Placeholder();
        }
        $('#loading-procedures').remove();
        this.list = new List('procedures-all', {
          valueNames: ['Title', 'Topics', 'Modified', 'bodyText']
        });
        this.$el.zebraTable().find('time').each(function() {
          var ago, updated;
          updated = $(this).text();
          ago = moment(updated).fromNow();
          return $(this).text(ago);
        });
        return this.list.on('updated', function() {
          _this.$el.zebraTable();
          $('.table thead').toggle(_this.list.matchingItems.length !== 0);
          return $('#search-notfound').toggle(_this.list.matchingItems.length === 0);
        });
      },
      onTopicSelect: function(e) {
        var topic;
        topic = $(e.target).val();
        this.list.filter(function(item) {
          return !topic || item.values().Topics.indexOf(topic) !== -1;
        });
        return $('#procedure-search').attr('placeholder', "Search from " + this.list.matchingItems.length + " procedures...");
      }
    });
  });

}).call(this);
