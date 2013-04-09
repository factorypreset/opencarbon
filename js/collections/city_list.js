define(['models/city_list_item'], function(CityListItem){

    var CityList = Backbone.Collection.extend({
      model: CityListItem,
      url: function(){
        return "/data/cities.json";
      },
      parse: function(response){
        return response;
      }
    });
    return CityList;

});
