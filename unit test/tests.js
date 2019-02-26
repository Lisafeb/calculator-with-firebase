QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == eval(3-2), "Passed!" );
  });

  QUnit.test( "test2", function( assert ) {
    assert.equal( 1, "1", "String '1' and number 1 have the same value" );
  });

  QUnit.test( "test3", function( assert ) {
    assert.expect( 2 );
  
    function calc( x, operation ) {
      return operation( x );
    }
  
    var result = calc( 2, function( x ) {
      assert.ok( true, "calc() calls operation function" );
      return x * x;
    });
  
    assert.equal( result, 4, "2 squared equals 4" );
  });

  QUnit.test('frontpage should be welcoming', function(assert) {
    
      assert.equal(find('h1.title').textContent, 'Firebase Calculator');
      assert.equal(find('h1.title'),('Firebase Calculator'));
    });
  
  