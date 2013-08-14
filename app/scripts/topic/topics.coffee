define ['backbone.sharepoint', 'topic/topic'], (SP, Topic) ->

  Topics = SP.List.extend
    model: Topic
