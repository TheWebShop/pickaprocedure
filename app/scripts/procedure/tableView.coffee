define ['jquery-zebraTable', 'moment', 'backbone', 'listjs', 'placeholder'], ($, moment, Backbone, List, Placeholder) ->

  TableView = Backbone.View.extend

    template: _.template $('#procedures-table').html()

    events:
      'change #topic-select': 'onTopicSelect'

    initialize: ->
      _.bindAll(this, 'render', 'onTopicSelect')

    render: ->
      @$el.html @template
        procedures: @options.procedures.toJSON()
        topics: @options.topics.toJSON()
      @$el.appendTo('#procedures-all')
      .find('.search').show()

      # now that the <input> is on the stage we can polyfil for IE8
      unless Modernizr.input.placeholder then window.placeholder = new Placeholder()

      $('#loading-procedures').remove()
      @list = new List 'procedures-all',
        valueNames: [
          'Title'
          'Topics'
          'Modified'
          'bodyText'
        ]

      @$el.zebraTable()
      .find('time').each ->
        updated = $(this).text()
        ago = moment(updated).fromNow()
        $(this).text(ago)


      @list.on 'updated', =>
        @$el.zebraTable()
        # If empty show not found message and hide the table head.
        $('.table thead').toggle(@list.matchingItems.length isnt 0)
        $('#search-notfound').toggle(@list.matchingItems.length is 0)

    onTopicSelect: (e) ->
      topic = $(e.target).val()

      @list.filter (item) ->
        # if there is no filter or if the filter is among the item topics
        return !topic or item.values().Topics.indexOf(topic) isnt -1

      $('#procedure-search').attr 'placeholder', "Search from #{ @list.matchingItems.length } procedures..."
