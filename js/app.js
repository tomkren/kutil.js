$(function(){ 

	//random testing
  //var c=$('#myCanvas')[0];
  //var ctx=c.getContext("2d");
  //ctx.fillStyle="#FF0000";
  //ctx.fillRect(0,0,150,75);

  App.all = new App.collections.Basics( ) ;

  App.root = new App.models.Basic({
    id        : '_1',
  	pos       : '100 50',
  	shape     : '500 600',
  	html      : '<b>Hel</b>l<b>o</b> <b>world</b>!',
  	border    : 'solid 1px cyan' ,
  	color     : '#4444ff',
  	draggable : true ,
    inside    : [
      { id: '_zeme' , 
        pos:'10 500',
        shape: '2000 800', 
        draggable: false,
        html : 'země',
        color : '#449966' },
      { type: 'watch', 
        target: '_box',
        id: '_nebe',
        html: 'nebe',  
        pos: '100 200',
        shape: '250 300',
        border: 'black solid 1px',
        program: function(x){ /*console.log('step nebe!');*/} }, 
      { id:'_box' ,
        pos: '530 80',
        color: 'black',
        program: function(self){ self.go(0,1); } }


    ],
  });

  App.rootView = new App.views.BasicView( { model : App.root , el : '#root' } );
  


  //App.router = new App.Router;
  //Backbone.history.start();

	App.rootView.render();

  App.PLAY  = 1;
  App.PAUSE = 0;
  App.state = App.PLAY ;

  App.switchState = function(){
    if( App.state === App.PLAY ){
      App.state = App.PAUSE ;
    } else {
      App.state = App.PLAY ;
    }
  }



  setInterval( function(){
    if( App.state === App.PLAY ){
      App.root.trigger('step');
    }
  } , 1000/50  );


});