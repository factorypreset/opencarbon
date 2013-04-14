define(['models/city_list_item', 'collections/city_list'], function(CityListItem, CityList){
  
  var CityChooser = Backbone.View.extend({
    
    initialize: function(el){
      var that = this;
      this.collection = new CityList();
      this.collection.fetch().complete(function(cities){
        //that.el.append("<li>" + cities.get('name') + "</li>");
      });
    }
    
  });
  
  return CityChooser;
  
});
