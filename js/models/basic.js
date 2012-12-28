App.models.Basic = Backbone.Model.extend({


  //idAttribute: '_id',

  defaults: {
    id        : undefined,
    type      : 'basic',
    pos       : '10 10',
    shape     : '16 16', // obecne 'prefix arg1 arg2 ...'
    html      : '',
    border    : '',
    color     : 'white',
    draggable : true ,
    target    : '',
    inside    : [],
    program   : function(){} 
  },

  initialize : function(){
    //console.log( 'init  model ' + this.get('id') );

    App.all.add( this );

    var inModelsArr = _.map( this.get('inside') , function( ob ){
      return new App.models.Basic( ob );
    });

    var newInside = new App.collections.Basics( inModelsArr ) ;

    this.set('inside' , newInside );

    this.on( 'my_drag' , function( e ){ 

      //console.log('Model '+this.get('id')+' ví o hnutí! [' + e.x +','+e.y +']' );

      this.set( 'pos' , e.x + ' ' + e.y ); 



    } , this );

    this.on( 'step' , function(){
      var prog = this.get('program');
      prog(this);

      this.get('inside').each( function(mo){ 
        mo.trigger('step');
      });
    } , this );

  },

  go : function(x,y){
    this.set('pos',this.plusPos( this.get('pos') , x , y)  );

  },

  plusPos : function( pos , x , y ){
    var p = pos.split(' ');

    x = parseInt(p[0]) + x ;
    y = parseInt(p[1]) + y ;

    return x.toString() + ' ' + y.toString() ;
  },

  // @TODO implement attribute validation
  validate: function(attributes) {
  }

});

