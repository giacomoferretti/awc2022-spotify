import classNames from "classnames";

import { useUsers } from "@/context";

export const genres = {
  "acoustic": "Acoustic",
  "afrobeat": "Afrobeat",
  "alt-rock": "Alt Rock",
  "alternative": "Alternative",
  "ambient": "Ambient",
  "anime": "Anime",
  "black-metal": "Black Metal",
  "bluegrass": "Bluegrass",
  "blues": "Blues",
  "bossanova": "Bossa nova",
  "brazil": "Brazil",
  "breakbeat": "Breakbeat",
  "british": "British",
  "cantopop": "Cantopop",
  "chicago-house": "Chicago House",
  "children": "Children",
  "chill": "Chill",
  "classical": "Classical",
  "club": "Club",
  "comedy": "Comedy",
  "country": "Country",
  "dance": "Dance",
  "dancehall": "Dancehall",
  "death-metal": "Death Metal",
  "deep-house": "Deep House",
  "detroit-techno": "Detroit Techno",
  "disco": "Disco",
  "disney": "Disney",
  "drum-and-bass": "Drum and Bass",
  "dub": "Dub",
  "dubstep": "Dubstep",
  "edm": "EDM",
  "electro": "Electro",
  "electronic": "Electronic",
  "emo": "Emo",
  "folk": "Folk",
  "forro": "Forró",
  "french": "French",
  "funk": "Funk",
  "garage": "Garage",
  "german": "German",
  "gospel": "Gospel",
  "goth": "Goth",
  "grindcore": "Grindcore",
  "groove": "Groove",
  "grunge": "Grunge",
  "guitar": "Guitar",
  "happy": "Happy",
  "hard-rock": "Hard Rock",
  "hardcore": "Hardcore",
  "hardstyle": "Hardstyle",
  "heavy-metal": "Heavy Metal",
  "hip-hop": "Hip Hop",
  "holidays": "Holidays",
  "honky-tonk": "Honky Tonk",
  "house": "House",
  "idm": "IDM",
  "indian": "Indian",
  "indie": "Indie",
  "indie-pop": "Indie Pop",
  "industrial": "Industrial",
  "iranian": "Iranian",
  "j-dance": "J-Dance",
  "j-idol": "J-Idol",
  "j-pop": "J-Pop",
  "j-rock": "J-Rock",
  "jazz": "Jazz",
  "k-pop": "K-Pop",
  "kids": "Kids",
  "latin": "Latin",
  "latino": "Latino",
  "malay": "Malay",
  "mandopop": "Mandopop",
  "metal": "Metal",
  "metal-misc": "Metal & Misc",
  "metalcore": "Metalcore",
  "minimal-techno": "Minimal Techno",
  "movies": "Movies",
  "mpb": "MPB",
  "new-age": "New Age",
  "new-release": "New Release",
  "opera": "Opera",
  "pagode": "Pagode",
  "party": "Party",
  "philippines-opm": "Philippines OPM",
  "piano": "Piano",
  "pop": "Pop",
  "pop-film": "Pop film",
  "post-dubstep": "Post dubstep",
  "power-pop": "Power pop",
  "progressive-house": "Progressive house",
  "psych-rock": "Psych rock",
  "punk": "Punk",
  "punk-rock": "Punk rock",
  "r-n-b": "R&B",
  "rainy-day": "Rainy day",
  "reggae": "Reggae",
  "reggaeton": "Reggaeton",
  "road-trip": "Road trip",
  "rock": "Rock",
  "rock-n-roll": "Rock 'n' roll",
  "rockabilly": "Rockabilly",
  "romance": "Romance",
  "sad": "Sad",
  "salsa": "Salsa",
  "samba": "Samba",
  "sertanejo": "Sertanejo",
  "show-tunes": "Show Tunes",
  "singer-songwriter": "Singer Songwriter",
  "ska": "Ska",
  "sleep": "Sleep",
  "songwriter": "Songwriter",
  "soul": "Soul",
  "soundtracks": "Soundtracks",
  "spanish": "Spanish",
  "study": "Study",
  "summer": "Summer",
  "swedish": "Swedish",
  "synth-pop": "Synth Pop",
  "tango": "Tango",
  "techno": "Techno",
  "trance": "Trance",
  "trip-hop": "Trip Hop",
  "turkish": "Turkish",
  "work-out": "Work Out",
  "world-music": "World Music",
};

const GenreChip = ({ genre }: { genre: string }) => {
  const { getCurrentUser, addFavoriteGenre, removeFavoriteGenre } = useUsers();

  const user = getCurrentUser();

  const add = () => {
    if (!user) return;

    addFavoriteGenre(user.username, genre);
  };

  const remove = () => {
    if (!user) return;

    removeFavoriteGenre(user.username, genre);
  };

  const isSelected = user?.favoriteGenres.includes(genre) ?? false;

  return (
    <div
      onClick={isSelected ? remove : add}
      className={classNames(
        "cursor-pointer rounded-full py-1.5 px-3 text-xs",
        { "bg-neutral-800 hover:bg-neutral-700": !isSelected },
        { "bg-spotify-accent-base text-black": isSelected }
      )}>
      {genre}
    </div>
  );
};

export const GenresSelection = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {Object.values(genres).map((entry) => {
        return <GenreChip key={entry} genre={entry} />;
      })}
    </div>
  );
};
