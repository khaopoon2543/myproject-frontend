
function LyricLink(track) {
    return "/artists/" + track.artist_id.replaceAll(" ","-") + '/' + track.song_id.replaceAll(" ","-")
}
function ArtistLink(artist_id) {
    return "/artists/"+ artist_id.replaceAll(" ","-")
}
function SeriesLink(series_id) {
    return '/series/'+ series_id.replaceAll(" ","-") //series_id
}

export {
    LyricLink,
    ArtistLink,
    SeriesLink,
}