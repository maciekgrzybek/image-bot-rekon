module.exports = (username, labels = []) => {
  let message = '';
  const ANIMAL_LABELS = ['Animal', 'Mammal', 'Bird', 'Fish', 'Reptile', 'Amphibian'];
  const isAnimal = labels.length && labels.some(label => ANIMAL_LABELS.includes(label.Name));

  if (labels.length === 0) {
    message = `Sorry @${username}, you need to upload an image.`;
  } else if (isAnimal) {
    const recongizedLabels = labels.map(label => label.Name);
    message = `Hi @${username}. On your image, I can recognize: ${recongizedLabels.join(', ')}.`;
  } else {
    message = `Ooops @${username} looks like it's not an animal on your image.`;
  }

  return message;
};
