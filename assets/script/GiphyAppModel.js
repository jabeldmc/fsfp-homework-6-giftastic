/*** GiphyAppModel.js
***/


/*** CONSTRUCTOR GiphyAppModel()
***/

var GiphyAppModel = function( apiKey , searchTerms ) {
    console.group( 'CONSTRUCTOR GiphyAppModel()' );
    console.logValue( 'searchTerms' , searchTerms );

    this.giphyApi = new GiphyApi( apiKey );

    // check searchTerms
    if ( !searchTerms ) {
        this.searchTerms = [];
    }
    else {
        this.searchTerms = searchTerms;
    }

    this.SEARCH_LIMIT = 10;

    this.searchOffset = {};    // associative array
    this.searchTerms.forEach(
        ( searchTerm , searchTermIndex ) => {
            this.searchOffset[ searchTerm ] = 0;
        }
    );

    this.searchResultIds = [];
    this.searchResults = {};    // associative array

    // load from local storage
    this.favoriteIds = JSON.parse( localStorage.getItem( 'favoriteIds' ) );
    this.favorites = JSON.parse( localStorage.getItem( 'favorites' ) );    // associative array
    // check local storage
    if (
         ( !this.favoriteIds ) ||
         ( !this.favorites )
    ) {
        this.favoriteIds = [];
        this.favorites = {};     // associative array
    }

    console.logValue( 'this' , this );
    console.groupEnd();
}


/*** FUNCTION GiphyAppModel.addSearchTerm()
***/

GiphyAppModel.prototype.addSearchTerm = function( searchTerm ) {
    console.group( 'FUNCTION GiphyAppModel.addSearchTerm()' );
    console.logValue( 'searchTerm' , searchTerm );

    // check searchTerm
    if ( !searchTerm ) {
        throw new RangeError( 'Parameter \'searchTerm\' is required.' );
    }

    this.searchTerms.push( searchTerm );

    console.logValue( 'this.searchTerms' , this.searchTerms );
    console.groupEnd();
}


/*** FUNCTION GiphyAppModel.addSearchResults()
***/

GiphyAppModel.prototype.addSearchResults = function( searchResults ) {
    console.group( 'FUNCTION GiphyAppModel.addSearchResults()' );
    console.logValue( 'searchResults' , searchResults );

    searchResults.forEach(
        ( searchResult , searchResultIndex ) => {
            this.searchResultIds.unshift( searchResult.id );
            this.searchResults[ searchResult.id ] = searchResult;
        }
    );

    console.logValue( 'this.searchResultIds' , this.searchResultIds );
    console.logValue( 'this.searchResults' , this.searchResults );
    console.groupEnd();
}


/*** FUNCTION GiphyAppModel.giphySearch()
***/

GiphyAppModel.prototype.giphySearch = function( searchTerm ) {
    console.group( 'FUNCTION GiphyAppModel.giphySearch()' );

    var limit = this.SEARCH_LIMIT;
    var offset = this.searchOffset[ searchTerm ];

    // Promise chain
    // The then() function returns a new promise, different from the original
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
    var promise =
        this.giphyApi.search( searchTerm , limit , offset )
            .then(
                ( response ) => {
                    console.logValue( 'response' , response );

                    if ( response.meta.status === 200 ) {
                        this.searchOffset[ searchTerm ] += response.pagination.count;
                        this.addSearchResults( response.data );
                    }
                }
            );

    console.logValue( 'promise' , promise );
    console.groupEnd();
    return promise;
}


/*** FUNCTION GiphyAppModel.addFavorite()
***/

GiphyAppModel.prototype.addFavorite = function( searchResultId ) {
    console.group( 'FUNCTION GiphyAppModel.addFavorite()' );
    console.logValue( 'searchResultId' , searchResultId );

    // check searchResultId
    if ( !searchResultId ) {
        throw new RangeError( 'Parameter \'searchResultId\' is required.' );
    }

    // check if already exists
    if ( this.favoriteIds.indexOf( searchResultId ) === -1 ) {
        this.favoriteIds.unshift( searchResultId );
        this.favorites[ searchResultId ] = this.searchResults[ searchResultId ];

        // update localStorage
        localStorage.setItem( 'favoriteIds' , JSON.stringify( this.favoriteIds ) );
        localStorage.setItem( 'favorites' , JSON.stringify( this.favorites ) );
    }

    console.logValue( 'this.favoriteIds' , this.favoriteIds );
    console.logValue( 'this.favorites' , this.favorites );
    console.logValue( 'localStorage' , localStorage );
    console.groupEnd();
}


/*** FUNCTION GiphyAppModel.removeFavorite()
***/

GiphyAppModel.prototype.removeFavorite = function( favoriteId ) {
    console.group( 'FUNCTION GiphyAppModel.removeFavorite()' );
    console.logValue( 'favoriteId' , favoriteId );

    // check favoriteId
    if ( !favoriteId ) {
        throw new RangeError( 'Parameter \'favoriteId\' is required.' );
    }

    // check if already exists
    var favoriteIndex = this.favoriteIds.indexOf( favoriteId );
    if ( favoriteIndex > -1 ) {
        this.favoriteIds.splice( favoriteIndex , 1 );
        delete this.favorites.favoriteId;

        // update localStorage
        localStorage.setItem( 'favoriteIds' , JSON.stringify( this.favoriteIds ) );
        localStorage.setItem( 'favorites' , JSON.stringify( this.favorites ) );
    }

    console.logValue( 'this.favoriteIds' , this.favoriteIds );
    console.logValue( 'this.favorites' , this.favorites );
    console.logValue( 'localStorage' , localStorage );
    console.groupEnd();
}
