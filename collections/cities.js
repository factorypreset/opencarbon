define(['models/city'], function(City){

    var Cities = Backbone.Collection.extend({
      model: City,
      url: function(){
        return "/data/cities.json";
      },
      parse: function(response){
        return response;
      }
    });
    return Cities;

});
