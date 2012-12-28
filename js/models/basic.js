App.models.Basic = Backbone.Model.extend({


  //idAttribute: '_id',

  defaults: {
    id        : undefined,
    type      : 'basic',
    pos       : '10 10',
    shape     : '16 16', // obecne 'prefix arg1 arg2 ...'
    html      : '',
    border    : '',
    color     : 'yellow',
    draggable : true ,
    target    : '',
    inside    : [],
  },

  initialize : function(){
    console.log( 'init  model ' + this.get('id') );

    App.all.add( this );

    var inModelsArr = _.map( this.get('inside') , function( ob ){
      return new App.models.Basic( ob );
    });

    var newInside = new App.collections.Basics( inModelsArr ) ;

    this.set('inside' , newInside );

    this.on( 'my_drag' , function( e ){ 

      console.log('Model '+this.get('id')+' ví o hnutí! [' + e.x +','+e.y +']' );

      this.set( 'pos' , e.x + ' ' + e.y ); 

    } , this );

  },

  initialize2 : function() {
    console.log( 'init2 model ' + this.get('id') );


        
  },


  // @TODO implement attribute validation
  validate: function(attributes) {
  }

});

