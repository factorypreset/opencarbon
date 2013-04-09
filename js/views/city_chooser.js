define(['models/city_list_item', 'collections/city_list'], function(CityListItem, CityList){
  
  CityChooser = Backbone.View.extend({
    
    initialize: function(){
      this.el = "#citychooser ul";
      var that = this;
      var cities = new CityList();
      cities.fetch().complete(function(cities){
        //that.el.append("<li>" + cities.get('name') + "</li>");
      });
    }
    
  });
  
  return CityChooser;
  
});
