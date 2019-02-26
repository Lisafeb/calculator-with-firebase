QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == eval(3-2), "Passed!" );
  });


  QUnit.test( "eval", function( assert ) {
    assert.expect( 2 );
  
    function eval( x, operation ) {
      return operation( x );
    }
  
    var result = eval( 2, function( x ) {
      assert.ok( true, "eval() calls operation function" );
      return x * x;
    });
  
    assert.equal( result, 4, "2 squared equals 4" );
  });

  QUnit.test('frontpage should be welcoming', function(assert) {
    
      assert.equal(find('h1.title').textContent, 'Firebase Calculator');
      assert.equal(find('h1.title'),('Firebase Calculator'));
    });

    QUnit.test( "a test", function( assert ) {
      assert.expect( 1 );
     
      var $body = $( "body" );
     
      $body.on( "click", function() {
        assert.ok( true, "body was clicked!" );
      });
     
      $body.trigger( "click" );
    });
  
  