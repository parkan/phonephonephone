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
  console.log('in run');
    // Enable pusher logging - don't include this in production
    Pusher.log = function(message) {
      if (window.console && window.console.log) { window.console.log(message) };
    };

    // Flash fallback logging - don't include this in production
    WEB_SOCKET_DEBUG = true;

    // set up auth
    Pusher.channel_auth_endpoint = '/pusher_auth.php';

    // init
    var pusher = new Pusher('a4e27d5e92ed73bd5abe');
    var channel = pusher.subscribe('presence-test');

    channel.bind('pusher:subscription_succeeded', function() {
      console.log('subscribed successfully');
    });

    $(document).ready(function () {   
    // need DOM in place for this to make sense
    var streamer = new phonephonephone(channel);
    Pusher.log('here');
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
  jQuery.when(promises).then(function(){
    run();
  });
}

if (window.jQuery === undefined) {
  var script = document.createElement('SCRIPT');  
  script.src = 'http://code.jquery.com/jquery-1.7.1.min.js';   
  script.onload=bootstrap;  
  document.body.appendChild(script);  
} else {
  bootstrap();  
}
