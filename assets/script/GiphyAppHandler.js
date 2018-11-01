/*** GiphyAppHandler.js
***/


/*** FUNCTION handleClickAddSearchTermSubmit()
***/

handleClickAddSearchTermSubmit = function( event ) {
    console.group( 'FUNCTION handleClickAddSearchTermSubmit()' );
    console.logValue( 'event.type' , event.type );
    console.logValue( 'event.currentTarget.id' , event.currentTarget.id );
    console.logValue( '$( this ).attr( \'id\' )' , $( this ).attr( 'id' ) );

    event.preventDefault();
    var searchTerm = $( '#app-search-terms-add-text' ).val();
    // check searchTerm
    if ( searchTerm ) {
        giphyAppModel.addSearchTerm( searchTerm );
        uiUpdateSearchTerms();
        $( '#app-search-terms-add-text' ).val( '' );
    }

    console.groupEnd();
}


/*** FUNCTION handleClickSearchTermButton()
***/

handleClickSearchTermButton = function( event ) {
    console.group( 'FUNCTION handleClickSearchTermButton()' );
    console.logValue( 'event.type' , event.type );
    console.logValue( 'event.currentTarget.id' , event.currentTarget.id );
    console.logValue( '$( this ).attr(  \'id\' )' , $( this ).attr( 'id' ) );

    var searchTerm = $( this ).attr( 'data-search-term' );
    giphyAppModel.giphySearch( searchTerm )
        .then(
            () => uiUpdateSearchResults()
        );

    console.groupEnd();
}


/*** FUNCTION handleClickSearchResultImage()
***/

handleClickSearchResultImage = function( event ) {
    console.group( 'FUNCTION handleClickSearchResultImage()' );
    console.logValue( 'event.type' , event.type );
    console.logValue( 'event.currentTarget.id' , event.currentTarget.id );
    console.logValue( '$( this ).attr(  \'id\' )' , $( this ).attr( 'id' ) );

    var searchResultImageId = $( this ).attr( 'id' );
    uiToggleImageAnimation( searchResultImageId );

    console.groupEnd();
}


/*** FUNCTION handleClickSearchResultAddFavorite()
***/

handleClickSearchResultAddFavorite = function( event ) {
    console.group( 'FUNCTION handleClickSearchResultAddFavorite()' );
    console.logValue( 'event.type' , event.type );
    console.logValue( 'event.currentTarget.id' , event.currentTarget.id );
    console.logValue( '$( this ).attr(  \'id\' )' , $( this ).attr( 'id' ) );

    var searchResultId = $( this ).attr( 'data-image-id' );
    giphyAppModel.addFavorite( searchResultId );
    uiUpdateFavorites();

    console.groupEnd();
}


/*** FUNCTION handleClickFavoriteRemoveFavorite()
***/

handleClickFavoriteRemoveFavorite = function( event ) {
    console.group( 'FUNCTION handleClickFavoriteRemoveFavorite()' );
    console.logValue( 'event.type' , event.type );
    console.logValue( 'event.currentTarget.id' , event.currentTarget.id );
    console.logValue( '$( this ).attr(  \'id\' )' , $( this ).attr( 'id' ) );

    var favoriteId = $( this ).attr( 'data-image-id' );
    giphyAppModel.removeFavorite( favoriteId );
    uiUpdateFavorites();

    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

handleReady = function( event ) {
    console.group( 'FUNCTION handleReady()' );
    console.logValue( 'event' , event );

    giphyAppModel = new GiphyAppModel( API_KEY , SEARCH_TERMS );

    // register event handlers
    $( '#app-search-terms-add-submit' ).on( 'click' , handleClickAddSearchTermSubmit );
    // register event handlers post-creation
    $( document ).on( 'click' , '.app-search-term-button' , handleClickSearchTermButton );
    $( document ).on( 'click' , '.app-search-result-image' , handleClickSearchResultImage );
    $( document ).on( 'click' , '.app-search-result-add-favorite' , handleClickSearchResultAddFavorite );
    $( document ).on( 'click' , '.app-favorite-image' , handleClickSearchResultImage );
    $( document ).on( 'click' , '.app-favorite-remove-favorite' , handleClickFavoriteRemoveFavorite );
    uiUpdate();

    console.groupEnd();
}


/*** Global Variables
***/

const API_KEY = 'O4Rolb03RAK6SiFmndG6Yxs0SXhhmslq';
const SEARCH_TERMS = [
    'Saint Seiya' ,
    'Sailor Moon' ,
    'Macross' ,
    'Clannad' ,
    'My Hero Academia' ,
    'Lain' ,
    'Hokuto no Ken' ,
    'Your Name' ,
    'Paprika' ,
    'Tokyo Godfathers' ,
    'A Silent Voice' ,
    'Haruhi Suzumiya'
]
/*
const SEARCH_TERMS = [
    'Kalafina Keiko' ,
    'Kalafina Hikaru' ,
    'Kalafina Wakana'
]
*.
/*
const SEARCH_TERMS = [
    'Sebastian Vettel' ,
    'Kimi Räikkönen' ,
    'Sergio Pérez' ,
    'Esteban Ocon' ,
    'Romain Grosjean' ,
    'Kevin Magnussen' ,
    'Stoffel Vandoorne' ,
    'Fernando Alonso' ,
    'Lewis Hamilton' ,
    'Valtteri Bottas' ,
    'Daniel Ricciardo' ,
    'Max Verstappen' ,
    'Nico Hülkenberg' ,
    'Carlos Sainz Jr.' ,
    'Marcus Ericsson' ,
    'Charles Leclerc' ,
    'Pierre Gasly' ,
    'Brendon Hartley' ,
    'Lance Stroll' ,
    'Sergey Sirotkin'
];
*/

var giphyAppModel;    // [object GiphyAppModel]


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
