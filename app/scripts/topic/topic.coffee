define ['backbone.sharepoint'], (SP) ->

  Topic = SP.Item.extend
    site: '/rsd/Region2',
    list: 'ProceduresTopics'
