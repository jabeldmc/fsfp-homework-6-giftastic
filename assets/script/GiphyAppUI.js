/*** GiphyAppUI.js
***/


/*** FUNCTION uiToggleImageAnimation()
***/

uiToggleImageAnimation = function( appSearchResultImageId ) {
    console.group( "FUNCTION uiToggleImageAnimation()" );
    console.logValue( "appSearchResultImageId" , appSearchResultImageId );

    var selector = ( '#' + appSearchResultImageId );
    var appSearchResultImageJQ = $( selector );

    if ( appSearchResultImageJQ.attr( "data-is-animated" ) === "false" ) {
        appSearchResultImageJQ
            .attr( "data-is-animated" , "true" )
            .attr( "src" , appSearchResultImageJQ.attr( "data-animated-src" ) );

    }
    else if ( appSearchResultImageJQ.attr( "data-is-animated" ) === "true" ) {
        appSearchResultImageJQ
            .attr( "data-is-animated" , "false" )
            .attr( "src" , appSearchResultImageJQ.attr( "data-still-src" ) );
    };

    console.groupEnd();
};


/*** FUNCTION uiUpdateSearchTerms()
***/

var uiUpdateSearchTerms = function() {
    console.group( "FUNCTION uiUpdateSearchTerms()" );
    console.logValue( "giphyAppModel.searchTerms" , giphyAppModel.searchTerms );

    var appSearchTermsJQ = $( "#app-search-terms" );
    appSearchTermsJQ.empty();

    // create a button for each searchTerm
    giphyAppModel.searchTerms.forEach(
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
    );

    console.groupEnd();
};


/*** FUNCTION uiUpdateSearchResults()
***/

var uiUpdateSearchResults = function() {
    console.group( "FUNCTION uiUpdateSearchResults()" );
    console.logValue( "giphyAppModel.searchResults" , giphyAppModel.searchResults );

    var appSearchResultsJQ = $( "#app-search-results" );
    appSearchResultsJQ.empty();

    // create an image for each searchResultId
    giphyAppModel.searchResultIds.forEach(
        ( searchResultId , searchResultIdIndex ) => {
            var searchResult = giphyAppModel.searchResults[ searchResultId ];
            var appSearchResultJQ =
                $( "<div>" )
                    .attr( "id" , ( "app-search-result-$INDEX".replace( "$INDEX" , searchResultIdIndex.toString() ) ) );
            var appSearchResultImageJQ =
                $( "<img>" )
                    .attr( "id" , ( "app-search-result-$INDEX-image".replace( "$INDEX" , searchResultIdIndex.toString() ) ) )
                    .attr( "class" , "app-search-result-image" )
                    .attr( "src" , searchResult.images.fixed_width_still.url )
                    .attr( "data-is-animated" , "false" )
                    .attr( "data-still-src" , searchResult.images.fixed_width_still.url )
                    .attr( "data-animated-src" , searchResult.images.fixed_width.url );
            var appSearchResultIDJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-id".replace( "$INDEX" , searchResultIdIndex.toString() ) ) )
                    .text( "ID: $ID".replace( "$ID" , searchResultId ) );
            var appSearchResultTitleJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-title".replace( "$INDEX" , searchResultIdIndex.toString() ) ) )
                    .text( "Title: $TITLE".replace( "$TITLE" , searchResult.title ) );
            var appSearchResultUrlJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-url".replace( "$INDEX" , searchResultIdIndex.toString() ) ) )
                    .text( "URL: $URL".replace( "$URL" , searchResult.url ) );
            var appSearchResultRatingJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-rating".replace( "$INDEX" , searchResultIdIndex.toString() ) ) )
                    .text( "Rating: $RATING".replace( "$RATING" , searchResult.rating ) );
            var appSearchResultFavoriteJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-search-result-$INDEX-favorite".replace( "$INDEX" , searchResultIdIndex.toString() ) ) )
                    .attr( "class" , "app-search-result-favorite" )
                    .attr( "data-image-id" , searchResultId )
                    .text( "Add to Favorites" );

            appSearchResultJQ
                .append( appSearchResultImageJQ )
                .append( appSearchResultIDJQ )
                .append( appSearchResultTitleJQ )
                .append( appSearchResultUrlJQ )
                .append( appSearchResultRatingJQ )
                .append( appSearchResultFavoriteJQ );
            appSearchResultsJQ
                .append( appSearchResultJQ );
        }
    );

    console.groupEnd();
};


/*** FUNCTION uiUpdateFavorites()
***/

var uiUpdateFavorites = function() {
    console.group( "FUNCTION uiUpdateFavorites()" );
    console.logValue( "giphyAppModel.favorites" , giphyAppModel.favorites );

    var appFavoritesJQ = $( "#app-favorites" );
    appFavoritesJQ.empty();

    // create an image for each favorite
    giphyAppModel.favoriteIds.forEach(
        ( favoriteId , favoriteIdIndex ) => {
            var favorite = giphyAppModel.favorites[ favoriteId ];
            var appFavoriteJQ =
                $( "<div>" )
                    .attr( "id" , ( "app-favorite-$INDEX".replace( "$INDEX" , favoriteIdIndex.toString() ) ) );
            var appFavoriteImageJQ =
                $( "<img>" )
                    .attr( "id" , ( "app-favorite-$INDEX-image".replace( "$INDEX" , favoriteIdIndex.toString() ) ) )
                    .attr( "class" , "app-search-result-image" )
                    .attr( "src" , favorite.images.fixed_width_still.url )
                    .attr( "data-is-animated" , "false" )
                    .attr( "data-still-src" , favorite.images.fixed_width_still.url )
                    .attr( "data-animated-src" , favorite.images.fixed_width.url );
            var appFavoriteIDJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-favorite-$INDEX-id".replace( "$INDEX" , favoriteIdIndex.toString() ) ) )
                    .text( "ID: $ID".replace( "$ID" , favoriteId ) );
            var appFavoriteTitleJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-favorite-$INDEX-title".replace( "$INDEX" , favoriteIdIndex.toString() ) ) )
                    .text( "Title: $TITLE".replace( "$TITLE" , favorite.title ) );
            var appFavoriteUrlJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-favorite-$INDEX-url".replace( "$INDEX" , favoriteIdIndex.toString() ) ) )
                    .text( "URL: $URL".replace( "$URL" , favorite.url ) );
            var appFavoriteRatingJQ =
                $( "<p>" )
                    .attr( "id" , ( "app-favorite-$INDEX-rating".replace( "$INDEX" , favoriteIdIndex.toString() ) ) )
                    .text( "Rating: $RATING".replace( "$RATING" , favorite.rating ) );

            appFavoriteJQ
                .append( appFavoriteImageJQ )
                .append( appFavoriteIDJQ )
                .append( appFavoriteTitleJQ )
                .append( appFavoriteUrlJQ )
                .append( appFavoriteRatingJQ )
            appFavoritesJQ
                .append( appFavoriteJQ );
        }
    );

    console.groupEnd();
};


/*** FUNCTION uiUpdate
***/

var uiUpdate = function() {
    console.group( "FUNCTION uiUpdate()" );

    uiUpdateSearchTerms();
    uiUpdateSearchResults();
    uiUpdateFavorites();

    console.groupEnd();
};


/*** FUNCTION handleClickAppAddSearchTermSubmit()
***/

handleClickAppAddSearchTermSubmit = function( event ) {
    console.group( "FUNCTION handleClickAppAddSearchTermSubmit()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );
    console.logValue( "$( this ).attr(  \"id\" )" , $( this ).attr( "id" ) );

    event.preventDefault();
    var searchTerm = $( "#app-add-search-term-text" ).val();
    // check searchTerm
    if ( searchTerm !== "" ) {
        giphyAppModel.addSearchTerm( searchTerm );
        uiUpdateSearchTerms();
        $( "#app-add-search-term-text" ).val( "" );
    };

    console.groupEnd();
};


/*** FUNCTION handleClickAppSearchTermButton()
***/

handleClickAppSearchTermButton = function( event ) {
    console.group( "FUNCTION handleClickAppSearchTermButton()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );
    console.logValue( "$( this ).attr(  \"id\" )" , $( this ).attr( "id" ) );

    var searchTerm = $( this ).attr( "data-search-term" );
    giphyAppModel.searchAjaxEx( searchTerm )
        .then(
            ( ajaxMeta ) => {
                console.logValue( "ajaxMeta" , ajaxMeta );
                uiUpdateSearchResults();
            }
        );

    console.groupEnd();
};


/*** FUNCTION handleClickAppSearchResultImage()
***/

handleClickAppSearchResultImage = function( event ) {
    console.group( "FUNCTION handleClickAppSearchResultImage()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );
    console.logValue( "$( this ).attr(  \"id\" )" , $( this ).attr( "id" ) );

    var searchResultImageId = $( this ).attr( "id" );
    uiToggleImageAnimation( searchResultImageId );

    console.groupEnd();
};


/*** FUNCTION handleClickAppSearchResultFavorite()
***/

handleClickAppSearchResultFavorite = function( event ) {
    console.group( "FUNCTION handleClickAppSearchResultFavorite()" );
    console.logValue( "event.type" , event.type );
    console.logValue( "event.currentTarget.id" , event.currentTarget.id );
    console.logValue( "$( this ).attr(  \"id\" )" , $( this ).attr( "id" ) );

    var searchResultId = $( this ).attr( "data-image-id" );
    giphyAppModel.addFavorite( searchResultId );
    uiUpdateFavorites();

    console.groupEnd();
};


/*** FUNCTION handleReady()
***/

handleReady = function( event ) {
    console.group( "FUNCTION handleReady()" );

    giphyAppModel = new GiphyAppModel( API_KEY , SEARCH_TERMS );
    // register event handlers
    $( "#app-add-search-term-submit" ).on( "click" , handleClickAppAddSearchTermSubmit );
    $( document ).on( "click" , ".app-search-term-button" , handleClickAppSearchTermButton );
    $( document ).on( "click" , ".app-search-result-image" , handleClickAppSearchResultImage );
    $( document ).on( "click" , ".app-search-result-favorite" , handleClickAppSearchResultFavorite );
    uiUpdate();

    console.groupEnd();
};


/*** Run
***/

const API_KEY = "O4Rolb03RAK6SiFmndG6Yxs0SXhhmslq";

const SEARCH_TERMS = [
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
];

var giphyAppModel;

$( handleReady );
// $( document ).ready( handleReady )
