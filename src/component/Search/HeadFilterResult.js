import { PiMusicNotesFill, PiUserGearBold, PiMonitorPlayBold, PiPlaylistBold } from 'react-icons/pi';

const songHeadFilter = <> <PiMusicNotesFill /> เพลง </>
const artistHeadFilter = <> <PiUserGearBold/> ศิลปิน </>
const seriesHeadFilter = <> <PiMonitorPlayBold/> ซีรีส์ </>
const lyricHeadFilter = <> <PiPlaylistBold /> เนื้อเพลง </>

function checkHeadFilter(filter) {
    if (filter === 'song') {
        return songHeadFilter
    } else if (filter === 'artist') {
        return artistHeadFilter
    } else if (filter === 'series') {
        return seriesHeadFilter
    } else //'lyric'
        return lyricHeadFilter
}

export {
    checkHeadFilter,
}