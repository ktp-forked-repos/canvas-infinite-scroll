(function($) {
  var settings = {};
  var defaults = {
    pollingTime: 800,
    tollerence: 1200,
    onBottom: function(){
      console.log('At the bottom')
    },
  }, notScrolling = true, intervalId;  

  var checkCanvasScroll = function(callback){
    if (notScrolling) {
      notScrolling = false;
      FB.Canvas.getPageInfo(
          function(info) {
              var frameHeight = $('html').height();
              var offsetTop = info.offsetTop;
              var scrollTop = info.scrollTop;
              var fbTollernce = settings.tollerence > 700 ? settings.tollerence : 700
              
              if ((scrollTop + offsetTop >= frameHeight - fbTollernce)) {
                callback.apply(this)
              }     
              notScrolling = true;                 
          });
      }
  };
  
  var checkWindowScroll = function(callback){
    
      var pageHeight = $(document).height()-$(window).height();
      var scrollPosition = $(window).scrollTop()

      if ((pageHeight - scrollPosition) <= settings.tollerence){
        callback.apply(this)
      }

  }; 
  
  var methods = {
    init: function(options) {
      settings = $.extend({}, defaults, options);
      
      // if initalised return
      if($('body').data('infinite-scroll') != undefined) {
        return this
      }
      
      $('body').data('infinite-scroll','true')
      
      // if the canvas doesnt exist the below callback is never called by facebook
      FB.Canvas.getPageInfo(function(){
        clearInterval(intervalId)
        intervalId = setInterval(function(){ checkCanvasScroll(settings.onBottom); }, settings.pollingTime);
      })
        
        intervalId = setInterval(function(){ checkWindowScroll(settings.onBottom) }, settings.pollingTime);
      
      return this;
    }
  };

  // nice pattern for calling methods
  $.fn.canvasInfinteScroll = function(method) {
    var el = this;
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.canvasInfinteScroll');
    }
    // return the jquery object to enable chaning
    return this
  };
})(jQuery);
