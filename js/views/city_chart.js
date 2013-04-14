define(['backbone', 'underscore', 'models/city'], function(Backbone, _, City){
  
  var CityChart = Backbone.View.extend({
    
    initialize: function(el, cityName){

      this.el = el;
      this.cityName = cityName;

      this.model = new City(this.cityName);

      var that = this;

      this.model.fetch().complete(function(){
        // TODO: consider doing this async
        var percentagePlots = that.model.plotPercentages(),
            absolutePlots = that.model.plotAbsolutes(),
            source = that.model.source(),
            baselineYear = that.model.baselineYear();

        $("#header h2").text(that.model.title());
        $("h3#percentage-heading").text("Emission reduction targets relative to base year (" + baselineYear + ")");
        $.plot("#percentage-placeholder", percentagePlots);

        $("h3#percentage-heading").text("Emissions reduction targets in tonnes CO2e");
        $.plot("#absolute-placeholder", absolutePlots);

        // TODO: this should be in a template
        $("#details p").html('Source: <a href="' + source['url'] + '">' + source['title'] + '</a> (' + source['author'] +') <br />Baseline year: ' + baselineYear);

      });
    },
    
  });
  
  return CityChart;
  
});
