(function() {
  require.config({
    paths: {
      backbone: '../bower_components/backbone/backbone',
      'backbone.sharepoint': '../bower_components/backbone.sharepoint/backbone-sharepoint.amd',
      jquery: '../bower_components/jquery/jquery',
      listjs: '../bower_components/listjs/src/list',
      moment: '../bower_components/momentjs/moment',
      placeholder: '../bower_components/placeholder/js/placeholder',
      underscore: '../bower_components/underscore/underscore'
    },
    shim: {
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      listjs: {
        deps: ['jquery'],
        exports: 'List'
      },
      underscore: {
        exports: '_',
        init: function() {
          /*
          # the default underscore template tags <%= %> and <% %>
          # are interpretted as code blocks on .aspx pages
          # so we use {{}} and {[]} instead
          */

          _.templateSettings = {
            evaluate: /\{\[([\s\S]+?)\]\}/g,
            interpolate: /\{\{([\s\S]+?)\}\}/g
          };
          return _;
        }
      }
    }
  });

  require(['underscore', 'backbone', 'procedure/procedures', 'topic/topics', 'procedure/tableView'], function(_, Backbone, Procedures, Topics, TableView) {
    var Router, getProcedures, getTopics, procedureTable, procedures, router, topics;
    procedures = new Procedures;
    getProcedures = procedures.fetch({
      expand: 'Topics',
      orderby: 'Title',
      reset: true
    });
    topics = new Topics;
    getTopics = topics.fetch({
      reset: true
    });
    procedureTable = new TableView({
      procedures: procedures,
      topics: topics
    });
    $.when(getProcedures, getTopics).done(procedureTable.render);
    Router = Backbone.Router.extend({
      routes: {
        '': function() {
          $('#list-panel').slideDown();
          return $('#single-panel').slideUp();
        },
        'procedure/:slug': function(slug) {
          var procedure, template;
          procedure = procedures.findWhere({
            slug: slug
          });
          template = _.template($('#procedure-single').html());
          $('#procedure').html(template(procedure.toJSON()));
          $('#list-panel').slideUp();
          return $('#single-panel').slideDown();
        }
      }
    });
    router = new Router;
    return procedures.on('reset', _.once(function() {
      return Backbone.history.start();
    }));
  });

}).call(this);
