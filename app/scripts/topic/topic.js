(function() {
  define(['backbone.sharepoint'], function(SP) {
    var Topic;
    return Topic = SP.Item.extend({
      site: '/rsd/pscc',
      list: 'ProceduresTopics'
    });
  });

}).call(this);
