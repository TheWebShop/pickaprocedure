(function() {
  define(['backbone.sharepoint'], function(SP) {
    var Topic;
    return Topic = SP.Item.extend({
      site: '/rsd/Region3',
      list: 'ProceduresTopics'
    });
  });

}).call(this);
