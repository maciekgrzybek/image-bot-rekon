module.exports = (username, labels = []) => {
  let message = '';

  if (labels.length === 0) {
    message = `Sorry @${username}, you need to upload an image.`;
  } else if (labels.filter((label) => {
    const { Name } = label;
    return Name === 'Animal' || Name === 'Mammal' || Name === 'Bird' || Name === 'Fish' || Name === 'Reptile' || Name === 'Amphibian';
  }).length === 0) {
    message = `Ooops @${username} looks like it's not an animal on your image.`;
  } else {
    const recongizedLabels = labels.map(label => label.Name);
    message = `Hi @${username}. On your image, I can recognize: ${recongizedLabels.join(', ')}.`;
  }

  return message;
};
