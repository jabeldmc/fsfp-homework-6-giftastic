/*** GiphyAppModel.js
***/


/*** CONSTRUCTOR GiphyAppModel()
***/

var GiphyAppModel = function( apiKey , searchTerms ) {
    console.group( "CONSTRUCTOR GiphyAppModel()" );
    console.logValue( "searchTerms" , searchTerms );

    // check apiKey
    if ( apiKey === undefined ) {
        throw new RangeError( "API key is required." );
    }
    else {
        this.apiKey = apiKey;
    };
    this.API_HOST = "api.giphy.com";
    this.API_ENDPOINT = {
        // associative array
        "SEARCH" : "/v1/gifs/search" ,
        "TRENDING" : "/v1/gifs/trending"
    };
    // check searchTerms
    if ( searchTerms === undefined ) {
        this.searchTerms = [];
    }
    else {
        this.searchTerms = searchTerms;
    };
    this.searchTermOffset = {};    // associative array
    this.searchResults = {};    // associative array
    this.searchResultIds = [];
    this.favorites = {};     // associative array
    this.favoriteIds = [];

    console.logValue( "this" , this );
    console.groupEnd();
};


/*** FUNCTION addSearchTerm()
***/

GiphyAppModel.prototype.addSearchTerm = function( searchTerm ) {
    console.group( "FUNCTION addSearchTerm()" );
    console.logValue( "searchTerm" , searchTerm );

    // check searchTerm
    if ( searchTerm === undefined ) {
        throw new RangeError( "Parameter 'searchTerm' is required." );
    }

    this.searchTerms.push( searchTerm );

    console.logValue( "this.searchTerms" , this.searchTerms );
    console.groupEnd();
};


/*** FUNCTION addSearchResults()
***/

GiphyAppModel.prototype.addSearchResults = function( searchResults ) {
    console.group( "FUNCTION addSearchResults()" );
    console.logValue( "searchResults" , searchResults );

    searchResults.forEach(
        ( searchResult , searchResultIndex ) => {
            this.searchResultIds.unshift( searchResult.id );
            this.searchResults[ searchResult.id ] = searchResult;
        }
    );

    console.logValue( "this.searchResultIds" , this.searchResultIds );
    console.logValue( "this.searchResults" , this.searchResults );
    console.groupEnd();
};


/*** FUNCTION addFavorite()
***/

GiphyAppModel.prototype.addFavorite = function( searchResultId ) {
    console.group( "FUNCTION addFavorite()" );
    console.logValue( "searchResultId" , searchResultId );

    // check searchResultId
    if ( searchResultId === undefined ) {
        throw new RangeError( "Parameter 'searchResultId' is required." );
    }

    this.favoriteIds.push( searchResultId );
    this.favorites[ searchResultId ] = this.searchResults[ searchResultId ];

    console.logValue( "this.favorites" , this.favorites );
    console.groupEnd();
};


/*** FUNCTION searchAjaxSettings()
***/

GiphyAppModel.prototype.searchAjaxSettings = function( q , limit , offset , rating , lang , fmt  ) {
    console.group( "FUNCTION searchAjaxSettings()" );
    console.logValue( "q" , q );
    console.logValue( "limit" , limit );
    console.logValue( "offset" , offset );
    console.logValue( "rating" , rating );
    console.logValue( "lang" , lang );
    console.logValue( "fmt" , fmt );

    // check q
    if ( q === undefined ) {
        throw new RangeError( "Parameter 'q' is required." );
    };

    var urlParameter = {};

    urlParameter.api_key = this.apiKey;
    urlParameter.q = q.replace( / /g , '+' );
    // check limit
    if ( limit !== undefined ) {
        urlParameter.limit = limit;
    };
    // check offset
    if ( offset !== undefined ) {
        urlParameter.offset = offset;
    };
    // check rating
    if ( rating !== undefined ) {
        urlParameter.rating = rating;
    };
    // check lang
    if ( lang !== undefined ) {
        urlParameter.lang = lang;
    };
    // check fmt
    if ( fmt !== undefined ) {
        urlParameter.fmt = fmt;
    };
    // console.logValue( "urlParameter" , urlParameter );

    var url =
        "https://$API_HOST$API_ENDPOINT?$URL_PARAMETERS"
        .replace( "$API_HOST" , this.API_HOST )
        .replace( "$API_ENDPOINT" , this.API_ENDPOINT[ "SEARCH" ] )
        .replace( "$URL_PARAMETERS" , $.param( urlParameter , true ) );
    // console.logValue( "url" , url );

    var ajaxSettings = {
        url : url ,
        method : "GET"
    };

    console.logValue( "ajaxSettings" , ajaxSettings );
    console.groupEnd();
    return ajaxSettings;
};


/*** FUNCTION searchAjax()
***/

GiphyAppModel.prototype.searchAjax = function( q , limit , offset , rating , lang , fmt ) {
    console.group( "FUNCTION searchAjax()" );
    console.logValue( "q" , q );
    console.logValue( "limit" , limit );
    console.logValue( "offset" , offset );
    console.logValue( "rating" , rating );
    console.logValue( "lang" , lang );
    console.logValue( "fmt" , fmt );

    var ajaxSettings = this.searchAjaxSettings( q , limit , offset , rating , lang , fmt  );

    var promise =
        new Promise(
            ( resolve , reject ) => {
                $.ajax( ajaxSettings )
                    .done(
                        ( ajaxResponse ) => {
                            console.group( "FUNCTION searchAjax/$.ajax()" );

                            console.logValue( "ajaxResponse" , ajaxResponse );
                            this.addSearchResults( ajaxResponse.data );

                            console.groupEnd();
                            resolve( ajaxResponse.meta );
                        }
                    )
            }
        );

    console.groupEnd();
    return promise;
};


/*** FUNCTION searchAjaxEx()
***/

GiphyAppModel.prototype.searchAjaxEx = function( q ) {
    console.group( "FUNCTION searchAjaxEx()" );
    console.logValue( "q" , q );

    // check q
    if ( q === undefined ) {
        throw new RangeError( "Parameter 'q' is required." );
    };

    var limit = 10
    if ( this.searchTermOffset[ q ] === undefined ) {
        this.searchTermOffset[ q ] = 0;
    };
    var offset = this.searchTermOffset[ q ];
    var rating = undefined;
    var lang = undefined;
    var fmt = undefined;

    promise = this.searchAjax( q , limit , offset , rating , lang , fmt  );
    this.searchTermOffset[ q ] += limit;

    console.groupEnd();
    return promise;
};


/*** Testing

var giphyAppModel = new GiphyAppModel( "O4Rolb03RAK6SiFmndG6Yxs0SXhhmslq" );

giphyAppModel.addSearchTerm( "Kalafina Keiko Hikaru Wakana" );

giphyAppModel.searchAjaxSettings( "Kalafina Keiko Hikaru Wakana" , 10 , 20 );

giphyAppModel.searchAjax( "Kalafina Keiko Hikaru Wakana" , 10 , 20 )
    .then(
        ( ajaxMeta ) => {
            console.log( "ajax finished" );
            console.logValue( "ajaxMeta" , ajaxMeta );
        }
    );

giphyAppModel.searchAjaxEx( "Kalafina Keiko Hikaru Wakana" )
    .then(
        ( ajaxMeta ) => {
            console.log( "ajax finished" );
            console.logValue( "ajaxMeta" , ajaxMeta );
        }
    );

giphyAppModel.addFavorite( giphyAppModel.searchResultIds[ 0 ] );

***/
