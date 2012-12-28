$(function(){
App.views.BasicView = Backbone.View.extend({
 
  //el: '#root',
  
  events: {
    //'click #create-form' : 'createForm'
  },

  initialize: function() {  
    console.log('init view ' + this.model.get('id') );

    this.$htmlDiv = $('<div/>',{id: '__html'+this.model.get('id') });
    this.$htmlDiv.appendTo( this.$el );

    this.insideViews = this.model.get('inside').map(this.generateInside, this);

    this.model.on('change' , this.render , this );

    
  },


  render: function() {
    
    var el  = this.$el;
    var mo  = this.model;

    console.log('rendering view ' + mo.get('id') );
    
    var pos  = mo.get('pos'  ).split(' ');
    var size = mo.get('shape').split(' '); 



    var cssFeatures = {
      'position'          :  'absolute'        ,
      'left'              :  pos[0]  + 'px'    ,
      'top'               :  pos[1]  + 'px'    ,
      'width'             :  size[0] + 'px'    ,
      'height'            :  size[1] + 'px'    ,
      'border'            :  mo.get('border')  ,
      'background-color'  :  mo.get('color')   ,  
    };

    var html = mo.get('html') ;
    
    //el.html('');

    if( mo.get('type') == 'watch' ){
      var targetModel = App.all.get( mo.get('target') );
      el.append( this.newWatchBox( targetModel , size ) );
    }

    //el.append( html );
    this.$htmlDiv.html( html );


    _.chain(cssFeatures).pairs().map(function(p){ el.css(p[0],p[1]) }) ;

    if( mo.get('draggable') ){ 
      el.draggable({
        stop: function( event, ui ) {
          mo.trigger( 'my_drag' , { x : parseInt(el.css('left')) , 
                                    y : parseInt(el.css('top')) } );
        }
      }); 
    }


    // inside

    _.each( this.insideViews , function( v ){
      v.render();
    });
  

    
    return this ;
  },

  generateInside: function( m ) {
    var newElemId = m.get('id') ;
    this.$el.append(  '<div id="'+newElemId+'"></div>' );
    return new App.views.BasicView({ model: m , el : '#'+newElemId });
  },

  newWatchBox: function( target , size ){
    var ret = '';

    if( target ){
      
      var json = JSON.stringify( target , null , 2 );
      var tag = 'textarea';

      ret = $('<textarea/>',{
          text  : json  ,
          width : size[0]-6  + 'px' ,
          height: size[1]-25 + 'px', 
        })
        .css('top','19px')
        .css('position','absolute');
    }

    return ret;
  },

  
});
});
