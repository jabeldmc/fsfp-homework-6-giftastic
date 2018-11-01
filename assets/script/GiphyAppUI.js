/*** GiphyAppUI.js
***/


/*** FUNCTION uiUpdateSearchTerms()
***/

var uiUpdateSearchTerms = function() {
    console.group( 'FUNCTION uiUpdateSearchTerms()' );
    console.logValue( 'giphyAppModel.searchTerms' , giphyAppModel.searchTerms );

    var searchTermsJQ = $( '#app-search-terms' );
    searchTermsJQ.empty();

    // create a button for each searchTerm
    giphyAppModel.searchTerms.forEach(
        ( searchTerm , searchTermIndex ) => {
            var searchTermButtonJQ =
                $( '<button>' )
                    .attr( 'id' , `app-search-term-${ searchTermIndex.toString() }-button` )
                    .attr( 'class' , 'app-search-term-button btn btn-primary btn-lg btn-block mt-1' )
                    .attr( 'data-search-term' , searchTerm )
                    .text( searchTerm );
            searchTermsJQ.append( searchTermButtonJQ );
            /*
            var searchTermJQ =
                $( '<div>' )
                    .attr( 'id' , `app-search-term-${ searchTermIndex.toString() }` );
            var searchTermButtonJQ =
                $( '<button>' )
                    .attr( 'id' , `app-search-term-${ searchTermIndex.toString() }-button` )
                    .attr( 'class' , 'app-search-term-button' )
                    .attr( 'data-search-term' , searchTerm )
                    .text( searchTerm );
            searchTermJQ.append( searchTermButtonJQ );
            searchTermsJQ.append( searchTermJQ );
            */
        }
    )

    console.groupEnd();
}


/*** FUNCTION uiUpdateSearchResults()
***/

var uiUpdateSearchResults = function() {
    console.group( 'FUNCTION uiUpdateSearchResults()' );
    console.logValue( 'giphyAppModel.searchResultIds' , giphyAppModel.searchResultIds );
    console.logValue( 'giphyAppModel.searchResults' , giphyAppModel.searchResults );

    var searchResultsJQ = $( '#app-search-results' );
    searchResultsJQ.empty();

    // create an image for each searchResultId
    giphyAppModel.searchResultIds.forEach(
        ( searchResultId , searchResultIdIndex ) => {
            var searchResult = giphyAppModel.searchResults[ searchResultId ];

            var searchResultJQ =
                $( '<div>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }` )
                    .addClass( 'card mb-3' );
            var searchResultImageJQ =
                $( '<img>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-image` )
                    .addClass( 'app-search-result-image card-img-top' )
                    .attr( 'src' , searchResult.images.fixed_width_still.url )
                    .attr( 'alt' , searchResult.title )
                    .attr( 'data-is-animated' , 'false' )
                    .attr( 'data-still-src' , searchResult.images.fixed_width_still.url )
                    .attr( 'data-animated-src' , searchResult.images.fixed_width.url );
            var searchResultTitleJQ =
                $( '<div>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-title` )
                    .addClass( 'card-header p-2' )
                    .append(
                        $( '<h6>' )
                            .addClass( 'card-title m-0' )
                            .text( searchResult.title )
                    );
            var listGroupJQ =
                $( '<ul>' )
                    .addClass( 'list-group list-group-flush' );
            var searchResultIDJQ =
                $( '<li>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-id` )
                    .addClass( 'list-group-item p-2' )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<small>' )
                                    .addClass( 'text-muted' )
                                    .text( 'ID' )
                            )
                    )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .text( searchResultId )
                    );
            var searchResultUrlJQ =
                $( '<li>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-url` )
                    .addClass( 'list-group-item p-2' )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<small>' )
                                    .addClass( 'text-muted' )
                                    .text( 'URL' )
                            )
                    )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<a>' )
                                    .attr( 'href' , searchResult.url )
                                    .attr( 'target' , `app-search-result-${ searchResultIdIndex.toString() }-target` )
                                    .text( searchResult.url )
                            )
                    );
            var searchResultRatingJQ =
                $( '<li>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-rating` )
                    .addClass( 'list-group-item p-2' )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<small>' )
                                    .addClass( 'text-muted' )
                                    .text( 'Rating' )
                            )
                    )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .text( searchResult.rating )
                    );
            var searchResultRemoveFavoriteJQ =
                $( '<div>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-add-favorite` )
                    .addClass( 'app-search-result-add-favorite btn btn-block btn-primary' )
                    .attr( 'data-image-id' , searchResultId )
                    .text( 'Add Favorite' );

            listGroupJQ
                .append( searchResultIDJQ )
                .append( searchResultUrlJQ )
                .append( searchResultRatingJQ )
                .append( searchResultRemoveFavoriteJQ );
            searchResultJQ
                .append( searchResultImageJQ )
                .append( searchResultTitleJQ )
                .append( listGroupJQ );
            searchResultsJQ
                .append( searchResultJQ );
            /*
            var searchResultJQ =
                $( '<div>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }` );
            var searchResultImageJQ =
                $( '<img>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-image` )
                    .attr( 'class' , 'app-search-result-image' )
                    .attr( 'src' , searchResult.images.fixed_width_still.url )
                    .attr( 'data-is-animated' , 'false' )
                    .attr( 'data-still-src' , searchResult.images.fixed_width_still.url )
                    .attr( 'data-animated-src' , searchResult.images.fixed_width.url );
            var searchResultIDJQ =
                $( '<p>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-id` )
                    .text( `ID: ${ searchResultId }` );
            var searchResultTitleJQ =
                $( '<p>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-title` )
                    .text( `Title: ${ searchResult.title }` );
            var searchResultUrlJQ =
                $( '<p>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-url` )
                    .text( `URL: ${ searchResult.url }` );
            var searchResultRatingJQ =
                $( '<p>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-rating` )
                    .text( `Rating: ${ searchResult.rating }` );
            var searchResultAddFavoriteJQ =
                $( '<p>' )
                    .attr( 'id' , `app-search-result-${ searchResultIdIndex.toString() }-add-favorite` )
                    .attr( 'class' , 'app-search-result-add-favorite' )
                    .attr( 'data-image-id' , searchResultId )
                    .text( 'Add to Favorites' );
            searchResultJQ
                .append( searchResultImageJQ )
                .append( searchResultIDJQ )
                .append( searchResultTitleJQ )
                .append( searchResultUrlJQ )
                .append( searchResultRatingJQ )
                .append( searchResultAddFavoriteJQ );
            searchResultsJQ
                .append( searchResultJQ );
            */
        }
    );

    console.groupEnd();
}


/*** FUNCTION uiToggleImageAnimation()
***/

uiToggleImageAnimation = function( searchResultImageId ) {
    console.group( 'FUNCTION uiToggleImageAnimation()' );
    console.logValue( 'searchResultImageId' , searchResultImageId );

    var selector = ( '#' + searchResultImageId );
    var searchResultImageJQ = $( selector );

    if ( searchResultImageJQ.attr( 'data-is-animated' ) === 'false' ) {
        searchResultImageJQ
            .attr( 'data-is-animated' , 'true' )
            .attr( 'src' , searchResultImageJQ.attr( 'data-animated-src' ) );

    }
    else if ( searchResultImageJQ.attr( 'data-is-animated' ) === 'true' ) {
        searchResultImageJQ
            .attr( 'data-is-animated' , 'false' )
            .attr( 'src' , searchResultImageJQ.attr( 'data-still-src' ) );
    }

    console.groupEnd();
}


/*** FUNCTION uiUpdateFavorites()
***/

var uiUpdateFavorites = function() {
    console.group( 'FUNCTION uiUpdateFavorites()' );
    console.logValue( 'giphyAppModel.favoriteIds' , giphyAppModel.favoriteIds );
    console.logValue( 'giphyAppModel.favorites' , giphyAppModel.favorites );

    var favoritesJQ = $( '#app-favorites' );
    favoritesJQ.empty();

    // create an image for each favorite
    giphyAppModel.favoriteIds.forEach(
        ( favoriteId , favoriteIdIndex ) => {
            var favorite = giphyAppModel.favorites[ favoriteId ];

            var favoriteJQ =
                $( '<div>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }` )
                    .addClass( 'card mb-3' );
            var favoriteImageJQ =
                $( '<img>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-image` )
                    .addClass( 'app-favorite-image card-img-top' )
                    .attr( 'src' , favorite.images.fixed_width_still.url )
                    .attr( 'alt' , favorite.title )
                    .attr( 'data-is-animated' , 'false' )
                    .attr( 'data-still-src' , favorite.images.fixed_width_still.url )
                    .attr( 'data-animated-src' , favorite.images.fixed_width.url );
            var favoriteTitleJQ =
                $( '<div>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-title` )
                    .addClass( 'card-header p-2' )
                    .append(
                        $( '<h6>' )
                            .addClass( 'card-title m-0' )
                            .text( favorite.title )
                    );
            var listGroupJQ =
                $( '<ul>' )
                    .addClass( 'list-group list-group-flush' );
            var favoriteIDJQ =
                $( '<li>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-id` )
                    .addClass( 'list-group-item p-2' )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<small>' )
                                    .addClass( 'text-muted' )
                                    .text( 'ID' )
                            )
                    )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .text( favoriteId )
                    );
            var favoriteUrlJQ =
                $( '<li>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-url` )
                    .addClass( 'list-group-item p-2' )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<small>' )
                                    .addClass( 'text-muted' )
                                    .text( 'URL' )
                            )
                    )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<a>' )
                                    .attr( 'href' , favorite.url )
                                    .attr( 'target' , `app-favorite-${ favoriteIdIndex.toString() }-target` )
                                    .text( favorite.url )
                            )
                    );
            var favoriteRatingJQ =
                $( '<li>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-rating` )
                    .addClass( 'list-group-item p-2' )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .append(
                                $( '<small>' )
                                    .addClass( 'text-muted' )
                                    .text( 'Rating' )
                            )
                    )
                    .append(
                        $( '<p>' )
                            .addClass( 'card-text m-0' )
                            .text( favorite.rating )
                    );
            var favoriteRemoveFavoriteJQ =
                $( '<div>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-remove-favorite` )
                    .addClass( 'app-favorite-remove-favorite btn btn-block btn-primary' )
                    .attr( 'data-image-id' , favoriteId )
                    .text( 'Remove Favorite' );

            listGroupJQ
                .append( favoriteIDJQ )
                .append( favoriteUrlJQ )
                .append( favoriteRatingJQ )
                .append( favoriteRemoveFavoriteJQ );
            favoriteJQ
                .append( favoriteImageJQ )
                .append( favoriteTitleJQ )
                .append( listGroupJQ );
            favoritesJQ
                .append( favoriteJQ );
            /*
            var favoriteJQ =
                $( '<div>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }` );
            var favoriteImageJQ =
                $( '<img>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-image` )
                    .attr( 'class' , 'app-favorite-image' )
                    .attr( 'src' , favorite.images.fixed_width_still.url )
                    .attr( 'data-is-animated' , 'false' )
                    .attr( 'data-still-src' , favorite.images.fixed_width_still.url )
                    .attr( 'data-animated-src' , favorite.images.fixed_width.url );
            var favoriteIDJQ =
                $( '<p>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-id` )
                    .text( `ID: ${ favoriteId }` );
            var favoriteTitleJQ =
                $( '<p>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-title` )
                    .text( `Title: ${ favorite.title }` );
            var favoriteUrlJQ =
                $( '<p>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-url` )
                    .text( `URL: ${ favorite.url }` );
            var favoriteRatingJQ =
                $( '<p>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-rating` )
                    .text( `Rating: ${ favorite.rating }` );
            var favoriteRemoveFavoriteJQ =
                $( '<p>' )
                    .attr( 'id' , `app-favorite-${ favoriteIdIndex.toString() }-remove-favorite` )
                    .attr( 'class' , 'app-favorite-remove-favorite' )
                    .attr( 'data-image-id' , favoriteId )
                    .text( 'Remove from Favorites' );
            favoriteJQ
                .append( favoriteImageJQ )
                .append( favoriteIDJQ )
                .append( favoriteTitleJQ )
                .append( favoriteUrlJQ )
                .append( favoriteRatingJQ )
                .append( favoriteRemoveFavoriteJQ );
            favoritesJQ
                .append( favoriteJQ );
            */
        }
    );

    console.groupEnd();
}


/*** FUNCTION uiUpdate()
***/

var uiUpdate = function() {
    console.group( 'FUNCTION uiUpdate()' );

    uiUpdateSearchTerms();
    uiUpdateSearchResults();
    uiUpdateFavorites();

    console.groupEnd();
}
