var searchTerms = [
    "Sebastian Vettel" ,
    "Kimi Räikkönen" ,
    "Sergio Pérez" ,
    "Esteban Ocon" ,
    "Romain Grosjean" ,
    "Kevin Magnussen" ,
    "Stoffel Vandoorne" ,
    "Fernando Alonso" ,
    "Lewis Hamilton" ,
    "Valtteri Bottas" ,
    "Daniel Ricciardo" ,
    "Max Verstappen" ,
    "Nico Hülkenberg" ,
    "Carlos Sainz Jr." ,
    "Marcus Ericsson" ,
    "Charles Leclerc" ,
    "Pierre Gasly" ,
    "Brendon Hartley" ,
    "Lance Stroll" ,
    "Sergey Sirotkin"
]

var searchResults = [];


/*** App/FUNCTION appAddSearchTerm()
***/

appAddSearchTerm = function() {
    console.group( "FUNCTION appAddSearchTerm()" );

    var searchTerm = $( "#app-add-search-term-text" ).val();
    // console.logValue( "searchTerm" , searchTerm );
    searchTerms.push( searchTerm );

    console.logValue( "searchTerms" , searchTerms );
    console.groupEnd();
}


/*** App/FUNCTION appNewAjaxSettings()
***/

appNewAjaxSettings = function( searchTerm ) {
    console.group( "FUNCTION appNewAjaxSettings()" );
    console.logValue( "searchTerm" , searchTerm );

    var urlAPIKey = "O4Rolb03RAK6SiFmndG6Yxs0SXhhmslq";
    var urlQ = searchTerm.replace( / /g , '+' );
    var urlLimit = 10;
    var ajaxRequestURL =
        "https://api.giphy.com/v1/gifs/search?api_key=$API_KEY&q=$Q&limit=$LIMIT"
            .replace( "$API_KEY" , urlAPIKey )
            .replace( "$Q" , urlQ )
            .replace( "$LIMIT" , urlLimit.toString() );
    var ajaxSettings = {
        url : ajaxRequestURL ,
        method : "GET"
    };

    console.logValue( "ajaxSettings" , ajaxSettings );
    console.groupEnd();
    return ajaxSettings;
}


/*** App/FUNCTION appAddSearchResults()
***/

appAddSearchResults = function( ajaxResponse ) {
    console.group( "FUNCTION appAddSearchResults()" );
    console.logValue( "ajaxResponse" , ajaxResponse );

    ajaxResponse.data.forEach(
        ( dataElement , dataIndex ) => {
            searchResults.unshift( dataElement );
        }
    );

    console.logValue( "searchResults" , searchResults );
    console.groupEnd();
}


/*** App/FUNCTION appToggleImageAnimation()
***/

appToggleImageAnimation = function( imageId ) {
    console.group( "FUNCTION appToggleImageAnimation()" );
    console.logValue( "imageId" , imageId );

    var selector = ( '#' + imageId );
    var imageJQ = $( selector );

    if ( imageJQ.attr( "data-is-animated" ) === "false" ) {
        imageJQ
            .attr( "data-is-animated" , "true" )
            .attr( "src" , imageJQ.attr( "data-animated" ) );

    }
    else if ( imageJQ.attr( "data-is-animated" ) === "true" ) {
        imageJQ
            .attr( "data-is-animated" , "false" )
            .attr( "src" , imageJQ.attr( "data-still" ) );
    }

    console.logValue( "searchResults" , searchResults );
    console.groupEnd();
}


/*** Update UI/FUNCTION UpdateUISearchTerms()
***/

var updateUISearchTerms = function() {
    console.group( "FUNCTION updateUISearchTerms()" );

    var appSearchTermsJQ = $( "#app-search-terms" );
    appSearchTermsJQ.empty();

    // create a button for each searchTerm
    searchTerms.forEach(
        ( searchTerm , searchTermIndex ) => {
            var appSearchTermJQ =
                $( "<div>" )
                    .attr( "id" , ( "app-search-term-$INDEX".replace( "$INDEX" , searchTermIndex.toString() ) ) );
            var appSearchTermButtonJQ =
                $( "<button>" )
                    .attr( "id" , ( "app-search-term-$INDEX-button".replace( "$INDEX" , searchTermIndex.toString() ) ) )
                    .attr( "class" , "app-search-term-button" )
                    .attr( "data-search-term" , searchTerm )
                    .text( searchTerm );
            appSearchTermJQ.append( appSearchTermButtonJQ );
            appSearchTermsJQ.append( appSearchTermJQ );
        }
    )

    console.groupEnd();
}


/*** Update UI/FUNCTION updateUISearchResults()
***/

var updateUISearchResults = function() {
    console.group( "FUNCTION updateUISearchResults" );

    console.logValue( "searchResults" , searchResults );
    var appSearchResultsJQ = $( "#app-search-results" );
    appSearchResultsJQ.empty();

    // create an image for each searchTerm
    searchResults.forEach(
        ( searchResult , searchResultIndex ) => {
            var appSearchResultJQ =
                $( "<div>" )
                    .attr( "id" , ( "app-search-result-$INDEX".replace( "$INDEX" , searchResultIndex.toString() ) ) );
            var appSearchResultImageJQ =
                $( "<img>" )
                    .attr( "id" , ( "app-search-result-$INDEX-image".replace( "$INDEX" , searchResultIndex.toString() ) ) )
                    .attr( "class" , "app-search-result-image" )
                    .attr( "src" , searchResult.images.fixed_width_still.url )
                    .attr( "data-is-animated" , "false" )
                    .attr( "data-still" , searchResult.images.fixed_width_still.url )
                    .attr( "data-animated" , searchResult.images.fixed_width.url );
            var appSearchResultIDJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-id".replace( "$INDEX" , searchResultIndex.toString() ) ) )
                    .text( "ID: $ID".replace( "$ID" , searchResult.id  ) );
            var appSearchResultTitleJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-title".replace( "$INDEX" , searchResultIndex.toString() ) ) )
                    .text( "Title: $TITLE".replace( "$TITLE" , searchResult.title  ) );
            var appSearchResultURLJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-url".replace( "$INDEX" , searchResultIndex.toString() ) ) )
                    .text( "URL: $URL".replace( "$URL" , searchResult.url  ) );
            var appSearchResultRatingJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-rating".replace( "$INDEX" , searchResultIndex.toString() ) ) )
                    .text( "Rating: $RATING".replace( "$RATING" , searchResult.rating  ) );

            appSearchResultJQ
                .append( appSearchResultImageJQ )
                .append( appSearchResultIDJQ )
                .append( appSearchResultTitleJQ )
                .append( appSearchResultURLJQ )
                .append( appSearchResultRatingJQ )
                .appendTo( appSearchResultsJQ );
        }
    )

    console.groupEnd();
}


/*** Update UI/FUNCTION UpdateUI
***/

var updateUI = function() {
    updateUISearchTerms();
    updateUISearchResults();
}


/*** Event Handlers/FUNCTION handleClickAddSearchTerm()
***/

handleClickAddSearchTerm = function( event ) {
    console.group( "FUNCTION handleClickAddSearchTerm()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );
    console.logValue( "$( this ).attr(  \"id\" )" , $( this ).attr( "id" ) );

    event.preventDefault();
    appAddSearchTerm();
    updateUISearchTerms();

    console.groupEnd();
}


/*** Event Handlers/FUNCTION handleClickSearchTerm()
***/

handleClickSearchTerm = function( event ) {
    console.group( "FUNCTION handleClickSearchTerm()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );
    console.logValue( "$( this ).attr(  \"id\" )" , $( this ).attr( "id" ) );

    var searchTerm = $( this ).attr( "data-search-term" );
    var ajaxSettings = appNewAjaxSettings( searchTerm );
    $.ajax( ajaxSettings )
        .then(
            ( ajaxResponse ) => {
                appAddSearchResults( ajaxResponse );
                updateUISearchResults();
            }
         );

    console.groupEnd();
}


/*** Event Handlers/FUNCTION handleClickSearchResult()
***/

handleClickSearchResult = function( event ) {
    console.group( "FUNCTION handleClickSearchResult()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );
    console.logValue( "$( this ).attr(  \"id\" )" , $( this ).attr( "id" ) );

    var eventTargetId = $( this ).attr( "id" );
    appToggleImageAnimation( eventTargetId );

    console.groupEnd();
}


/*** Event Handlers/FUNCTION handleReady()
***/

handleReady = function( event ) {
    console.group( "FUNCTION handleReady()" );

    // register event handlers
    $( "#app-add-search-term-submit" ).on( "click" , handleClickAddSearchTerm );
    $( document ).on( "click" , ".app-search-term-button" , handleClickSearchTerm );
    $( document ).on( "click" , ".app-search-result-image" , handleClickSearchResult );
    updateUI();

    console.groupEnd();
}


/*** register event handlers
***/

$( handleReady );
// $( document ).ready( handleReady )
