/*** GiphyApi.js
***/


/*** CONSTRUCTOR GiphyApi()
***/

var GiphyApi = function( apiKey ) {
    console.group( 'CONSTRUCTOR GiphyApi()' );
    console.logValue( 'apiKey' , apiKey );

    // check apiKey
    if ( !apiKey ) {
        throw new RangeError( 'API key is required.' );
    }

    this.apiKey = apiKey;
    this.API_HOST = 'api.giphy.com';
    this.API_PATH = {
        // associative array
        'GIF_BY_ID' : '/v1/gifs' ,
        'SEARCH' : '/v1/gifs/search'
    }
    this.API_METHOD = {
        // associative array
        'GIF_BY_ID' : 'GET' ,
        'SEARCH' : 'GET'
    }

    console.logValue( 'this' , this );
    console.groupEnd();
}


/*** FUNCTION GiphyApi.newAjax()
***/

GiphyApi.prototype.newAjax = function( ajaxSettings ) {
    console.group( 'FUNCTION GiphyApi.newAjax()' );
    console.logValue( 'ajaxSettings' , ajaxSettings );

    var ajax = $.ajax( ajaxSettings );

    console.logValue( 'ajax' , ajax );
    console.groupEnd();
    return ajax;
}


/*** FUNCTION GiphyApi.newAjaxSettings()
***/

GiphyApi.prototype.newAjaxSettings = function( apiHost , apiPath , apiParameters , apiMethod ) {
    console.group( 'FUNCTION GiphyApi.newAjaxSettings()' );
    console.logValue( 'apiHost' , apiHost );
    console.logValue( 'apiPath' , apiPath );
    console.logValue( 'apiParameters' , apiParameters );
    console.logValue( 'apiMethod' , apiMethod );

    var url = `https://${ apiHost }${ apiPath }?${ $.param( apiParameters , true ) }`;
    console.logValue( 'url' , url );

    var ajaxSettings = {
        url : url ,
        method : apiMethod
    }

    console.logValue( 'ajaxSettings' , ajaxSettings );
    console.groupEnd();
    return ajaxSettings;
}


/*** FUNCTION GiphyApi.gifById()
***/

GiphyApi.prototype.gifById = function( ids ) {
    console.group( 'FUNCTION GiphyApi.gifById' );
    console.logValue( 'ids' , ids );

    // check ids
    if ( !ids ) {
        throw new RangeError( 'Parameter \'ids\' is required.' );
    }

    var apiParameters = {};
    apiParameters.api_key = this.apiKey;
    apiParameters.ids = ids;

    var ajaxSettings = this.newAjaxSettings(
        this.API_HOST ,
        this.API_PATH[ 'GIF_BY_ID' ] ,
        apiParameters ,
        this.API_METHOD[ 'GIF_BY_ID' ]
    );
    console.logValue( 'ajaxSettings' , ajaxSettings );

    var ajax = this.newAjax( ajaxSettings );
    console.logValue( 'ajax' , ajax );

    console.groupEnd();
    return ajax;
}

/*** FUNCTION GiphyApi.search()
***/

GiphyApi.prototype.search = function( q , limit , offset , rating , lang , fmt ) {
    console.group( 'FUNCTION GiphyApi.search' );
    console.logValue( 'q' , q );
    console.logValue( 'limit' , limit );
    console.logValue( 'offset' , offset );
    console.logValue( 'rating' , rating );
    console.logValue( 'lang' , lang );
    console.logValue( 'fmt' , fmt );

    // check q
    if ( !q ) {
        throw new RangeError( 'Parameter \'q\' is required.' );
    }

    var apiParameters = {};
    apiParameters.api_key = this.apiKey;
    apiParameters.q = q.replace( / /g , '+' );
    // check limit
    if ( limit ) {
        apiParameters.limit = limit;
    }
    // check offset
    if ( offset ) {
        apiParameters.offset = offset;
    }
    // check rating
    if ( rating ) {
        apiParameters.rating = rating;
    }
    // check lang
    if ( lang ) {
        apiParameters.lang = lang;
    }
    // check fmt
    if ( fmt ) {
        apiParameters.fmt = fmt;
    }
    console.logValue( 'apiParameters' , apiParameters );

    var ajaxSettings = this.newAjaxSettings(
        this.API_HOST ,
        this.API_PATH[ 'SEARCH' ] ,
        apiParameters ,
        this.API_METHOD[ 'SEARCH' ]
    );
    console.logValue( 'ajaxSettings' , ajaxSettings );

    var ajax = this.newAjax( ajaxSettings );
    console.logValue( 'ajax' , ajax );

    console.groupEnd();
    return ajax;
}


/*** Test
***/

/*
var giphyApi = new GiphyApi( 'O4Rolb03RAK6SiFmndG6Yxs0SXhhmslq' );

var ajaxSettings = giphyApi.newAjaxSettings(
    giphyApi.API_HOST ,
    giphyApi.API_PATH[ 'SEARCH' ] ,
    {
        api_key : giphyApi.apiKey ,
        q : 'formula+1' ,
        limit : 3 ,
        offset : 10
    } ,
    giphyApi.API_METHOD[ 'SEARCH' ]
);

giphyApi.newAjax( ajaxSettings )
.then(
    ( response ) => {
        console.log( 'request done' );
        console.logValue( 'response' , response );
    }
);

giphyApi.search( 'formula 1' , 3 , 10 )
.then(
    ( response ) => {
        console.log( 'request done' );
        console.logValue( 'response' , response );
    }
);

giphyApi.gifById( '41f98f3lAC38I6Sof0' )
.then(
    ( response ) => {
        console.log( 'request done' );
        console.logValue( 'response' , response );
    }
);
*/

/*
$.when(
    giphyApi.search( 'formula 1' , 3 , 10 )
)
.then(
    ( response ) => {
        console.log( 'request done' );
        console.logValue( 'response' , response );
    }
);
console.log( 'after $.when().then ');
*/
