function phonephonephone(activityChannel, options) {
  var self = this;
  
  options = options || {};
  this.settings = $.extend({
    maxItems: 10
  }, options);
  
  this._activityChannel = activityChannel;
  
  this._activityChannel.bind('scroll', function(activity) {
    self._handleActivity.call(self, activity, 'scroll');
  });

}

phonephonephone.prototype._handleActivity = function(activity, eventType) {
  var self = this;
  
  // TODO: move viewport around here
};

phonephonephone.prototype.sendActivity = function(activityType, activityData) {
  var data = {
    activity_type: activityType,
    activity_data: activityData
  };
  if(this._email) {
    data.email = this._email;
  }
  $.ajax({
    url: 'php/trigger_activity.php',
    data: data
  })
};

// RUN
function run(){
    // Enable pusher logging - don't include this in production
    Pusher.log = function(message) {
      if (window.console && window.console.log) { window.console.log(message) };
    };

    // Flash fallback logging - don't include this in production
    WEB_SOCKET_DEBUG = true;

    // set up auth
    Pusher.channel_auth_endpoint = '//phonephonephone.herokuapp.com/pusher_auth.php';

    // init
    var clientid = Math.random().toString(16);
    var pusher = new Pusher('a4e27d5e92ed73bd5abe');
    var channel = pusher.subscribe('presence-test');

    channel.bind('pusher:subscription_succeeded', function() {
      console.log('subscribed successfully');
    });

    $(document).ready(function () {   
    // need DOM in place for this to make sense
    var streamer = new phonephonephone(channel);

    // create pseudo-event for scroll end (from http://james.padolsey.com/javascript/special-scroll-events-for-jquery/)
    var special = jQuery.event.special,
    uid1 = 'D' + (+new Date()),
    uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
      setup: function() {

        var timer,
        handler =  function(evt) {

          var _self = this,
          _args = arguments;

          if (timer) {
            clearTimeout(timer);
          } else {
            evt.type = 'scrollstart';
            jQuery.event.handle.apply(_self, _args);
          }

          timer = setTimeout( function(){
            timer = null;
          }, special.scrollstop.latency);

        };

        jQuery(this).bind('scroll', handler).data(uid1, handler);

      },
      teardown: function(){
        jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
      }
    };

    special.scrollstop = {
      latency: 300,
      setup: function() {

        var timer,
        handler = function(evt) {

          var _self = this,
          _args = arguments;

          if (timer) {
            clearTimeout(timer);
          }

          timer = setTimeout( function(){

            timer = null;
            evt.type = 'scrollstop';
            jQuery.event.handle.apply(_self, _args);

          }, special.scrollstop.latency);

        };

        jQuery(this).bind('scroll', handler).data(uid2, handler);

      },
      teardown: function() {
        jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
      }
    };

    var sync_viewport = function(){
      var triggered = channel.trigger('client-sync_viewport', { x: window.pageXOffset, y: window.pageYOffset,  w: $(window).width(), h: $(window).height() });
    };
    channel.bind('pusher:subscription_succeeded', sync_viewport);
    channel.bind('client-sync_viewport', function(e) {
      console.log(e);
      console.log('trying to scroll y by: '+e.y);
      $(window).scrollTop(e.y);
      $(window).scrollLeft(e.x);
      //$(window).animate({scrollTop: e.y});
      //$(window).animate({scrollLeft: e.x});
    });
    $(window).bind('scrollstop',sync_viewport);
    //$(window).resize(sync_viewport);
  });
  }

// BOOTSTRAP

var libs  = {
    Pusher : '//js.pusher.com/1.12/pusher.min.js',
};

function bootstrap(){
  // async load needed libs
  console.log('in bootstrap');
  var promises = [];
  for(var lib in libs){
    if(window[lib] === undefined){
      promises.push(jQuery.getScript(libs[lib]));
    }
  }
  // fire run script when everything is loaded
  jQuery.when.apply(this, promises).then(function(){
    run();
  });
}

if (window.jQuery === undefined) {
  console.log('loading jQuery');
  var script = document.createElement('SCRIPT');  
  script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js';   
  script.onload=bootstrap;  
  document.body.appendChild(script);  
} else {
  console.log('jQuery already loaded')
  bootstrap();  
}
