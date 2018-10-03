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


/*** Update UI/FUNCTION UpdateUISearchTerms()
***/

var updateUISearchTerms = function() {
    console.group( "FUNCTION updateUISearchTerms" );

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

            appSearchResultJQ.append( appSearchResultImageJQ );
            appSearchResultJQ.append( appSearchResultIDJQ );
            appSearchResultJQ.append( appSearchResultTitleJQ );
            appSearchResultJQ.append( appSearchResultURLJQ );
            appSearchResultJQ.append( appSearchResultRatingJQ );
            appSearchResultsJQ.append( appSearchResultJQ );
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


/*** App/FUNCTION appCallAPI()
***/

appCallAPI = function( searchTerm ) {
    console.group( "FUNCTION appCallAPI()" );
    console.logValue( "searchTerm" , searchTerm );

    var pAPIKey = "O4Rolb03RAK6SiFmndG6Yxs0SXhhmslq";
    var pQ = searchTerm.replace( / /g , '+' );
    var pLimit = 10;
    var ajaxRequestURL =
        "https://api.giphy.com/v1/gifs/search?api_key=$API_KEY&q=$Q&limit=$LIMIT"
            .replace( "$API_KEY" , pAPIKey )
            .replace( "$Q" , pQ )
            .replace( "$LIMIT" , pLimit.toString() );
    var ajaxRequest = {
        url : ajaxRequestURL ,
        method : "GET"
    }

    $.ajax( ajaxRequest )
        .then(
            ( response ) => {
                console.group( "$.ajax().then( ( response ) => {} )" );
                console.logValue( "response" , response );

                // searchResults = response.data;
                response.data.forEach(
                    ( dataElement , dataIndex ) => {
                        searchResults.unshift( dataElement );
                    }
                );

                updateUISearchResults();

                console.groupEnd();
            }
        );

    console.log( "appCallAPI done" );
    console.groupEnd();
}


/*** Event Handlers/FUNCTION handleClickAddSerchTerm()
***/

handleClickAddSerchTerm = function( event ) {
    console.group( "FUNCTION handleClickAddSerchTerm()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );

    // prevent form from submitting
    event.preventDefault();

    var searchTerm = $( "#app-add-search-term-text" ).val();
    searchTerms.push( searchTerm );
    updateUISearchTerms();

    console.groupEnd();
}


/*** Event Handlers/FUNCTION handleClickSearchTerm()
***/

handleClickSearchTerm = function( event ) {
    console.group( "FUNCTION handleClickSearchTerm()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );

    var selector = ( '#' + event.currentTarget.id );
    var searchTerm =
        $( selector )
            .attr( "data-search-term" );
    appCallAPI( searchTerm );

    console.groupEnd();
}


/*** Event Handlers/FUNCTION handleClickSearchResult()
***/

handleClickSearchResult = function( event ) {
    console.group( "FUNCTION handleClickSearchResult()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );

    var selector = ( '#' + event.currentTarget.id );
    var appSearchResultImageJQ = $( selector );
    console.logValue( "data-is-animated" , appSearchResultImageJQ.attr( "data-is-animated" ) );

    if ( appSearchResultImageJQ.attr( "data-is-animated" ) === "false" ) {
        appSearchResultImageJQ
            .attr( "data-is-animated" , "true" )
            .attr( "src" , appSearchResultImageJQ.attr( "data-animated" ) );

    }
    else if ( appSearchResultImageJQ.attr( "data-is-animated" ) === "true" ) {
        appSearchResultImageJQ
            .attr( "data-is-animated" , "false" )
            .attr( "src" , appSearchResultImageJQ.attr( "data-still" ) );
    }

    console.groupEnd();
}


/*** Event Handlers/FUNCTION handleReady()
***/

handleReady = function( event ) {
    console.group( "FUNCTION handleReady()" );

    // register event handlers
    $( "#app-add-search-term-submit" ).on( "click" , handleClickAddSerchTerm );
    $( document ).on( "click" , ".app-search-term-button" , handleClickSearchTerm );
    $( document ).on( "click" , ".app-search-result-image" , handleClickSearchResult );


    updateUI();

    console.groupEnd();
}


/*** register event handlers
***/

$( handleReady );
// $( document ).ready( handleReady )
