/*
 * From Mozilla Developer Network:
 * The Promise.race(promises) method returns a promise that resolves or rejects
 * as soon as one of the promises in the array resolves or rejects,
 * with the value or reason from that promise.
 */
function race( promises ) {
    return new Promise( ( resolve , reject ) => 
	{
        promises.map( (x) => { x.then( resolve ).catch( reject ) } );
    }
	);
}

/*
 * Write a function that takes an arbitrarily
 * nested array and generates the sequence
 * of values from the array.
 * Example: [...flatten([1, [2, [3]], 4, [[5, 6,[]], 7, [[[8]]]]])] => [1, 2, 3, 4, 5, 6, 7, 8]
 */
function* flatten( array ) 
{
   if ( array[ 0 ] instanceof Array ) 
   {
     yield* flatten( array[0] );
   }
   else if( array.length > 0 )
   {
	   yield array[0];
   }	 
   
   const rest = array.slice( 1 );
   
   if ( ( rest instanceof Array ) && ( rest.length > 0 ) ) 
   {
     yield* flatten( rest );
   }
	return;
}


/*
 * Given two generators, write a function
 * that generates the interleaved sequence
 * of elements of both generators.
 * Example: given generators for even and odd
 * numbers, take(interleave(evens(), odds()), 8) => [0, 1, 2, 3, 4, 5, 6, 7]
 */
function* interleave(g1, g2) 
{
    let g11 = g1.next();
    let g22 = g2.next();
    while( ! g11.done || ! g22.done )
	{
        if( ! g11.done )
            yield g11.value;
        if( ! g22.done )
            yield g22.value;
        g11 = g1.next();
        g22 = g2.next();
    }
    return;
}
/*
 * Write a function that continuously generates
 * elements of a given array in a cyclic manner.
 * Example: take(cycle([1, 2, 3]), 8) => [1, 2, 3, 1, 2, 3, 1, 2]
 */
function* cycle( array ) 
{
    while( true )
        for( let i = 0 ; i < array.length ; i++ )
            yield array[i];
}
/*
 * Write a function that returns
 * all elements from the first array,
 * then all elements from the next array, etc.
 * This function lets us to treat an array of arrays
 * as a single collection.
 * Example: [...chain([['A', 'B'], ['C', 'D']])] => ['A', 'B', 'C', 'D']
 */
function* chain( arrays ) 
{
    for( let i = 0 ; i < arrays.length ; i++ )
	{
        let innerArray = arrays[i];
        for( let j = 0 ; j < innerArray.length ; j++)
            yield innerArray[j];
    }
   return;
}
/*
 * In order to make testing your generators easier,
 * the function take takes a generator g and a natural number n
 * and returns an array of the first n elements of g.
 * If g is exhausted before reaching n elements,
 * less than n elements are returned. 
 */
function take( g , n ) 
{
    const result = [];
    for( let i = 0 ; i < n ; i++ ) 
	{
        const { value , done } = g.next();
        if( done )
            return result;
		else
			result.push(value);
    }
    return result;
}


