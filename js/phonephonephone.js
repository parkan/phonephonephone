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
    
};

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

