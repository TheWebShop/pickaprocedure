(function() {
  define(['jquery'], function($) {
    $.fn.zebraTable = function() {
      return $(this).find('tbody tr').each(function(i) {
        var stripe;
        stripe = i % 2 ? 'ms-rteTableOddRow-1' : 'ms-rteTableEvenRow-1';
        return $(this).removeClass('ms-rteTableOddRow-1 ms-rteTableOddRow-1').addClass(stripe);
      });
    };
    return $;
  });

}).call(this);
