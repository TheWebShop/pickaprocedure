define ['backbone.sharepoint'], (SP) ->

  Topic = SP.Item.extend
    site: '/rsd/Region1',
    list: 'ProceduresTopics'