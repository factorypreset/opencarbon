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
    baselineYear: function(type){
      if (type === undefined) {
        type = 'municipal';
      }
      return this.get('reportingEntity')['goals'][type]['baseline']['year'];
    },
    baselineAmount: function(type){
      if (type === undefined) {
        type = 'municipal';
      }
      return this.get('reportingEntity')['goals'][type]['baseline']['numericAmount'];

    },
    plotPercentages: function(){
      var d1 = [],
          d2 = [],
          d3 = [],
          goals = this.get('reportingEntity')['goals'],
          emissionSources = this.get('reportingEntity')['emissionSources'],
          mgoals = goals['municipal'],
          cgoals = goals['community'],
          mbuildings = emissionSources['municipal']['buildings'],
          mbaselineYear = this.baselineYear('municipal'),
          mtargetYear = mbaselineYear,
          cbaselineYear = this.baselineYear('community'),
          ctargetYear = cbaselineYear; // default
      
      d1.push([mbaselineYear, 100]);
      d2.push([cbaselineYear, 100]);
      d3.push([mbaselineYear, 100]);
          
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

      _.each(mbuildings['targets'], function(target){
        targetYear = target['targetYear'];
        targetReduction = target['scopes']['scope-1']['percentageReduction'];
        d3.push([targetYear, 100-targetReduction]);
      });
      
      return [
        { data: d1, label: "Municipal aggregate emission targets (relative to baseline)" },
        { data: d2, label: "Community aggregate emission targets (relative to baseline)"},
        { data: d3, label: "Municipal building emission targets (relative to baseline)"}
      ];
    },

    plotAbsolutes: function(){
      var d1 = [],
          d2 = [],
          d3 = [],
          goals = this.get('reportingEntity')['goals'],
          emissionSources = this.get('reportingEntity')['emissionSources'],
          mgoals = goals['municipal'],
          cgoals = goals['community'],
          mbaselineYear = this.baselineYear('municipal'),
          mbaselineAmount = this.baselineAmount('municipal'),
          mtargetYear = mbaselineYear,
          cbaselineYear = this.baselineYear('community'),
          cbaselineAmount = this.baselineAmount('community'),
          ctargetYear = cbaselineYear; // default
      
      d1.push([mbaselineYear, mbaselineAmount]);
      d2.push([cbaselineYear, cbaselineAmount]);
          
      _.each(mgoals['targets'], function(target){
        targetYear = target['targetYear'];
        targetReduction = target['scopes']['scope-1']['percentageReduction'];
        d1.push([targetYear, (100-targetReduction) * mbaselineAmount / 10]);
      });
      
      _.each(cgoals['targets'], function(target){
        targetYear = target['targetYear'];
        targetReduction = target['scopes']['scope-1']['percentageReduction'];
        d2.push([targetYear, (100-targetReduction) * mbaselineAmount / 10]);
      });

      return [
        { data: d1, label: "Municipal aggregate emission targets (in tonnes CO2e)" },
        { data: d2, label: "Community aggregate emission targets (in tonnes CO2e)"}
      ];
      
    }
    
  });
  return City;

});
