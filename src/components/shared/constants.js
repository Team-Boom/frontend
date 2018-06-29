import tomatoIcon from '../../assets/icons/rotten-tomatoes.png';
import metaIcon from '../../assets/icons/metacritic.png';
import imdbIcon from '../../assets/icons/imdb.png';

export const categories = ['Cinematography', 'Editing', 'Design', 'Lighting', 'Sound'];

export const categoriesAll = ['All', 'Cinematography', 'Editing', 'Design', 'Lighting', 'Sound'];

export const categoryBlurbs = {
  'Cinematography': 'A more broad term that can differ from one person to the next, this generally refers to the presentation defined by the movement and placement of the camera.',
  'Editing': 'On its most fundamental level, editing is the art, technique and practice of assembling shots into a coherent sequence.',
  'Design': 'The overall visual look of the production, including sets and costumes.',
  'Lighting': 'The quality of light used to illuminate the images.',
  'Sound': 'The quality of the sounds and music used to accompany the visual presentation.'
};

export const exRatingsDic = {
  'Internet Movie Database': imdbIcon,
  'Rotten Tomatoes': tomatoIcon,
  'Metacritic': metaIcon,
};