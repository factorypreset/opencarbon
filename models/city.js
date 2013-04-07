define(['backbone', 'underscore'], function(Backbone, _){

  var City = Backbone.Model.extend({
    
    initialize: function(city){
      this.city = city;
      this.cityData = {};
    },
    url: function(){
      return "/data/cities/" + this.city + ".json"
    },
    parse: function(response){
      return response;
    },
    
    title: function(){
      return this.get('title');
    },
    source: function(){
      return this.get('reportingEntity')['sources'][0];
    },
    
    plot: function(){
      var d1 = [],
          d2 = [],
          goals = this.get('reportingEntity')['goals'],
          mgoals = goals['municipal'],
          cgoals = goals['community'],
          mbaselineYear = mgoals['baselineYear'],
          mtargetYear = mbaselineYear,
          cbaselineYear = cgoals['baselineYear'],
          ctargetYear = cbaselineYear; // default
      
      d1.push([mbaselineYear, 100]);
      d2.push([cbaselineYear, 100]);
          
      _.each(mgoals['targets'], function(target){
        targetYear = target['targetYear'];
        targetReduction = target['scopes']['scope-1']['percentageReduction'];
        d1.push([targetYear, 100-targetReduction]);
      });
      
      _.each(cgoals['targets'], function(target){
        targetYear = target['targetYear'];
        targetReduction = target['scopes']['scope-1']['percentageReduction'];
        d2.push([targetYear, 100-targetReduction]);
      });
      
      return [
        { data: d1, label: "Municipal emission targets" },
        { data: d2, label: "Community emission targets"}
      ];
    }
    
  });
  return City;

});
