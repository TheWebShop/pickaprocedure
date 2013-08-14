define ['backbone.sharepoint'], (SP) ->

  Topic = SP.Item.extend
    site: '/rsd/Region5',
    list: 'ProceduresTopics'
