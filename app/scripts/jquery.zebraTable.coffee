define ['jquery'], ($) ->

  $.fn.zebraTable = ->
    $(this).find('tbody tr').each (i) ->
      stripe = if i%2 then 'ms-rteTableOddRow-1' else 'ms-rteTableEvenRow-1'
      $(this).removeClass('ms-rteTableOddRow-1 ms-rteTableOddRow-1').addClass stripe

  return $
