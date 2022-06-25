import classNames from "classnames";
import { useEffect } from "react";

import { useUsers } from "@/context";

const genres = [
  "Acoustic",
  "Afrobeat",
  "Alt Rock",
  "Alternative",
  "Ambient",
  "Anime",
  "Black Metal",
  "Bluegrass",
  "Blues",
  "Bossa nova",
  "Brazil",
  "Breakbeat",
  "British",
  "Cantopop",
  "Chicago House",
  "Children",
  "Chill",
  "Classical",
  "Club",
  "Comedy",
  "Country",
  "Dance",
  "Dancehall",
  "Death Metal",
  "Deep House",
  "Detroit Techno",
  "Disco",
  "Disney",
  "Drum and Bass",
  "Dub",
  "Dubstep",
  "EDM",
  "Electro",
  "Electronic",
  "Emo",
  "Folk",
  "Forró",
  "French",
  "Funk",
  "Garage",
  "German",
  "Gospel",
  "Goth",
  "Grindcore",
  "Groove",
  "Grunge",
  "Guitar",
  "Happy",
  "Hard Rock",
  "Hardcore",
  "Hardstyle",
  "Heavy Metal",
  "Hip Hop",
  "Holidays",
  "Honky Tonk",
  "House",
  "IDM",
  "Indian",
  "Indie",
  "Indie Pop",
  "Industrial",
  "Iranian",
  "J-Dance",
  "J-Idol",
  "J-Pop",
  "J-Rock",
  "Jazz",
  "K-Pop",
  "Kids",
  "Latin",
  "Latino",
  "Malay",
  "Mandopop",
  "Metal",
  "Metal & Misc",
  "Metalcore",
  "Minimal Techno",
  "Movies",
  "MPB",
  "New Age",
  "New Release",
  "Opera",
  "Pagode",
  "Party",
  "Philippines OPM",
  "Piano",
  "Pop",
  "Pop film",
  "Post dubstep",
  "Power pop",
  "Progressive house",
  "Psych rock",
  "Punk",
  "Punk rock",
  "R&B",
  "Rainy day",
  "Reggae",
  "Reggaeton",
  "Road trip",
  "Rock",
  "Rock 'n' roll",
  "Rockabilly",
  "Romance",
  "Sad",
  "Salsa",
  "Samba",
  "Sertanejo",
  "Show Tunes",
  "Singer Songwriter",
  "Ska",
  "Sleep",
  "Songwriter",
  "Soul",
  "Soundtracks",
  "Spanish",
  "Study",
  "Summer",
  "Swedish",
  "Synth Pop",
  "Tango",
  "Techno",
  "Trance",
  "Trip Hop",
  "Turkish",
  "Work Out",
  "World Music",
];

const GenreChip = ({ genre }: { genre: string }) => {
  const { getCurrentUser, addFavoriteGenre, removeFavoriteGenre } = useUsers();

  const user = getCurrentUser()!;

  const add = () => {
    console.log(`[Genre] adding ${genre}`);
    addFavoriteGenre(user.username, genre);
  };

  const remove = () => {
    console.log(`[Genre] removing ${genre}`);
    removeFavoriteGenre(user.username, genre);
  };

  const isSelected = user.favoriteGenres.includes(genre);

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

export const GenresSelection = () => {
  return (
    <div className="flex flex-wrap justify-between gap-4">
      {genres.map((entry) => {
        return <GenreChip key={entry} genre={entry} />;
      })}
    </div>
  );
};

export default GenresSelection;
