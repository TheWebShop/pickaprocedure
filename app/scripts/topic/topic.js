(function() {
  define(['backbone.sharepoint'], function(SP) {
    var Topic;
    return Topic = SP.Item.extend({
      site: '/rsd/Region4',
      list: 'ProceduresTopics'
    });
  });

}).call(this);
